"use client";

import { useState } from "react";

import { Container } from "@/components/container";
import { AssistantWidget } from "@/components/home/assistant-widget";
import { DemoTabs } from "@/components/home/demo-tabs";
import {
  SituationSelector,
  type SituationKey,
} from "@/components/home/situation-selector";
import { Reveal } from "@/components/motion/reveal";
import { useScrollParallax } from "@/components/motion/use-scroll-parallax";

export function HomepageInteractive() {
  const glowParallaxRef = useScrollParallax<HTMLDivElement>({ strength: 0.18 });

  const [situation, setSituation] = useState<SituationKey>("landed");

  return (
    <>
      {/* Hero */}
      <section className="setly-hero setly-noise bg-brand-midnight text-white">
        <Container>
          <div className="relative grid gap-10 py-14 md:grid-cols-12 md:py-16">
            <div className="md:col-span-7">
              <div className="relative">
                <Reveal delayMs={0} yPx={10}>
                  <p className="text-xs font-semibold tracking-[0.22em] text-white/70">
                    SETLY
                    <span className="mx-3 inline-block h-1 w-1 rounded-full bg-brand-gold align-middle" />
                    “Your Next Move”
                  </p>
                </Reveal>

                <Reveal delayMs={90} yPx={12}>
                  <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
                    Setly — Your Next Move
                  </h1>
                </Reveal>

                <Reveal delayMs={140} yPx={12}>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                    Rooms. Rides. Essentials. Community. One place.
                  </p>
                </Reveal>

                <Reveal delayMs={240} yPx={12}>
                  <div className="mt-10" />
                </Reveal>

                <div className="mt-10 rounded-3xl border border-white/10 bg-surface/95 p-5 text-ink">
                  <SituationSelector
                    compact
                    value={situation}
                    onChange={(next) => setSituation(next)}
                  />

                  <div className="mt-5">
                    <DemoTabs
                      key={situation}
                      embedded
                      situation={situation}
                      initialTab="features"
                    />
                  </div>
                </div>

                <div
                  ref={glowParallaxRef}
                  className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-gold/10 blur-3xl setly-parallax"
                />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="md:sticky md:top-24">
                <Reveal delayMs={120} yPx={10}>
                  <AssistantWidget />
                </Reveal>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </Container>
      </section>
    </>
  );
}
