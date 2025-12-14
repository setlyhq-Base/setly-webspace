import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3011;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROOT = path.resolve(process.cwd());
const OUT_DIR = path.join(ROOT, "recordings");

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

  // Ensure the recording reflects the latest code.
  await new Promise((resolve, reject) => {
    const build = spawn(
      process.platform === "win32" ? "npm.cmd" : "npm",
      ["run", "build"],
      {
        cwd: ROOT,
        env: { ...process.env, NODE_ENV: "production" },
        stdio: "inherit",
      },
    );
    build.on("exit", (code) => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`Build failed with exit code ${code}`));
    });
  });

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

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: { dir: OUT_DIR, size: { width: 1440, height: 900 } },
    });

    const page = await context.newPage();

    // Start on Home.
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    // Wait for entry overlay to appear and settle
    await page.waitForTimeout(800);

    // Click "I just landed" choice on entry overlay
    await page.getByRole("button", { name: "I just landed" }).click();
    await page.waitForTimeout(1500);

    // Now on Step 1 (Welcome) — hold on the truth
    await page.waitForTimeout(4500);

    // Click Continue to go to Step 2 (Choose)
    await page.getByRole("button", { name: "Continue →" }).click();
    await page.waitForTimeout(1200);

    // Now on Step 2 (Choose your path) — pause to show situation selector
    await page.waitForTimeout(3000);

    // Choose a situation (advances to Step 3: Explore)
    await page.getByRole("button", { name: "Need essentials + community" }).click();
    await page.waitForTimeout(1200);

    // Now on Step 3 (Explore) — show features preview
    await page.waitForTimeout(3000);

    // Interact with features to show reactivity
    await page.getByRole("button", { name: /Meet people/i }).click();
    await page.waitForTimeout(1800);
    await page.getByRole("button", { name: /Stop checking/i }).click();
    await page.waitForTimeout(1800);

    // Use assistant to show reactivity (right panel should stay sticky)
    await page.getByRole("button", { name: "I need rides / transport" }).click();
    await page.waitForTimeout(2000);

    // Scroll to test sticky behavior
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(800);
    await page.mouse.wheel(0, -600);
    await page.waitForTimeout(800);

    // Final pause for completion state
    await page.waitForTimeout(6000);

    await context.close();
    await browser.close();

    // Playwright writes a random file name; rename the most recent video.
    const candidates = fs
      .readdirSync(OUT_DIR)
      .filter((f) => f.endsWith(".webm"))
      .map((f) => ({
        file: f,
        mtime: fs.statSync(path.join(OUT_DIR, f)).mtimeMs,
      }))
      .sort((a, b) => b.mtime - a.mtime);

    const latest = candidates[0]?.file;
    if (!latest) throw new Error("No video recorded.");

    const from = path.join(OUT_DIR, latest);
    const to = path.join(OUT_DIR, "living-canvas.webm");

    if (fs.existsSync(to)) fs.rmSync(to);
    fs.renameSync(from, to);

    console.log(`Saved ${to}`);
  } finally {
    stopServer();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
