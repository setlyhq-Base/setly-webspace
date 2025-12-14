"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/components/container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/product", label: "Product" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-50 border-b backdrop-blur transition-[background-color,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none " +
        (scrolled
          ? "border-border bg-surface/85 shadow-[0_12px_40px_rgba(11,27,58,0.10)]"
          : "border-transparent bg-surface/55")
      }
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-[0.22em] text-ink">
              SETLY
            </span>
            <span className="h-1 w-1 rounded-full bg-brand-blue" aria-hidden="true" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="setly-btn inline-flex h-10 items-center justify-center rounded-full bg-brand-blue px-4 text-sm font-semibold text-white hover:bg-brand-blue-dark"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>

        <nav className="flex items-center gap-5 pb-3 md:hidden" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
