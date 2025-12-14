"use client";

import { motion } from "framer-motion";

interface DifferenceScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const differences = [
  {
    icon: "✓",
    title: "Trusted",
    description: "Verified community members only",
  },
  {
    icon: "🤝",
    title: "Community-driven",
    description: "Built by Setlies, for Setlies",
  },
  {
    icon: "💙",
    title: "Lived experience",
    description: "We've been exactly where you are",
  },
  {
    icon: "🌱",
    title: "For your journey",
    description: "Start. Evolve. Thrive. Live your way.",
  },
];

export function DifferenceScreen({ onNext, onBack }: DifferenceScreenProps) {
  return (
    <div className="h-full flex flex-col px-6 py-8 bg-gradient-to-b from-white to-[var(--setly-primary-blue-soft)]">
      <div className="max-w-md w-full mx-auto flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-[var(--setly-ink)] mb-2">
            Why it's different
          </h2>
          <p className="text-[var(--setly-text-secondary)]">
            More than just another app
          </p>
        </motion.div>

        {/* Difference Cards */}
        <div className="flex-1 space-y-4 overflow-y-auto pb-6">
          {differences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--setly-primary-blue-soft)] flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--setly-ink)] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[var(--setly-text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="space-y-3"
        >
          <button
            onClick={onNext}
            className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-medium shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
          >
            Meet the founder
          </button>
          <button
            onClick={onBack}
            className="w-full text-[var(--setly-text-secondary)] py-2 text-sm"
          >
            ← Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
