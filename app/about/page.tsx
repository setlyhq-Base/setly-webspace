import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { BeforeAfterVisual } from "@/components/home/before-after-visual";

export default function AboutPage() {
  return (
    <div className="bg-surface">
      <section className="bg-surface">
        <Container>
          <div className="py-16 md:py-20">
            <Reveal>
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-muted">
                  ABOUT
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  You&apos;re not the first to feel this way
                </h1>
                <p className="mt-4 text-base leading-7 text-muted">
                  Because settling isn&apos;t about stopping — it&apos;s about starting again.
                </p>

                <div className="mt-8 rounded-3xl border border-brand-blue/30 bg-brand-blue/5 p-6">
                  <p className="text-sm font-semibold text-ink">
                    Setly exists for the moment after you land — when everything feels new.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    The hardest part isn&apos;t the visa. It&apos;s belonging.
                  </p>
                </div>

                <div className="mt-8">
                  <BeforeAfterVisual
                    before={{
                      label: "THE FIRST WEEK",
                      items: [
                        "Alone in a new city",
                        "100 browser tabs open",
                        "No idea what's trustworthy",
                      ],
                    }}
                    after={{
                      label: "WITH SETLY",
                      items: [
                        "Community that gets it",
                        "One trusted place",
                        "You know what's next",
                      ],
                    }}
                  />
                </div>
              </div>
            </Reveal>

            <Stagger className="mt-12 grid gap-6 md:grid-cols-2" baseDelayMs={60}>
              {[
                <InteractiveCard key="origin" className="p-6">
                  <p className="text-sm font-semibold text-ink">The Origin</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    One traveler. A backpack. A dream to build a life halfway across the world.
                    The hardest part wasn&apos;t the visa — it was belonging.
                  </p>
                </InteractiveCard>,

                <InteractiveCard key="journey" className="p-6">
                  <p className="text-sm font-semibold text-ink">The First Week</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    JFK to New Haven. Two bags. No idea where to go.
                    Housing. Transport. Groceries. People who get it.
                  </p>
                </InteractiveCard>,

                <InteractiveCard key="stands-for" className="p-6">
                  <p className="text-sm font-semibold text-ink">What Setly Stands For</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    S – Start | E – Evolve | T – Thrive | L – Live | Y – Your way.
                  </p>
                </InteractiveCard>,

                <InteractiveCard key="mission" className="p-6">
                  <p className="text-sm font-semibold text-ink">Mission</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Empower people through human-enhanced technology.
                    Make every transition feel effortless.
                  </p>
                </InteractiveCard>,

                <InteractiveCard key="vision" className="p-6">
                  <p className="text-sm font-semibold text-ink">Vision</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Humans and technology, evolving together.
                    Systems that understand needs and simplify transitions.
                  </p>
                </InteractiveCard>,

                <InteractiveCard key="north-star" className="p-6">
                  <p className="text-sm font-semibold text-ink">North Star</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    “To become the North Star for anyone moving to a new place —
                    guiding them from landing to belonging.”
                  </p>
                </InteractiveCard>,
              ]}
            </Stagger>

            <Reveal delayMs={140}>
              <div className="mt-12 rounded-3xl border border-brand-blue/30 bg-brand-blue/5 p-6">
                <p className="text-sm font-semibold text-ink">Founder&apos;s Note</p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  The hardest part of moving wasn&apos;t work. It was finding the right apartment,
                  friends, vibe. Hundreds of tabs. So I built Setly — for every dreamer who
                  wants to start fresh without feeling lost.
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">
                  — Kiran Revally
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
