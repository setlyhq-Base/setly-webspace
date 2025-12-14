import Link from "next/link";

import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-[0.22em] text-ink">
                SETLY
              </span>
              <span className="h-1 w-1 rounded-full bg-brand-blue" aria-hidden="true" />
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              Setly — Your Next Move
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Contact</p>
            <a
              className="mt-3 inline-flex text-sm text-muted hover:text-ink"
              href="mailto:setlyhq@gmail.com"
            >
              setlyhq@gmail.com
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Links</p>
            <div className="mt-3 flex flex-col gap-2">
              <Link className="text-sm text-muted hover:text-ink" href="/about">
                About
              </Link>
              <Link className="text-sm text-muted hover:text-ink" href="/product">
                Product
              </Link>
              <Link className="text-sm text-muted hover:text-ink" href="/contact">
                Contact
              </Link>
              <Link className="text-sm text-muted hover:text-ink" href="/contact">
                Get Early Access
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border py-6">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Setly</p>
          <p className="text-xs text-muted">setly.net</p>
        </div>
      </Container>
    </footer>
  );
}
