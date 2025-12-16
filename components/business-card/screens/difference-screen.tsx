"use client";

import { motion } from "framer-motion";

interface DifferenceScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function DifferenceScreen({ onNext, onBack }: DifferenceScreenProps) {
  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden">
      <div className="relative z-10 flex flex-col h-full px-8 py-12">
        <div className="max-w-sm w-full mx-auto flex flex-col h-full justify-between">
          
          {/* The justification - why Setly needs to exist */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.1 }}
            className="flex-1 flex flex-col justify-center text-center -mt-4"
          >
            <h2 className="text-[32px] leading-[1.2] font-bold text-[var(--setly-ink)] mb-10">
              Why Setly exists
            </h2>
            
            <div className="space-y-8 text-left px-2">
              {/* Trusted */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }}
              >
                <h3 className="text-base font-semibold text-[var(--setly-ink)] mb-1.5">
                  Trusted
                </h3>
                <p className="text-sm text-[var(--setly-text-secondary)] leading-relaxed">
                  Random groups and strangers fail when you're new to a place. Setly verifies everyone, so you settle with people you can trust.
                </p>
              </motion.div>

              {/* Community-driven */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.3 }}
              >
                <h3 className="text-base font-semibold text-[var(--setly-ink)] mb-1.5">
                  Community-driven
                </h3>
                <p className="text-sm text-[var(--setly-text-secondary)] leading-relaxed">
                  Feeds and posts don't help you settle. Setly connects you with people who've been exactly where you are — not algorithms chasing engagement.
                </p>
              </motion.div>

              {/* Built from lived experience */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.4 }}
              >
                <h3 className="text-base font-semibold text-[var(--setly-ink)] mb-1.5">
                  Built from lived experience
                </h3>
                <p className="text-sm text-[var(--setly-text-secondary)] leading-relaxed">
                  This wasn't designed in a boardroom. Setly was built by someone who moved countries and felt the chaos — so it solves real problems, not theoretical ones.
                </p>
              </motion.div>

              {/* Journey-first */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.5 }}
              >
                <h3 className="text-base font-semibold text-[var(--setly-ink)] mb-1.5">
                  Journey-first
                </h3>
                <p className="text-sm text-[var(--setly-text-secondary)] leading-relaxed">
                  Settling isn't a checklist — it's a transition. Setly guides you through housing, rides, essentials, and community as one connected experience, not scattered apps.
                </p>
              </motion.div>
            </div>

            {/* Closing thought */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 24, delay: 0.7 }}
              className="text-sm text-[var(--setly-ink)]/60 italic mt-10"
            >
              Setly exists because everything else was built for a different problem.
            </motion.div>
          </motion.div>

          {/* Natural continuation - not forced choice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.8 }}
            className="space-y-3"
          >
            <button
              onClick={onNext}
              className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] transition-all"
            >
              Continue
            </button>
            <button
              onClick={onBack}
              className="w-full text-[var(--setly-text-secondary)] hover:text-[var(--setly-ink)] py-2 text-sm font-medium transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
