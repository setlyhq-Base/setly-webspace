"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";

export type VisionPhase = {
  title: string;
  subtitle?: string;
  bullets: string[];
};

export function VisionTimeline({ phases }: { phases: VisionPhase[] }) {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const progress = useMemo(() => {
    if (phases.length <= 1) return 0;
    return (activeIndex / (phases.length - 1)) * 100;
  }, [activeIndex, phases.length]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            index: Number((e.target as HTMLElement).dataset.index || "0"),
            ratio: e.intersectionRatio,
          }))
          .sort((a, b) => b.ratio - a.ratio);

        if (visible[0]) setActiveIndex(visible[0].index);
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
      },
    );

    for (const el of itemRefs.current) {
      if (!el) continue;
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-border md:left-6" />
      <div
        className="pointer-events-none absolute left-4 top-0 w-px bg-brand-gold transition-[height] duration-700 ease-out motion-reduce:transition-none md:left-6"
        style={{ height: `${progress}%` }}
      />

      <div className="grid gap-4">
        {phases.map((phase, index) => {
          const isActive = index === activeIndex;
          return (
            <Reveal key={phase.title} delayMs={index * 70}>
              <div
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                data-index={index}
                className={
                  "relative rounded-3xl border bg-surface p-6 pl-12 transition-colors duration-500 ease-out motion-reduce:transition-none md:pl-14 " +
                  (isActive
                    ? "border-brand-gold/50 bg-surface"
                    : "border-border")
                }
              >
                <div
                  className={
                    "absolute left-2 top-7 h-4 w-4 rounded-full border bg-surface transition-[transform,border-color,box-shadow] duration-500 ease-out motion-reduce:transition-none md:left-4 " +
                    (isActive
                      ? "border-brand-gold shadow-[0_0_0_6px_rgba(199,162,74,0.12)]"
                      : "border-border")
                  }
                  aria-hidden="true"
                />

                <p className="text-sm font-semibold text-ink">{phase.title}</p>
                {phase.subtitle ? (
                  <p className="mt-1 text-sm text-muted">{phase.subtitle}</p>
                ) : null}

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                  {phase.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
