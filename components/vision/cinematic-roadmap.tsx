"use client";

import { useMemo, useState } from "react";

import { InteractiveCard } from "@/components/ui/interactive-card";

export type RoadmapPhase = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

type CinematicRoadmapProps = {
  phases: RoadmapPhase[];
};

export function CinematicRoadmap({ phases }: CinematicRoadmapProps) {
  const [openId, setOpenId] = useState<string>(phases[0]?.id ?? "");

  const northStar = useMemo(
    () =>
      "“To become the North Star for anyone moving to a new place — guiding them from landing to belonging.”",
    [],
  );

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-4 w-px bg-linear-to-b from-brand-gold/0 via-brand-gold/35 to-brand-gold/0 md:left-6" />

      <div className="grid gap-4">
        {phases.map((p, idx) => {
          const isOpen = p.id === openId;
          return (
            <div key={p.id} className="relative pl-10 md:pl-12">
              <div className="pointer-events-none absolute left-3 top-7 h-3 w-3 rounded-full bg-brand-gold md:left-5" />

              <InteractiveCard
                tilt
                className={
                  "p-0" +
                  (isOpen ? " ring-1 ring-brand-gold/40 border-brand-gold/35" : "")
                }
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : p.id)}
                  className="flex w-full flex-col items-start rounded-3xl px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <p className="text-xs font-semibold tracking-[0.22em] text-muted">
                    {p.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-ink">{p.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{p.subtitle}</p>

                  {isOpen ? (
                    <div className="mt-5 grid gap-2">
                      {p.bullets.map((b) => (
                        <p key={b} className="text-sm leading-6 text-muted">
                          • {b}
                        </p>
                      ))}
                      {idx === 0 ? (
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {northStar}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </button>
              </InteractiveCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
