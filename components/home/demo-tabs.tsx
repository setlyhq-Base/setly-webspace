"use client";

import { useMemo, useState } from "react";

import { HowItWorks } from "@/components/home/how-it-works";
import { ProblemCards } from "@/components/home/problem-cards";
import { FeaturesPreview } from "@/components/home/features-preview";
import { InteractiveCard } from "@/components/ui/interactive-card";

import type { SituationKey } from "@/components/home/situation-selector";

type DemoTabKey = "problem" | "solution" | "how" | "features";

type DemoTabsProps = {
  situation: SituationKey;
  initialTab?: DemoTabKey;
  embedded?: boolean;
};

const tabs: Array<{ key: DemoTabKey; label: string }> = [
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "how", label: "How it works" },
  { key: "features", label: "Features" },
];

export function DemoTabs({ situation, initialTab, embedded }: DemoTabsProps) {
  const [active, setActive] = useState<DemoTabKey>(initialTab ?? "problem");

  const solutionBullets = useMemo(() => {
    switch (situation) {
      case "room":
        return ["Housing Finder", "Roommate Connect", "Verified communities"];
      case "rides":
        return ["Transport", "Verified local connections", "Community reliability"];
      case "essentials":
        return ["Essentials Guide", "Local help", "Community platform"];
      case "people":
        return ["Verified communities", "Setly Circle (planned)", "Trust Index"];
      default:
        return ["AI Relocation Assistant", "Verified communities", "Partnerships"];
    }
  }, [situation]);

  return (
    <div
      className={
        embedded
          ? ""
          : "rounded-3xl border border-border bg-surface p-5"
      }
    >
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={
                "inline-flex h-9 items-center rounded-full border px-4 text-xs font-semibold transition" +
                (isActive
                  ? " border-brand-midnight bg-brand-midnight text-white"
                  : " border-border bg-surface text-ink hover:bg-surface-2")
              }
              aria-pressed={isActive}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className={embedded ? "mt-4" : "mt-5"}>
        {active === "problem" ? (
          <ProblemCards emphasis={situation} />
        ) : null}

        {active === "solution" ? (
          <div className="grid gap-4 md:grid-cols-3">
            {solutionBullets.map((b) => (
              <InteractiveCard key={b} tilt className="p-6">
                <p className="text-xs font-semibold tracking-[0.22em] text-muted">SETLY</p>
                <p className="mt-3 text-sm font-semibold text-ink">{b}</p>
              </InteractiveCard>
            ))}
          </div>
        ) : null}

        {active === "how" ? <HowItWorks mode="compact" /> : null}

        {active === "features" ? (
          <FeaturesPreview
            key={`${situation}-features`}
            visibleKeys={
              situation === "room"
                ? ["rooms", "community", "alerts"]
                : situation === "rides"
                  ? ["rides", "community", "alerts"]
                  : situation === "essentials"
                    ? ["marketplace", "community", "alerts"]
                    : ["community", "rooms", "alerts"]
            }
            initialKey={
              situation === "room"
                ? "rooms"
                : situation === "rides"
                  ? "rides"
                  : situation === "essentials"
                    ? "marketplace"
                    : "community"
            }
          />
        ) : null}
      </div>
    </div>
  );
}
