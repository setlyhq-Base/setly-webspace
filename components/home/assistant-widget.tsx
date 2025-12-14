"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { InteractiveCard } from "@/components/ui/interactive-card";

type Suggestion = {
  id: string;
  label: string;
  resultTitle: string;
  resultSubtitle: string;
  humanNote?: string;
  kpi: { value: string; label: string };
  items: Array<{ title: string; meta: string; tag: string }>;
  control?: {
    goto?: "arrival" | "situation" | "helps";
    situation?: "landed" | "room" | "rides" | "essentials" | "people";
  };
};

export type AssistantControl =
  | { type: "goto"; state: "arrival" | "situation" | "helps" | "trust" | "becomes" }
  | { type: "setSituation"; situation: "landed" | "room" | "rides" | "essentials" | "people" };

type AssistantWidgetProps = {
  onControl?: (control: AssistantControl) => void;
  activeId?: string;
  onActiveIdChange?: (id: string) => void;
};

export function AssistantWidget({ onControl, activeId: controlledActiveId, onActiveIdChange }: AssistantWidgetProps) {
  const reduceMotion = useReducedMotion();

  const suggestions = useMemo<Suggestion[]>(
    () => [
      {
        id: "landed",
        label: "I just landed",
        resultTitle: "Start where you are",
        resultSubtitle: "Pick what you need first (demo)",
        humanNote: "You're not alone in this — we'll walk through it together",
        kpi: { value: "3", label: "next steps suggested (demo)" },
        control: { goto: "situation", situation: "landed" },
        items: [
          {
            title: "Choose your situation",
            meta: "Housing, rides, essentials, community",
            tag: "Next",
          },
          {
            title: "See what changes",
            meta: "Outcomes, not more tabs",
            tag: "Demo",
          },
          {
            title: "Keep moving",
            meta: "From landing to belonging",
            tag: "Setly",
          },
        ],
      },
      {
        id: "housing",
        label: "I'm looking for housing",
        resultTitle: "Start with housing",
        resultSubtitle: "Verified housing + roommate match (demo)",
        humanNote: "Got it — this is usually the hardest part",
        kpi: { value: "3", label: "verified rooms found (demo)" },
        control: { goto: "helps", situation: "room" },
        items: [
          {
            title: "Verified housing option",
            meta: "$800–$950 · 0.6–1.2 miles",
            tag: "Verified",
          },
          {
            title: "Roommate match",
            meta: "2–3 roommates · move-in soon",
            tag: "Match",
          },
          {
            title: "Shortlist",
            meta: "Save & compare options",
            tag: "Next",
          },
        ],
      },
      {
        id: "transport",
        label: "I need rides / transport",
        resultTitle: "Get local help",
        resultSubtitle: "Transport help + community support (demo)",
        humanNote: "The community here wants to help",
        kpi: { value: "2", label: "rides available (demo)" },
        control: { goto: "helps", situation: "rides" },
        items: [
          {
            title: "Airport pickup",
            meta: "Tomorrow · flexible pickup",
            tag: "Support",
          },
          {
            title: "Moving items",
            meta: "Luggage-friendly",
            tag: "Support",
          },
          {
            title: "Confirm details",
            meta: "Pickup and coordination",
            tag: "Next",
          },
        ],
      },
      {
        id: "settled",
        label: "I want to feel settled here",
        resultTitle: "Essentials, simplified",
        resultSubtitle: "Essentials Guide + community support (demo)",
        humanNote: "You'll feel settled soon — one step at a time",
        kpi: { value: "1", label: "essentials guide opened (demo)" },
        control: { goto: "helps", situation: "essentials" },
        items: [
          {
            title: "Groceries + basics",
            meta: "Local options + setup tips",
            tag: "Guide",
          },
          {
            title: "Ask the community",
            meta: "Real people who’ve walked the same path",
            tag: "Community",
          },
          {
            title: "Keep moving",
            meta: "From landing to belonging",
            tag: "Setly",
          },
        ],
      },
    ],
    [],
  );

  const [uncontrolledActiveId, setUncontrolledActiveId] = useState<string>(suggestions[0]?.id ?? "");

  const activeId = controlledActiveId ?? uncontrolledActiveId;
  const setActiveId = (id: string) => {
    if (controlledActiveId === undefined) setUncontrolledActiveId(id);
    onActiveIdChange?.(id);
  };

  const active = suggestions.find((s) => s.id === activeId) ?? suggestions[0];


  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-brand-gold/8 blur-3xl" />

      <InteractiveCard className="relative setly-card--secondary p-0">
        <div className="rounded-3xl border border-border bg-linear-to-b from-surface to-surface-2 p-5">
          <p className="text-xs font-semibold tracking-[0.22em] text-muted">
            SETLY ASSISTANT
          </p>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
            <motion.span
              className="inline-flex h-2 w-2 rounded-full bg-brand-gold"
              animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-sm text-ink font-semibold">Ask Setly…</span>
            <motion.span
              aria-hidden="true"
              className="ml-auto h-4 w-px bg-border"
              animate={reduceMotion ? undefined : { opacity: [0.15, 0.75, 0.15] }}
              transition={reduceMotion ? undefined : { duration: 1.2, repeat: Infinity }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((s) => {
              const isActive = s.id === activeId;
              return (
                <motion.button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActiveId(s.id);

                    if (s.control?.goto) {
                      onControl?.({ type: "goto", state: s.control.goto });
                    }
                    if (s.control?.situation) {
                      onControl?.({ type: "setSituation", situation: s.control.situation });
                    }
                  }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                  className={
                    "rounded-full border px-3 py-2 text-xs font-semibold transition will-change-transform " +
                    (isActive
                      ? "border-brand-gold/40 bg-brand-gold/10 text-ink shadow-sm shadow-brand-gold/20"
                      : "border-border bg-surface text-muted hover:border-brand-gold/25 hover:text-ink")
                  }
                  aria-pressed={isActive}
                >
                  {s.label}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${active.id}-${activeId}`}
                className="rounded-3xl border border-border bg-surface p-4"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.985 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <p className="sr-only" aria-live="polite">
                  {active.resultTitle}
                </p>

                {active.humanNote && (
                  <div className="mb-4 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 px-3 py-2">
                    <p className="text-xs font-medium italic text-ink/90">
                      {active.humanNote}
                    </p>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{active.resultTitle}</p>
                    <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-muted">
                      {active.resultSubtitle}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-2xl border border-border bg-surface-2 px-3 py-2 text-right">
                    <p className="text-lg font-semibold text-ink">{active.kpi.value}</p>
                    <p className="text-[11px] font-semibold tracking-[0.22em] text-muted">
                      {active.kpi.label}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {active.items.map((it) => (
                    <div
                      key={it.title}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-surface-2 px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-semibold text-ink">{it.title}</p>
                        <p className="mt-1 text-xs font-semibold tracking-[0.12em] text-muted">
                          {it.meta}
                        </p>
                      </div>
                      <span className="mt-0.5 inline-flex h-6 items-center rounded-full border border-border bg-surface px-2 text-[11px] font-semibold tracking-[0.16em] text-muted">
                        {it.tag}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <p className="text-xs font-semibold tracking-[0.22em] text-muted">
                    DEMO OUTPUT
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="sr-only" aria-live="polite">
              {active.resultTitle}
            </p>
          </div>
        </div>
      </InteractiveCard>
    </div>
  );
}
