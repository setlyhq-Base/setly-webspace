import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { BeforeAfterVisual } from "@/components/home/before-after-visual";
import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="bg-surface">
      <section className="bg-surface">
        <Container>
          <div className="py-20 md:py-24">
            {/* Product intro (must appear immediately after navbar) */}
            <Reveal>
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-muted">
                  PRODUCT
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  What if settling felt effortless?
                </h1>
                <p className="mt-4 text-base leading-7 text-muted">
                  Setly simplifies the chaos of relocation — making &ldquo;settling in&rdquo; feel like you&apos;re not alone.
                </p>

                <div className="mt-8 rounded-3xl border border-brand-blue/30 bg-brand-blue/5 p-6">
                  <p className="text-sm font-semibold text-ink">
                    For the moment after you land — when you don&apos;t know where to start.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    The system you wish existed when you landed.
                  </p>
                </div>

                <div className="mt-8">
                  <BeforeAfterVisual
                    before={{
                      label: "BEFORE SETLY",
                      items: [
                        "Figuring it out alone",
                        "Unsure what's trustworthy",
                        "Overwhelmed by choices",
                      ],
                    }}
                    after={{
                      label: "WITH SETLY",
                      items: [
                        "Guided, step by step",
                        "Verified and trusted",
                        "Clear next actions",
                      ],
                    }}
                  />
                </div>
              </div>
            </Reveal>

            {/* Product content */}
            <Stagger className="mt-12 grid gap-6 md:grid-cols-2" baseDelayMs={70}>
              {[
                <InteractiveCard key="mvp1" className="p-6">
                  <p className="text-sm font-semibold text-ink">The Moment</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    JFK. Two bags. No clue where to go.
                    Housing. Transport. Essentials.
                  </p>
                </InteractiveCard>,

                <InteractiveCard key="long-term" className="p-6">
                  <p className="text-sm font-semibold text-ink">What We Help With</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Trusted housing. Community resources. Local mentors.
                    Build a life that feels like you.
                  </p>
                </InteractiveCard>,

                <InteractiveCard key="future" className="p-6 md:col-span-2">
                  <p className="text-sm font-semibold text-ink">Human-Enhanced</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Technology should amplify human potential — not replace it.
                  </p>
                </InteractiveCard>,
              ]}
            </Stagger>

            {/* CTA (optional) */}
            <Reveal delayMs={140}>
              <div className="mt-12">
                <Link
                  href="/contact"
                  className="setly-btn inline-flex h-12 items-center justify-center rounded-full bg-brand-blue px-6 text-sm font-semibold text-white hover:bg-brand-blue-dark"
                >
                  Get Early Access
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
