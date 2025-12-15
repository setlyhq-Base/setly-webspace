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
          
          {/* The one belief - centered, calm, powerful */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 flex flex-col justify-center text-center -mt-8"
          >
            <h2 className="text-[40px] leading-[1.15] font-bold text-[var(--setly-ink)] mb-8">
              Real people<br />
              helping real people
            </h2>
            
            <p className="text-lg text-[var(--setly-text-secondary)] leading-relaxed mb-6">
              No corporations.<br />
              No algorithms optimizing for ads.<br />
              No strangers you can't trust.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base text-[var(--setly-ink)] leading-relaxed font-medium"
            >
              Just a verified community,<br />
              built by people who've been<br />
              exactly where you are.
            </motion.div>
          </motion.div>

          {/* Bridge - creates emotional transition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mb-8"
          >
            <div className="text-center mb-6">
              <p className="text-sm text-[var(--setly-text-secondary)]/60 italic leading-relaxed">
                This belief didn't come from a boardroom.<br />
                It came from lived experience.
              </p>
            </div>

            {/* CTA - feels inevitable */}
            <div className="space-y-3">
              <button
                onClick={onNext}
                className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] transition-all"
              >
                Meet the founder
              </button>
              <button
                onClick={onBack}
                className="w-full text-[var(--setly-text-secondary)] hover:text-[var(--setly-ink)] py-2 text-sm font-medium transition-colors"
              >
                ← Back
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
