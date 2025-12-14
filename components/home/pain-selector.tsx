"use client";

import { useMemo, useState } from "react";

import { InteractiveCard } from "@/components/ui/interactive-card";

type PainKey = "housing" | "transport" | "trust" | "belonging";

type PainItem = {
  key: PainKey;
  title: string;
  lines: string[];
};

export function PainSelector() {
  const items = useMemo<PainItem[]>(
    () => [
      {
        key: "housing",
        title: "Housing",
        lines: [
          "Finding accommodation, transportation, groceries, and social support can take weeks — sometimes months.",
        ],
      },
      {
        key: "transport",
        title: "Transport",
        lines: [
          "Finding accommodation, transportation, groceries, and social support can take weeks — sometimes months.",
        ],
      },
      {
        key: "trust",
        title: "Trust",
        lines: [
          "This challenge is amplified for international students and professionals who lack a trusted network.",
          "Setly exists to make that experience human, guided, and effortless — through AI, verified communities, and partnerships.",
        ],
      },
      {
        key: "belonging",
        title: "Belonging",
        lines: [
          "Vision: Empowering every mover — students, professionals, and explorers — to feel at home anywhere.",
          "“To become the North Star for anyone moving to a new place — guiding them from landing to belonging.”",
        ],
      },
    ],
    [],
  );

  const [activeKey, setActiveKey] = useState<PainKey>("housing");

  const active = items.find((item) => item.key === activeKey) ?? items[0];

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <InteractiveCard
              key={item.key}
              className={
                "p-0" +
                (isActive
                  ? " ring-1 ring-brand-gold/50 border-brand-gold/40"
                  : "")
              }
            >
              <button
                type="button"
                onClick={() => setActiveKey(item.key)}
                className="flex w-full items-center justify-between gap-3 rounded-3xl px-5 py-4 text-left"
                aria-pressed={isActive}
              >
                <span className="text-sm font-semibold text-ink">
                  {item.title}
                </span>
                <span
                  className={
                    "h-2 w-2 shrink-0 rounded-full" +
                    (isActive ? " bg-brand-gold" : " bg-border")
                  }
                />
              </button>
            </InteractiveCard>
          );
        })}
      </div>

      <InteractiveCard className="p-6">
        <p className="text-xs font-semibold tracking-[0.22em] text-muted">
          SELECTED
        </p>
        <p className="mt-3 text-sm font-semibold text-ink">{active.title}</p>
        <div className="mt-3 grid gap-2">
          {active.lines.map((line) => (
            <p key={line} className="text-sm leading-6 text-muted">
              {line}
            </p>
          ))}
        </div>
      </InteractiveCard>
    </div>
  );
}
