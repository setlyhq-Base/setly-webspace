"use client";

import type { ReactElement } from "react";

import { InteractiveCard } from "@/components/ui/interactive-card";

import type { SituationKey } from "@/components/home/situation-selector";

type ProblemCardsProps = {
  emphasis: SituationKey;
};

type Problem = {
  key: SituationKey | "trust";
  title: string;
  bullets: string[];
  icon: (className: string) => ReactElement;
};

const IconHome = (className: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCar = (className: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M4 16V12.5c0-.5.15-1 .43-1.43L6.2 8.5c.3-.45.8-.72 1.34-.72h8.92c.54 0 1.04.27 1.34.72l1.77 2.57c.28.43.43.93.43 1.43V16"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M6.5 16.5h11"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="7.5" cy="16.8" r="1.3" fill="currentColor" />
    <circle cx="16.5" cy="16.8" r="1.3" fill="currentColor" />
  </svg>
);

const IconBag = (className: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M7 8V7a5 5 0 0 1 10 0v1"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M6 8h12l-1 13H7L6 8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const IconStar = (className: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 3l2.6 5.6 6.1.9-4.4 4.3 1 6.1-5.3-2.9-5.3 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const problems: Problem[] = [
  {
    key: "room",
    title: "Housing is chaos",
    bullets: ["fake posts", "no trust"],
    icon: IconHome,
  },
  {
    key: "rides",
    title: "Transport is stressful",
    bullets: ["airport pickups", "moving items"],
    icon: IconCar,
  },
  {
    key: "essentials",
    title: "Essentials take weeks",
    bullets: ["groceries", "setup basics"],
    icon: IconBag,
  },
  {
    key: "landed",
    title: "Belonging is hardest",
    bullets: ["no community", "no local guide"],
    icon: IconStar,
  },
];

export function ProblemCards({ emphasis }: ProblemCardsProps) {
  const normalizedEmphasis = emphasis === "people" ? "landed" : emphasis;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {problems.map((p) => {
        const isEmphasis = p.key === normalizedEmphasis;
        return (
          <InteractiveCard
            key={p.key}
            tilt
            className={
              "p-6" +
              (isEmphasis
                ? " ring-1 ring-brand-gold/50 border-brand-gold/40"
                : "")
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-ink">{p.title}</p>
                <div className="mt-3 grid gap-2">
                  {p.bullets.map((b) => (
                    <p key={b} className="text-sm leading-6 text-muted">
                      • {b}
                    </p>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-brand-midnight/70">
                {p.icon("h-9 w-9")}
              </div>
            </div>
          </InteractiveCard>
        );
      })}
    </div>
  );
}
