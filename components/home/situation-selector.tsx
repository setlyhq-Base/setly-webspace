"use client";

import { InteractiveCard } from "@/components/ui/interactive-card";

export type SituationKey =
  | "landed"
  | "room"
  | "rides"
  | "essentials"
  | "people";

type SituationSelectorProps = {
  value: SituationKey;
  onChange: (next: SituationKey) => void;
  compact?: boolean;
};

const items: Array<{ key: SituationKey; title: string; sub: string; icon: React.ReactNode }> = [
  {
    key: "landed",
    title: "Just landed in the U.S.",
    sub: "From landing to living",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11z" />
        <path d="M12 10.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z" />
      </svg>
    ),
  },
  {
    key: "room",
    title: "Looking for a room",
    sub: "Housing + roommates",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M3 10.5l9-7 9 7" />
        <path d="M6.5 9.5V20h11V9.5" />
        <path d="M10 20v-6h4v6" />
      </svg>
    ),
  },
  {
    key: "rides",
    title: "Need rides / transport",
    sub: "Local connections",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M5 16l1.5-6h11L19 16" />
        <path d="M6.5 10h11" />
        <path d="M7.5 18a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
        <path d="M16.5 18a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
      </svg>
    ),
  },
  {
    key: "essentials",
    title: "Need essentials + community",
    sub: "Setup basics",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M7 8V7a5 5 0 0 1 10 0v1" />
        <path d="M6 8h12l-1 13H7L6 8z" />
        <path d="M9 11v2" />
        <path d="M15 11v2" />
      </svg>
    ),
  },
  {
    key: "people",
    title: "Want to meet people",
    sub: "Community support",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M16 11a3 3 0 1 0-6 0" />
        <path d="M8 11a3 3 0 1 0-6 0" />
        <path d="M2.5 20a6.5 6.5 0 0 1 11-4" />
        <path d="M11 20a6 6 0 0 1 10.5-3" />
      </svg>
    ),
  },
];

export function SituationSelector({ value, onChange, compact }: SituationSelectorProps) {
  return (
    <div>
      {compact ? (
        <p className="text-xs font-semibold tracking-[0.22em] text-muted">
          CHOOSE A SCENARIO
        </p>
      ) : (
        <p className="text-xs font-semibold tracking-[0.22em] text-muted">
          CHOOSE YOUR SITUATION
        </p>
      )}
      {compact ? null : (
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          What are you trying to do today?
        </h2>
      )}

      <div
        className={
          (compact ? "mt-4" : "mt-10") +
          " grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4"
        }
      >
        {items.map((item) => {
          const isActive = item.key === value;
          return (
            <InteractiveCard
              key={item.key}
              className={
                (compact ? "p-4" : "p-6") +
                " h-full" +
                " transition" +
                (isActive
                  ? " ring-1 ring-brand-blue/50 border-brand-blue/40"
                  : " opacity-70 hover:opacity-100")
              }
            >
              <button
                type="button"
                onClick={() => onChange(item.key)}
                className="flex h-full w-full flex-col items-start rounded-3xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                aria-pressed={isActive}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={
                      "shrink-0 transition-colors " +
                      (isActive
                        ? "text-brand-blue"
                        : "text-muted/60")
                    }
                  >
                    {item.icon}
                  </div>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                </div>
                <p
                  className={
                    (compact ? "mt-2 text-xs leading-5" : "mt-2 text-sm leading-6") +
                    " text-muted"
                  }
                >
                  {item.sub}
                </p>
              </button>
            </InteractiveCard>
          );
        })}
      </div>
    </div>
  );
}
