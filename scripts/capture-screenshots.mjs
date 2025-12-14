import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3010;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROOT = path.resolve(process.cwd());
const OUT_DIR = path.join(ROOT, "screenshots");

const routes = [
  { name: "home", path: "/" },
  { name: "product", path: "/product" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServerReady(url, timeoutMs = 25_000) {
  const started = Date.now();
  while (Date.now() - started <= timeoutMs) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) return;
    } catch {
      // ignore
    }
    await wait(250);
  }

  throw new Error(`Server not ready after ${timeoutMs}ms: ${url}`);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const server = spawn(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "start", "--", "-p", String(PORT)],
    {
      cwd: ROOT,
      env: { ...process.env, PORT: String(PORT), NODE_ENV: "production" },
      stdio: "inherit",
    },
  );

  const stopServer = () => {
    if (server.killed) return;
    server.kill("SIGTERM");
  };

  process.on("SIGINT", stopServer);
  process.on("SIGTERM", stopServer);

  try {
    await waitForServerReady(`${BASE_URL}/`);

    const { chromium } = await import("playwright");
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    for (const route of routes) {
      const url = `${BASE_URL}${route.path}`;
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);

      const fileName = `${route.name}.png`;
      const outPath = path.join(OUT_DIR, fileName);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Saved ${outPath}`);
    }

    await browser.close();
  } finally {
    stopServer();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
