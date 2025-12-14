import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";

export function TrustSection() {
  return (
    <section id="trust" className="bg-surface">
      <Container>
        <div className="py-14 md:py-16">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-muted">
                TRUST
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Trust is the product.
              </h2>
              <p className="mt-5 text-sm leading-6 text-muted">
                Setly exists to make relocation human, guided, and effortless.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3" baseDelayMs={80}>
            {[
              <InteractiveCard key="connections" tilt className="p-6">
                <p className="text-sm font-semibold text-ink">Verified profiles (future-ready)</p>
                <p className="mt-2 text-sm leading-6 text-muted">Verified communities</p>
              </InteractiveCard>,
              <InteractiveCard key="communities" tilt className="p-6">
                <p className="text-sm font-semibold text-ink">Community moderation (future-ready)</p>
                <p className="mt-2 text-sm leading-6 text-muted">Community reliability</p>
              </InteractiveCard>,
              <InteractiveCard key="partners" tilt className="p-6">
                <p className="text-sm font-semibold text-ink">Trust Index (future-ready)</p>
                <p className="mt-2 text-sm leading-6 text-muted">Setly Trust Index for community reliability</p>
              </InteractiveCard>,
            ]}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
