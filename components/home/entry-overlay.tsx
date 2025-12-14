"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { InteractiveCard } from "@/components/ui/interactive-card";

export type EntryChoice = "landed" | "housing" | "essentials" | "community";

type EntryOverlayProps = {
  isOpen: boolean;
  onChoose: (choice: EntryChoice) => void;
};

const choices: Array<{
  id: EntryChoice;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}> = [
  {
    id: "landed",
    label: "I just landed",
    sublabel: "From arrival to settled",
    icon: (
      <svg
        className="h-8 w-8"
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
    id: "housing",
    label: "I need housing",
    sublabel: "Verified rooms + roommates",
    icon: (
      <svg
        className="h-8 w-8"
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
    id: "essentials",
    label: "I need transport",
    sublabel: "Rides + essentials",
    icon: (
      <svg
        className="h-8 w-8"
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
    id: "community",
    label: "I feel alone",
    sublabel: "Real people, real support",
    icon: (
      <svg
        className="h-8 w-8"
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

export function EntryOverlay({ isOpen, onChoose }: EntryOverlayProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-surface/95 p-4 backdrop-blur-md"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, transition: { duration: 0.3, ease: "easeIn" } }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="w-full max-w-3xl"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -24 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold tracking-[0.22em] text-muted">SETLY</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                What do you need right now?
              </h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {choices.map((choice, idx) => (
                <motion.div
                  key={choice.id}
                  initial={
                    reduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 1, y: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: reduceMotion ? 0 : 0.2 + idx * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <InteractiveCard className="h-full p-0" tilt>
                    <button
                      type="button"
                      onClick={() => onChoose(choice.id)}
                      className="flex h-full w-full flex-col items-start gap-3 rounded-3xl p-6 text-left transition hover:bg-surface-2/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-ink">
                        {choice.icon}
                      </span>
                      <div>
                        <p className="text-base font-semibold text-ink">
                          {choice.label}
                        </p>
                        <p className="mt-1 text-sm text-muted">{choice.sublabel}</p>
                      </div>
                    </button>
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs font-semibold tracking-[0.18em] text-muted">
              THIS WILL TAKE 45 SECONDS
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
