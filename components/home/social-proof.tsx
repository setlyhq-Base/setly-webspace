import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";

export function SocialProof() {
  return (
    <section id="traction" className="bg-surface-2">
      <Container>
        <div className="py-14 md:py-16">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-muted">
                TRACTION
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Built for Indian students moving to the U.S.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                Starting with international students in the U.S., Setly’s MVP connects verified
                housing, roommates, and essential local services.
              </p>
            </div>
          </Reveal>

          <details className="mt-10 rounded-3xl border border-border bg-surface p-6">
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-ink">View traction & milestones</p>
                <span className="text-xs font-semibold tracking-[0.22em] text-muted">
                  Toggle
                </span>
              </div>
            </summary>

            <Stagger className="mt-8 grid gap-4 md:grid-cols-3" baseDelayMs={80}>
              {[
                <InteractiveCard key="interest" tilt className="p-6">
                  <p className="text-sm font-semibold text-ink">2,000+ sign-up interest</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    2,000+ sign-up interest from university groups (pre-validation)
                  </p>
                </InteractiveCard>,
                <InteractiveCard key="pilot" tilt className="p-6">
                  <p className="text-sm font-semibold text-ink">U.S. student pilot launch</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    MVP1 in progress — U.S. student pilot launch (Q1 2026)
                  </p>
                </InteractiveCard>,
                <InteractiveCard key="cities" tilt className="p-6">
                  <p className="text-sm font-semibold text-ink">City communities</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Target Milestone: 10,000 users & 25 active city communities
                  </p>
                </InteractiveCard>,
              ]}
            </Stagger>
          </details>
        </div>
      </Container>
    </section>
  );
}
