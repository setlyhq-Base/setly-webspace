"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = `Setly.net inquiry — ${name || ""}`.trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`.trim();
    return `mailto:setlyhq@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [email, message, name]);

  return (
    <div className="bg-surface">
      <section className="bg-surface">
        <Container>
          <div className="py-20 md:py-24">
            <Reveal>
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-muted">
                  CONTACT
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  You don&apos;t have to do this alone
                </h1>
                <p className="mt-4 text-base leading-7 text-muted">
                  If you&apos;re in that first-week moment — we get it. We&apos;ll reply.
                </p>

                <div className="mt-8 rounded-3xl border border-brand-blue/30 bg-brand-blue/5 p-6">
                  <p className="text-sm font-semibold text-ink">
                    For the moment after you land — when you need help.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Student, professional, or building a life somewhere new — we&apos;re here.
                  </p>
                </div>
              </div>
            </Reveal>

            <Stagger className="mt-12 grid gap-8 md:grid-cols-2" baseDelayMs={60}>
              {[
                <InteractiveCard key="form" className="p-6">
                  <p className="text-sm font-semibold text-ink">Send a message</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    This opens your email client (no backend).
                  </p>

                  <form
                    className="mt-6 grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      window.location.href = mailtoHref;
                    }}
                  >
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold tracking-[0.18em] text-muted">
                        NAME
                      </span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-11 rounded-2xl border border-border bg-surface px-4 text-sm text-ink outline-none focus:border-brand-blue"
                        placeholder="Your name"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs font-semibold tracking-[0.18em] text-muted">
                        EMAIL
                      </span>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 rounded-2xl border border-border bg-surface px-4 text-sm text-ink outline-none focus:border-brand-blue"
                        placeholder="you@example.com"
                        inputMode="email"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs font-semibold tracking-[0.18em] text-muted">
                        MESSAGE
                      </span>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-32 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-brand-blue"
                        placeholder="How can we help?"
                      />
                    </label>

                    <button
                      type="submit"
                      className="setly-btn inline-flex h-12 items-center justify-center rounded-full bg-brand-blue px-6 text-sm font-semibold text-white hover:bg-brand-blue-dark"
                    >
                      Email us
                    </button>
                  </form>
                </InteractiveCard>,

                <InteractiveCard key="info" className="p-6 bg-surface-2">
                  <p className="text-sm font-semibold text-ink">A real inbox</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Early access, support, or partnerships — universities, housing partners, and community leaders.
                  </p>

                  <div className="mt-6 grid gap-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-muted">
                        EMAIL
                      </p>
                      <a
                        className="mt-1 inline-block font-semibold text-ink"
                        href="mailto:setlyhq@gmail.com"
                      >
                        setlyhq@gmail.com
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-muted">
                        DOMAINS
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        www.setly.net
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-surface p-4">
                      <p className="text-sm font-semibold text-ink">Need support?</p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        Use the form to open an email draft, or email us directly.
                      </p>
                    </div>
                  </div>
                </InteractiveCard>,
              ]}
            </Stagger>
          </div>
        </Container>
      </section>
    </div>
  );
}
