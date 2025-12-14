"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface MomentScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSelectMoment: (moment: string) => void;
}

const moments = [
  {
    id: "landed",
    title: "Just landed in the U.S.",
    icon: "✈️",
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    activeColor: "bg-blue-100",
  },
  {
    id: "housing",
    title: "Looking for housing",
    icon: "🏠",
    color: "bg-purple-50",
    borderColor: "border-purple-200",
    activeColor: "bg-purple-100",
  },
  {
    id: "essentials",
    title: "Need rides / essentials",
    icon: "🚗",
    color: "bg-green-50",
    borderColor: "border-green-200",
    activeColor: "bg-green-100",
  },
  {
    id: "community",
    title: "Don't want to feel alone",
    icon: "👥",
    color: "bg-orange-50",
    borderColor: "border-orange-200",
    activeColor: "bg-orange-100",
  },
];

export function MomentScreen({ onNext, onBack, onSelectMoment }: MomentScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (momentId: string) => {
    setSelected(momentId);
    onSelectMoment(momentId);
  };

  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <div className="h-full flex flex-col px-6 py-8 bg-[var(--setly-surface-2)]">
      <div className="max-w-md w-full mx-auto flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-[var(--setly-ink)] mb-2">
            The moment
          </h2>
          <p className="text-[var(--setly-text-secondary)]">
            Which situation feels most familiar?
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex-1 space-y-3 overflow-y-auto pb-6">
          {moments.map((moment, index) => (
            <motion.button
              key={moment.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              onClick={() => handleSelect(moment.id)}
              className={`
                w-full p-5 rounded-2xl border-2 transition-all text-left
                ${selected === moment.id
                  ? `${moment.activeColor} ${moment.borderColor} shadow-lg scale-[1.02]`
                  : `${moment.color} border-transparent hover:border-gray-200`
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{moment.icon}</div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-[var(--setly-ink)]">
                    {moment.title}
                  </p>
                </div>
                {selected === moment.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-[var(--setly-primary-blue)] flex items-center justify-center"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>
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
            onClick={handleContinue}
            disabled={!selected}
            className={`
              w-full rounded-2xl px-8 py-4 text-lg font-medium transition-all
              ${selected
                ? 'bg-[var(--setly-primary-blue)] text-white shadow-lg shadow-blue-500/25 active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continue
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
