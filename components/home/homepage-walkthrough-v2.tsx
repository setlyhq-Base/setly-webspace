"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/container";
import { EntryOverlay, type EntryChoice } from "@/components/home/entry-overlay";
import { ConversationalAssistant } from "@/components/home/conversational-assistant";
import { FeaturesPreview, type FeatureKey } from "@/components/home/features-preview";
import { SituationSelector, type SituationKey } from "@/components/home/situation-selector";
import { InteractiveCard } from "@/components/ui/interactive-card";
import type { UserContext } from "@/lib/openai-assistant";

export type JourneyStep = "welcome" | "choose" | "explore";

const steps: JourneyStep[] = ["welcome", "choose", "explore"];

function clampStepIndex(index: number) {
  return Math.max(0, Math.min(steps.length - 1, index));
}

function stepToIndex(step: JourneyStep) {
  return Math.max(0, steps.indexOf(step));
}

function stepTitle(s: JourneyStep): string {
  if (s === "welcome") return "Welcome";
  if (s === "choose") return "Choose your path";
  return "Explore what changes";
}

function stepLabel(s: JourneyStep): string {
  if (s === "welcome") return "Start";
  if (s === "choose") return "Your situation";
  return "What changes";
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

function StepIcon({ step, isComplete }: { step: JourneyStep; isComplete: boolean }) {
  const common = {
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (isComplete) {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }

  if (step === "welcome") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }

  if (step === "choose") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" {...common}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function MiniIcon({ kind }: { kind: "home" | "car" | "bag" | "people" | "spark" | "check" }) {
  const common = {
    className: "h-4 w-4 text-muted",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "check") {
    return (
      <svg viewBox="0 0 24 24" {...common} className="h-4 w-4 text-brand-blue">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }

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

export function HomepageWalkthrough() {
  const reduceMotion = useReducedMotion();

  const [showEntry, setShowEntry] = useState(true);

  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex] ?? "welcome";

  const [situation, setSituation] = useState<SituationKey>("landed");
  const [entryChoice, setEntryChoice] = useState<EntryChoice | undefined>();
  const [selectedFeatures, setSelectedFeatures] = useState<FeatureKey[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<JourneyStep>>(new Set());

  const wheelLockRef = useRef(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Build user context for AI assistant
  const userContext: UserContext = {
    entryChoice,
    currentStep: step,
    situation,
    selectedFeatures,
    completedSteps: Array.from(completedSteps)
  };

  const goNext = useCallback(() => {
    const current = stepIndex;
    const next = clampStepIndex(current + 1);
    if (next > current) {
      setCompletedSteps((prev) => new Set([...prev, steps[current]!]));
    }
    setStepIndex(next);
  }, [stepIndex]);

  const goPrev = useCallback(() => {
    setStepIndex((idx) => clampStepIndex(idx - 1));
  }, []);

  const goToStep = (idx: number) => {
    const target = clampStepIndex(idx);
    setStepIndex(target);
  };

  const handleEntryChoice = (choice: EntryChoice) => {
    setShowEntry(false);
    setEntryChoice(choice);

    // Map entry choice to initial state
    if (choice === "landed") {
      setStepIndex(stepToIndex("welcome"));
      setSituation("landed");
    } else if (choice === "housing") {
      setStepIndex(stepToIndex("choose"));
      setSituation("room");
      setCompletedSteps(new Set(["welcome"]));
    } else if (choice === "essentials") {
      setStepIndex(stepToIndex("choose"));
      setSituation("essentials");
      setCompletedSteps(new Set(["welcome"]));
    } else if (choice === "community") {
      setStepIndex(stepToIndex("choose"));
      setSituation("people");
      setCompletedSteps(new Set(["welcome"]));
    }
  };

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const onWheel = (e: WheelEvent) => {
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) < 18) return;

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
  }, [stepIndex, goNext, goPrev]);

  const journeyProgress = useMemo(() => {
    return Math.round(((stepIndex + 1) / steps.length) * 100);
  }, [stepIndex]);

  return (
    <>
      <EntryOverlay isOpen={showEntry} onChoose={handleEntryChoice} />

      <div className="setly-canvas min-h-screen overflow-visible py-6 md:py-8">
        <Container>
          {/* Always-visible journey progress */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-muted">YOUR JOURNEY</p>
                <p className="mt-1 text-sm font-semibold text-ink">{journeyProgress}% complete</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold tracking-[0.18em] text-muted">
                  STEP {stepIndex + 1} OF {steps.length}
                </p>
              </div>
            </div>

            {/* Visual journey rail */}
            <div className="mt-4">
              <div className="relative">
                {/* Progress bar background */}
                <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full bg-brand-blue"
                    initial={{ width: "0%" }}
                    animate={{ width: `${journeyProgress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>

                {/* Step markers */}
                <div className="mt-3 flex items-center justify-between">
                  {steps.map((s, idx) => {
                    const isActive = idx === stepIndex;
                    const isComplete = completedSteps.has(s);
                    const isPast = idx < stepIndex;

                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => goToStep(idx)}
                        className="group flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        <span
                          className={
                            "flex h-8 w-8 items-center justify-center rounded-full border-2 transition " +
                            (isActive
                              ? "border-brand-blue bg-brand-blue/20 text-brand-blue"
                              : isComplete || isPast
                                ? "border-brand-blue/60 bg-brand-blue/10 text-brand-blue"
                                : "border-border bg-surface text-muted group-hover:border-brand-blue/30")
                          }
                        >
                          <StepIcon step={s} isComplete={isComplete || isPast} />
                        </span>
                        <span
                          className={
                            "text-xs font-semibold " +
                            (isActive ? "text-ink" : "text-muted")
                          }
                        >
                          {stepLabel(s)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            {/* Main stage */}
            <div className="md:col-span-8" ref={stageRef}>
              <div className="setly-stage setly-hero setly-noise relative overflow-hidden rounded-3xl p-6 md:p-8">
                <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-28 -bottom-28 h-72 w-72 rounded-full bg-brand-blue/5 blur-3xl" />

                <div className="relative">
                  <p className="text-xs font-semibold tracking-[0.22em] text-muted">SETLY</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {stepTitle(step)}
                  </h2>

                  <div className="mt-6">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={step}
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -18 }}
                        transition={{ duration: 0.26, ease: "easeOut" }}
                      >
                        {step === "welcome" ? (
                          <div>
                            <p className="max-w-2xl text-base leading-7 text-ink">
                              The moment after you land — when you don&apos;t know where to start.
                            </p>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                              <InteractiveCard tilt className="setly-card--secondary p-5">
                                <div className="flex items-center gap-3">
                                  <MiniIcon kind="people" />
                                  <p className="text-sm font-semibold text-ink">
                                    For students & expats
                                  </p>
                                </div>
                              </InteractiveCard>

                              <InteractiveCard tilt className="setly-card--secondary p-5">
                                <div className="flex items-center gap-3">
                                  <MiniIcon kind="spark" />
                                  <p className="text-sm font-semibold text-ink">
                                    Landing → Belonging
                                  </p>
                                </div>
                              </InteractiveCard>
                            </div>

                            {stepIndex === 0 && (
                              <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                                  >
                                    Continue →
                                  </button>
                              </div>
                            )}
                          </div>
                        ) : null}

                        {step === "choose" ? (
                          <div>
                            <p className="text-base leading-7 text-ink">
                              What matters most right now?
                            </p>

                            <div className="mt-6">
                              <SituationSelector
                                value={situation}
                                onChange={(next) => {
                                  setSituation(next);
                                  goNext();
                                  setCompletedSteps((prev) => new Set([...prev, "choose"]));
                                }}
                              />
                            </div>
                          </div>
                        ) : null}

                        {step === "explore" ? (
                          <div>
                            <p className="text-base leading-7 text-ink">
                              What changes with the right help
                            </p>

                            <div className="mt-6">
                              <FeaturesPreview
                                key={`${situation}-explore`}
                                visibleKeys={situationToVisibleKeys(situation)}
                                initialKey={situationToInitialKey(situation)}
                                onSelect={(key) => {
                                  setSelectedFeatures(prev => [...new Set([...prev, key])]);
                                  setCompletedSteps((prev) => new Set([...prev, "explore"]));
                                }}
                              />
                            </div>

                            {completedSteps.has("explore") && (
                              <motion.div
                                className="mt-8 overflow-hidden rounded-3xl border border-brand-blue/40 bg-linear-to-br from-brand-blue/10 via-brand-blue/5 to-surface"
                                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
                                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                              >
                                <div className="p-6 text-center">
                                  <motion.div
                                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-blue/50 bg-brand-blue/20"
                                    initial={reduceMotion ? { scale: 1 } : { scale: 0 }}
                                    animate={reduceMotion ? { scale: 1 } : { scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
                                  >
                                    <MiniIcon kind="check" />
                                  </motion.div>

                                  <h3 className="mt-4 text-lg font-semibold text-ink">
                                    You don&apos;t have to figure this out alone
                                  </h3>
                                  
                                  <p className="mt-2 text-sm leading-6 text-muted">
                                    Setly is being built for moments like yours — when landing somewhere new feels overwhelming, and you need help that actually understands.
                                  </p>

                                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                                    <a
                                      href="https://tally.so/r/wQ9ByX"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-blue/20 transition hover:bg-brand-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                                    >
                                      Join the waitlist
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowEntry(true);
                                        setStepIndex(0);
                                        setCompletedSteps(new Set());
                                      }}
                                      className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                                    >
                                      Start over
                                    </button>
                                  </div>

                                  <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-muted/60">
                                    EARLY ACCESS • NO COMMITMENT
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistant panel */}
            <div className="md:col-span-4">
              <div className="relative z-10 md:sticky md:top-24">
                <ConversationalAssistant userContext={userContext} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
