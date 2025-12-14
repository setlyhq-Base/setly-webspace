"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { InteractiveCard } from "@/components/ui/interactive-card";

type Step = {
  title: string;
  body: string;
};

type HowItWorksProps = {
  mode?: "scroll" | "compact";
};

export function HowItWorks({ mode = "scroll" }: HowItWorksProps) {
  const reduceMotion = useReducedMotion();

  const steps = useMemo<Step[]>(
    () => [
      {
        title: "Tell Setly your plan",
        body: "Step 1",
      },
      {
        title: "Get verified options + community support",
        body: "Step 2",
      },
      {
        title: "Settle faster (landing → belonging)",
        body: "Step 3",
      },
    ],
    [],
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mode === "compact") return;
    const container = containerRef.current;
    if (!container) return;

    const nodes = Array.from(container.querySelectorAll<HTMLElement>("[data-step]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));

        if (visible[0]) {
          const idx = Number(visible[0].target.getAttribute("data-step") ?? "0");
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      {
        root: null,
        threshold: 0.35,
        rootMargin: "-15% 0px -55% 0px",
      },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [mode]);

  const progressPct = steps.length <= 1 ? 0 : (activeIndex / (steps.length - 1)) * 100;

  return (
    <div ref={containerRef}>
      {mode === "scroll" ? (
        <div className="sticky top-20 z-10 hidden md:block">
        <div className="rounded-3xl border border-border bg-surface/95 p-5 backdrop-blur">
          <p className="text-xs font-semibold tracking-[0.22em] text-muted">
            HOW SETLY WORKS
          </p>

          <div className="mt-4">
            <div className="relative h-10">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border" />
              <motion.div
                className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-brand-gold"
                animate={reduceMotion ? undefined : { width: `${progressPct}%` }}
                initial={false}
                transition={reduceMotion ? undefined : { duration: 0.25, ease: "easeOut" }}
                style={reduceMotion ? { width: `${progressPct}%` } : undefined}
              />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between">
                {steps.map((s, idx) => {
                  const isActive = idx <= activeIndex;
                  return (
                    <button
                      key={s.title}
                      type="button"
                      className="flex flex-col items-center gap-2"
                      onClick={() => {
                        setActiveIndex(idx);
                        stepRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      aria-label={`Go to step ${idx + 1}`}
                    >
                      <span
                        className={
                          "h-3 w-3 rounded-full border transition" +
                          (isActive
                            ? " border-brand-gold bg-brand-gold"
                            : " border-border bg-surface")
                        }
                      />
                      <span className="text-xs font-semibold text-muted">{s.body}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-2 text-sm font-semibold text-ink">
              {steps[activeIndex]?.title}
            </p>
          </div>
        </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold tracking-[0.22em] text-muted">HOW SETLY WORKS</p>
          <div className="mt-4">
            <div className="relative h-10">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border" />
              <motion.div
                className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-brand-gold"
                animate={reduceMotion ? undefined : { width: `${progressPct}%` }}
                initial={false}
                transition={reduceMotion ? undefined : { duration: 0.25, ease: "easeOut" }}
                style={reduceMotion ? { width: `${progressPct}%` } : undefined}
              />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between">
                {steps.map((s, idx) => {
                  const isActive = idx <= activeIndex;
                  return (
                    <button
                      key={s.title}
                      type="button"
                      className="flex flex-col items-center gap-2"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Go to step ${idx + 1}`}
                    >
                      <span
                        className={
                          "h-3 w-3 rounded-full border transition" +
                          (isActive
                            ? " border-brand-gold bg-brand-gold"
                            : " border-border bg-surface")
                        }
                      />
                      <span className="text-xs font-semibold text-muted">{s.body}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={(mode === "compact" ? "mt-4" : "mt-8") + " grid gap-4 md:grid-cols-3"}>
        {steps.map((s, idx) => (
          <div
            key={s.title}
            data-step={idx}
            ref={(el) => {
              stepRefs.current[idx] = el;
            }}
          >
            <InteractiveCard tilt className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-muted">{s.body}</p>
                  <p className="mt-3 text-sm font-semibold text-ink">{s.title}</p>
                </div>
                <span
                  className={
                    "mt-1 h-2 w-2 shrink-0 rounded-full" +
                    (idx === activeIndex ? " bg-brand-gold" : " bg-border")
                  }
                />
              </div>
            </InteractiveCard>
          </div>
        ))}
      </div>
    </div>
  );
}
