"use client";

import type { ReactNode } from "react";

import { useMemo, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { InteractiveCard } from "@/components/ui/interactive-card";
import { BeforeAfterVisual } from "./before-after-visual";

export type FeatureKey =
  | "rooms"
  | "rides"
  | "marketplace"
  | "community"
  | "alerts";

type Feature = {
  key: FeatureKey;
  title: string;
  summary: string;
  previewTitle: string;
  previewSubtitle: string;
  preview: ReactNode;
  icon: ReactNode;
};

type FeaturesPreviewProps = {
  initialKey?: FeatureKey;
  visibleKeys?: FeatureKey[];
  onSelect?: (key: FeatureKey) => void;
};

export function FeaturesPreview({ initialKey, visibleKeys, onSelect }: FeaturesPreviewProps) {
  const reduceMotion = useReducedMotion();

  const features = useMemo<Feature[]>(
    () => [
      {
        key: "rooms",
        title: "Find a place faster",
        summary: "Verified housing + roommate match (demo)",
        previewTitle: "Housing, simplified",
        previewSubtitle: "Verified housing + roommate match (demo)",
        icon: (
          <svg
            className="h-5 w-5"
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
        preview: (
          <div className="grid gap-3">
            {[
              "Verified housing option",
              "Roommate Connect option",
              "Essentials nearby",
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-border bg-surface px-4 py-3"
              >
                <p className="text-sm font-semibold text-ink">{t}</p>
                <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-muted">
                  DEMO
                </p>
              </div>
            ))}
          </div>
        ),
      },
      {
        key: "rides",
        title: "Get from landing to living",
        summary: "Transport help (demo)",
        previewTitle: "Transport",
        previewSubtitle: "Transport help (demo)",
        icon: (
          <svg
            className="h-5 w-5"
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
        preview: (
          <div className="grid gap-3">
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-sm font-semibold text-ink">Airport pickup</p>
              <p className="mt-1 text-sm leading-6 text-muted">Need a ride from JFK</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-sm font-semibold text-ink">Moving items</p>
              <p className="mt-1 text-sm leading-6 text-muted">From landing to living</p>
            </div>
          </div>
        ),
      },
      {
        key: "marketplace",
        title: "Set up essentials quickly",
        summary: "Essentials Guide + basics (demo)",
        previewTitle: "Essentials Guide",
        previewSubtitle: "Groceries + setup basics (demo)",
        icon: (
          <svg
            className="h-5 w-5"
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
        preview: (
          <div className="grid gap-3">
            {[
              "Groceries",
              "Setup basics",
              "Local help",
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-border bg-surface px-4 py-3"
              >
                <p className="text-sm font-semibold text-ink">{t}</p>
                <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-muted">
                  GUIDE
                </p>
              </div>
            ))}
          </div>
        ),
      },
      {
        key: "community",
        title: "Meet people who've been there",
        summary: "Trusted community support (demo)",
        previewTitle: "Community support",
        previewSubtitle: "Real people who've walked the same path",
        icon: (
          <svg
            className="h-5 w-5"
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
        preview: (
          <div className="grid gap-3">
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-sm font-semibold text-ink">Verified local connection</p>
              <p className="mt-1 text-sm leading-6 text-muted">Local help</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-sm font-semibold text-ink">Verified communities</p>
              <p className="mt-1 text-sm leading-6 text-muted">Community reliability</p>
            </div>
          </div>
        ),
      },
      {
        key: "alerts",
        title: "Stop checking 100 tabs",
        summary: "Saved filters → notify you (planned)",
        previewTitle: "Alerts",
        previewSubtitle: "Saved filters → notify you (planned)",
        icon: (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M10.5 5a7.5 7.5 0 0 1 7.5 7.5c0 7.046-7.5 11.25-7.5 11.25S3 19.546 3 12.5A7.5 7.5 0 0 1 10.5 5z" />
            <path d="M18 8l3 3-3 3" />
          </svg>
        ),
        preview: (
          <div className="grid gap-3">
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-sm font-semibold text-ink">Saved filter</p>
              <p className="mt-1 text-sm leading-6 text-muted">Notify you when it matches</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <p className="text-sm font-semibold text-ink">New match</p>
              <p className="mt-1 text-sm leading-6 text-muted">From landing to belonging</p>
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  const visible = useMemo(() => {
    if (!visibleKeys || visibleKeys.length === 0) return features;
    const set = new Set(visibleKeys);
    return features.filter((f) => set.has(f.key));
  }, [features, visibleKeys]);

  const [activeKey, setActiveKey] = useState<FeatureKey>(
    initialKey ?? visible[0]?.key ?? "rooms",
  );

  const active = visible.find((f) => f.key === activeKey) ?? visible[0];

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-5">
        <div className="grid gap-3">
          {visible.map((f) => {
            const isActive = f.key === activeKey;
            return (
              <InteractiveCard
                key={f.key}
                tilt
                className={
                  "p-0" +
                  (isActive
                    ? " ring-1 ring-brand-blue/50 border-brand-blue/40"
                    : "")
                }
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveKey(f.key);
                    onSelect?.(f.key);
                  }}
                  className="flex w-full items-start justify-between gap-4 rounded-3xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  aria-pressed={isActive}
                >
                  <div className="flex gap-3">
                    <div
                      className={
                        "shrink-0 mt-0.5 transition-colors " +
                        (isActive
                          ? "text-brand-blue"
                          : "text-muted/60")
                      }
                    >
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{f.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">{f.summary}</p>
                    </div>
                  </div>
                  <span
                    className={
                      "mt-1 h-2 w-2 shrink-0 rounded-full" +
                      (isActive ? " bg-brand-blue" : " bg-border")
                    }
                  />
                </button>
              </InteractiveCard>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-7">
        <InteractiveCard className="p-0">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="text-xs font-semibold tracking-[0.22em] text-muted">
              PREVIEW
            </p>
            <p className="mt-3 text-lg font-semibold text-ink">{active.previewTitle}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{active.previewSubtitle}</p>

            <div className="mt-6">
              <BeforeAfterVisual
                before={{
                  label: "WITHOUT SETLY",
                  items: ["100 tabs open", "Strangers messaging you", "No idea what's real"],
                }}
                after={{
                  label: "WITH SETLY",
                  items: ["One place, verified", "Trusted community", "You know what's next"],
                }}
              />
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-surface-2 p-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.key}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {active?.preview}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </InteractiveCard>
      </div>
    </div>
  );
}
