"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/container";
import { AssistantWidget } from "@/components/home/assistant-widget";
import { FeaturesPreview, type FeatureKey } from "@/components/home/features-preview";
import { SituationSelector, type SituationKey } from "@/components/home/situation-selector";
import { InteractiveCard } from "@/components/ui/interactive-card";

export type WalkthroughState = "arrival" | "situation" | "helps";

const states: WalkthroughState[] = ["arrival", "situation", "helps"];

function clampIndex(index: number) {
  return Math.max(0, Math.min(states.length - 1, index));
}

function stateToIndex(state: WalkthroughState) {
  return Math.max(0, states.indexOf(state));
}

function nextStateTitle(state: WalkthroughState): string | null {
  const idx = stateToIndex(state);
  const next = states[idx + 1];
  if (!next) return null;
  if (next === "arrival") return "From landing to belonging";
  if (next === "situation") return "Start where you are";
  return "What changes for you";
}

function stateTitle(s: WalkthroughState): string {
  if (s === "arrival") return "From landing to belonging";
  if (s === "situation") return "Start where you are";
  return "What changes for you";
}

function ChapterIcon({ state }: { state: WalkthroughState }) {
  const common = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (state === "arrival") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11z" />
        <path d="M12 10.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z" />
      </svg>
    );
  }

  if (state === "situation") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 3v3" />
        <path d="M21 12h-3" />
        <path d="M12 21v-3" />
        <path d="M3 12h3" />
        <path d="M17.2 6.8l-2.1 2.1" />
        <path d="M8.9 15.1l-2.1 2.1" />
        <path d="M6.8 6.8l2.1 2.1" />
        <path d="M15.1 15.1l2.1 2.1" />
        <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 2l1.2 5.1L18 9l-4.6 2.4L12 17l-1.4-5.6L6 9l4.8-1.9L12 2z" />
      <path d="M19 13.5l.7 2.7L22 17l-2.3.8L19 20l-.7-2.2L16 17l2.3-.8.7-2.7z" />
    </svg>
  );
}

function MiniIcon({ kind }: { kind: "home" | "car" | "bag" | "people" | "spark" }) {
  const common = {
    className: "h-4 w-4 text-muted",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "home") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M3 10.5l9-7 9 7" />
        <path d="M6.5 9.5V20h11V9.5" />
        <path d="M10 20v-6h4v6" />
      </svg>
    );
  }
  if (kind === "car") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M5 16l1.5-6h11L19 16" />
        <path d="M6.5 10h11" />
        <path d="M6.5 16.5H5.2A1.2 1.2 0 0 1 4 15.3V16" />
        <path d="M17.5 16.5h1.3A1.2 1.2 0 0 0 20 15.3V16" />
        <path d="M7.5 18a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
        <path d="M16.5 18a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
      </svg>
    );
  }
  if (kind === "bag") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M7 8V7a5 5 0 0 1 10 0v1" />
        <path d="M6 8h12l-1 13H7L6 8z" />
        <path d="M9 11v2" />
        <path d="M15 11v2" />
      </svg>
    );
  }
  if (kind === "people") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M16 11a3 3 0 1 0-6 0" />
        <path d="M8 11a3 3 0 1 0-6 0" />
        <path d="M2.5 20a6.5 6.5 0 0 1 11-4" />
        <path d="M11 20a6 6 0 0 1 10.5-3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 2l1.2 5.1L18 9l-4.6 2.4L12 17l-1.4-5.6L6 9l4.8-1.9L12 2z" />
    </svg>
  );
}

function situationToVisibleKeys(situation: SituationKey): FeatureKey[] {
  return situation === "room"
    ? ["rooms", "community", "alerts"]
    : situation === "rides"
      ? ["rides", "community", "alerts"]
      : situation === "essentials"
        ? ["marketplace", "community", "alerts"]
        : ["community", "rooms", "alerts"];
}

function situationToInitialKey(situation: SituationKey): FeatureKey {
  return situation === "room"
    ? "rooms"
    : situation === "rides"
      ? "rides"
      : situation === "essentials"
        ? "marketplace"
        : "community";
}

export function HomepageWalkthrough() {
  const reduceMotion = useReducedMotion();

  const [stateIndex, setStateIndex] = useState(0);
  const state = states[stateIndex] ?? "arrival";

  const [situation, setSituation] = useState<SituationKey>("landed");

  const [assistantActiveId, setAssistantActiveId] = useState<string>("landed");
  const [stageFeedback, setStageFeedback] = useState<string | null>(null);

  const wheelLockRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const goNext = () => {
    setStateIndex((idx) => clampIndex(idx + 1));
  };

  const goPrev = () => {
    setStateIndex((idx) => clampIndex(idx - 1));
  };

  const goTo = (idx: number) => {
    setStateIndex(clampIndex(idx));
  };

  const announce = (msg: string) => {
    setStageFeedback(msg);
    window.setTimeout(() => setStageFeedback(null), 2400);
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onWheel = (e: WheelEvent) => {
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) < 18) return;

      // Guided journey, with freedom: wheel can move back/forward.

      e.preventDefault();
      wheelLockRef.current = true;

      if (e.deltaY > 0) goNext();
      else goPrev();

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 520);
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, []);

  const stageTitle = useMemo(() => stateTitle(state), [state]);

  const nextTitle = useMemo(() => nextStateTitle(state), [state]);
  const journeyLabel = useMemo(() => `Step ${clampIndex(stateIndex) + 1} of ${states.length}`, [stateIndex]);

  const accentClass = useMemo(() => {
    if (state === "arrival") return "bg-brand-gold/10";
    if (state === "situation") return "bg-brand-midnight/6";
    return "bg-brand-gold/10";
  }, [state]);

  const accentClass2 = useMemo(() => {
    if (state === "arrival") return "bg-brand-midnight/6";
    if (state === "situation") return "bg-brand-gold/10";
    return "bg-brand-midnight/6";
  }, [state]);

  return (
    <div
      className="setly-canvas h-full overflow-visible"
    >
      <Container>
        <div className="grid h-full gap-6 py-6 md:grid-cols-12 md:gap-8 md:py-8">
          {/* Living canvas */}
          <div className="md:col-span-8" ref={containerRef}>
            <div className="relative h-full">
              <div className="setly-stage setly-hero setly-noise relative h-full overflow-hidden rounded-3xl p-6 md:p-8">
                <div className={"pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl " + accentClass} />
                <div className={"pointer-events-none absolute -right-28 -bottom-28 h-72 w-72 rounded-full blur-3xl " + accentClass2} />

                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.22em] text-muted">SETLY</p>
                    <div className="mt-3 flex items-center gap-2 text-ink">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-border bg-surface">
                        <ChapterIcon state={state} />
                      </span>
                      <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{stageTitle}</p>
                    </div>
                  </div>

                  {/* chapters (interactive) */}
                  <div className="mt-1">
                    <p className="text-xs font-semibold tracking-[0.18em] text-muted" aria-live="polite">
                      {journeyLabel}
                    </p>
                    <p className="mt-1 text-xs font-semibold tracking-[0.12em] text-muted">
                      A 45-second guided walkthrough — so you understand Setly in minutes.
                    </p>
                    <nav className="mt-2" aria-label="Chapters">
                      <ol className="flex items-center gap-2">
                        {states.map((s, idx) => {
                          const isActive = idx === stateIndex;
                          const isDone = idx < stateIndex;
                          return (
                            <li key={s} className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => goTo(idx)}
                                className={
                                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface" +
                                  (isActive
                                    ? " border-brand-gold/40 bg-brand-gold/10 text-ink"
                                    : isDone
                                      ? " border-border bg-surface text-ink hover:bg-surface-2"
                                      : " border-border bg-surface text-muted hover:text-ink hover:bg-surface-2")
                                }
                                aria-current={isActive ? "step" : undefined}
                                aria-label={`Go to step ${idx + 1}: ${stateTitle(s)}`}
                              >
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border bg-surface-2">
                                  {idx + 1}
                                </span>
                                <span className="hidden sm:inline">{stateTitle(s)}</span>
                              </button>
                              {idx < states.length - 1 ? (
                                <span
                                  aria-hidden="true"
                                  className={
                                    "h-px w-6" +
                                    (idx < stateIndex ? " bg-border" : " bg-border/60")
                                  }
                                />
                              ) : null}
                            </li>
                          );
                        })}
                      </ol>
                    </nav>
                  </div>
                </div>

                <div className="mt-6">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={state}
                      initial={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: 18, filter: "blur(6px)" }
                      }
                      animate={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0, filter: "blur(0px)" }
                      }
                      exit={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: -18, filter: "blur(4px)" }
                      }
                      transition={{ duration: 0.26, ease: "easeOut" }}
                    >
                      {stageFeedback ? (
                        <motion.div
                          className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-ink"
                          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          aria-live="polite"
                        >
                          <span className="inline-flex h-2 w-2 rounded-full bg-brand-gold" aria-hidden="true" />
                          {stageFeedback}
                        </motion.div>
                      ) : null}

                      {state === "arrival" ? (
                        <div>
                          <p className="max-w-2xl text-lg font-semibold leading-8 text-ink">
                            Setly exists for the moment after you land somewhere new — when you don’t know where to start.
                          </p>
                          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                            The toughest part of relocating isn’t the visa or the work — it’s belonging. Finding a home,
                            friends, rhythm, identity.
                          </p>

                          <div className="mt-6 rounded-3xl border border-border bg-surface-2 p-5">
                            <p className="text-sm font-semibold text-ink">
                              The moment this is built for
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted">
                              “A student landing at JFK with two bags and no clue where to go.”
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {[
                                { id: "landed", label: "I just landed" },
                                { id: "moving", label: "Moving soon" },
                              ].map((chip) => (
                                <button
                                  key={chip.id}
                                  type="button"
                                  onClick={() => {
                                    if (chip.id === "landed") {
                                      setAssistantActiveId("landed");
                                      announce("Got it — start where you are.");
                                      goTo(stateToIndex("situation"));
                                    } else {
                                      setAssistantActiveId("housing");
                                      announce("Got it — let’s make the first week lighter.");
                                      setSituation("room");
                                      goTo(stateToIndex("situation"));
                                    }
                                  }}
                                  className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-ink transition hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                                >
                                  {chip.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="mt-8 grid gap-4 md:grid-cols-2">
                            <InteractiveCard tilt className="setly-card--secondary p-6">
                              <div className="flex items-center justify-between gap-4">
                                <p className="text-xs font-semibold tracking-[0.22em] text-muted">WHO IT’S FOR</p>
                                <MiniIcon kind="people" />
                              </div>
                              <p className="mt-3 text-sm font-semibold text-ink">
                                Built for students, professionals, and expats relocating.
                              </p>
                              <p className="mt-2 text-sm leading-6 text-muted">
                                A guided way to settle in with less chaos — with local help and real people who’ve walked the same path.
                              </p>
                            </InteractiveCard>

                            <InteractiveCard tilt className="setly-card--secondary p-6">
                              <div className="flex items-center justify-between gap-4">
                                <p className="text-xs font-semibold tracking-[0.22em] text-muted">NORTH STAR</p>
                                <MiniIcon kind="spark" />
                              </div>
                              <p className="mt-3 text-sm font-semibold text-ink">
                                “From landing to belonging.”
                              </p>
                              <p className="mt-2 text-sm leading-6 text-muted">
                                “To become the North Star for anyone moving to a new place — guiding them from landing to belonging.”
                              </p>
                            </InteractiveCard>
                          </div>

                          {nextTitle ? (
                            <div className="mt-7 flex items-center justify-between gap-4">
                              <p className="text-sm text-muted">
                                Next: <span className="font-semibold text-ink">{nextTitle}</span>
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={goNext}
                                  data-testid="canvas-next"
                                  className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                                  aria-label={`Continue to ${nextTitle}`}
                                >
                                  Continue →
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      {state === "situation" ? (
                        <div>
                          <div className="rounded-3xl border border-border bg-surface-2 p-5">
                            <p className="text-sm font-semibold text-ink">You’re not looking for another app.</p>
                            <p className="mt-2 text-sm leading-6 text-muted">
                              You’re looking for a calmer way to move and belong — without feeling lost.
                            </p>
                            <div className="mt-4 grid gap-2">
                              {[
                                { text: "Finding accommodation", icon: "home" as const },
                                { text: "Arranging transportation from JFK", icon: "car" as const },
                                { text: "Locating groceries and basic essentials", icon: "bag" as const },
                              ].map((item) => (
                                <div key={item.text} className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3">
                                  <MiniIcon kind={item.icon} />
                                  <p className="text-sm font-semibold text-ink">{item.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6">
                          <SituationSelector
                            value={situation}
                            onChange={(next) => {
                              setSituation(next);
                              announce("Got it — here’s what changes.");
                              setStateIndex(clampIndex(stateToIndex("helps")));
                            }}
                          />
                          </div>

                          {nextTitle ? (
                            <div className="mt-7 flex items-center justify-between gap-4">
                              <p className="text-sm text-muted">
                                Next: <span className="font-semibold text-ink">{nextTitle}</span>
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setStateIndex(clampIndex(stateToIndex("arrival")))}
                                  data-testid="canvas-back"
                                  className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                                  aria-label="Go back"
                                >
                                  Back
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setStateIndex(clampIndex(stateToIndex("helps")))}
                                  data-testid="canvas-next"
                                  className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                                  aria-label={`Continue to ${nextTitle}`}
                                >
                                  Continue →
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      {state === "helps" ? (
                        <div>
                          <div className="rounded-3xl border border-border bg-surface-2 p-5">
                            <p className="text-sm font-semibold text-ink">Outcomes first.</p>
                            <div className="mt-3 grid gap-2">
                              {[
                                { text: "Find trusted housing faster", icon: "home" as const },
                                { text: "Access essentials and local help without chaos", icon: "bag" as const },
                                { text: "Connect with real people who’ve walked the same path", icon: "people" as const },
                              ].map((item) => (
                                <div key={item.text} className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3">
                                  <MiniIcon kind={item.icon} />
                                  <p className="text-sm font-semibold text-ink">{item.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6">
                          <FeaturesPreview
                            key={`${situation}-walkthrough`}
                            visibleKeys={situationToVisibleKeys(situation)}
                            initialKey={situationToInitialKey(situation)}
                            onSelect={() => announce("Got it — here’s what changes.")}
                          />
                          </div>

                          <div className="mt-7 flex items-center justify-between gap-4">
                            <p className="text-sm text-muted">
                              Back: <span className="font-semibold text-ink">Start where you are</span>
                            </p>
                            <button
                              type="button"
                              onClick={() => setStateIndex(clampIndex(stateToIndex("situation")))}
                              data-testid="canvas-back"
                              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                              aria-label="Go back"
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Assistant (controller, not hero) */}
          <div className="md:col-span-4">
            <div className="relative z-10 md:sticky md:top-24">
              <AssistantWidget
                activeId={assistantActiveId}
                onActiveIdChange={setAssistantActiveId}
                onControl={(control) => {
                  if (control.type === "goto") {
                    if (
                      control.state === "arrival" ||
                      control.state === "situation" ||
                      control.state === "helps"
                    ) {
                          setStateIndex(clampIndex(stateToIndex(control.state)));
                    }
                    return;
                  }

                  if (control.type === "setSituation") {
                    setSituation(control.situation);
                    announce("Got it — here’s what changes.");
                        setStateIndex(clampIndex(stateToIndex("helps")));
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
