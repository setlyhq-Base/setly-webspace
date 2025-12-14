"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface StoryScreenProps {
  onNext: () => void;
  onBack: () => void;
  onExploreApp: () => void;
}

const storyBlocks = [
  {
    title: "What is Setly?",
    content: [
      "Setly = Settle + Easily",
      "",
      "A platform to help you settle into a new place — faster, calmer, together.",
    ],
    icon: "🏡",
    gradient: "from-blue-50 to-white",
  },
  {
    title: "The problem",
    content: [
      "Landing somewhere new means:",
      "Housing, rides, groceries, people, trust — all at once.",
      "",
      "You open 20 tabs and still feel lost.",
    ],
    icon: "😰",
    gradient: "from-orange-50 to-white",
  },
  {
    title: "The solution",
    content: [
      "Setly brings:",
      "• Housing",
      "• Rides",
      "• Essentials",
      "• Community",
      "",
      "into one calm, guided experience.",
    ],
    icon: "✨",
    gradient: "from-purple-50 to-white",
  },
  {
    title: "Why it works",
    content: [
      "Built from lived experience.",
      "Verified community of Setlies.",
      "Designed for your first weeks, not power users.",
    ],
    icon: "💙",
    gradient: "from-blue-50 to-white",
  },
];

export function StoryScreen({ onNext, onBack, onExploreApp }: StoryScreenProps) {
  const [currentBlock, setCurrentBlock] = useState(0);

  const nextBlock = () => {
    if (currentBlock < storyBlocks.length - 1) {
      setCurrentBlock(currentBlock + 1);
    }
  };

  const prevBlock = () => {
    if (currentBlock > 0) {
      setCurrentBlock(currentBlock - 1);
    }
  };

  const block = storyBlocks[currentBlock];
  const isLastBlock = currentBlock === storyBlocks.length - 1;

  return (
    <div className="h-full flex flex-col px-6 py-8 bg-white">
      <div className="max-w-md w-full mx-auto flex flex-col h-full">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {storyBlocks.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBlock(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentBlock
                  ? "w-8 bg-[var(--setly-primary-blue)]"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Story Block */}
        <motion.div
          key={currentBlock}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col justify-center"
        >
          <div
            className={`bg-gradient-to-b ${block.gradient} rounded-3xl p-8 shadow-lg`}
          >
            {/* Icon */}
            <div className="text-6xl mb-6 text-center">{block.icon}</div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-[var(--setly-ink)] mb-6 text-center">
              {block.title}
            </h2>

            {/* Content */}
            <div className="space-y-3">
              {block.content.map((line, idx) => (
                <p
                  key={idx}
                  className={`text-lg ${
                    line === ""
                      ? "h-2"
                      : line.startsWith("•")
                      ? "text-[var(--setly-ink)] pl-2"
                      : line === "Setly = Settle + Easily"
                      ? "text-[var(--setly-primary-blue)] font-semibold text-center"
                      : "text-[var(--setly-text-secondary)]"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="space-y-3 pt-6">
          {!isLastBlock ? (
            <>
              <button
                onClick={nextBlock}
                className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-medium shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
              >
                Continue
              </button>
              {currentBlock > 0 && (
                <button
                  onClick={prevBlock}
                  className="w-full text-[var(--setly-text-secondary)] py-2 text-sm"
                >
                  ← Previous
                </button>
              )}
            </>
          ) : (
            <>
              {/* Primary CTAs */}
              <button
                onClick={onExploreApp}
                className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-medium shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
              >
                Explore the app experience
              </button>
              <button
                onClick={onNext}
                className="w-full bg-white border-2 border-[var(--setly-primary-blue)] text-[var(--setly-primary-blue)] rounded-2xl px-8 py-4 text-lg font-medium active:scale-[0.98] transition-all"
              >
                Get early access
              </button>

              {/* Secondary options */}
              <div className="flex justify-center gap-6 pt-2 text-sm">
                <button
                  onClick={onBack}
                  className="text-[var(--setly-text-secondary)] hover:text-[var(--setly-ink)]"
                >
                  Meet the founder
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied!");
                  }}
                  className="text-[var(--setly-text-secondary)] hover:text-[var(--setly-ink)]"
                >
                  Share Setly
                </button>
              </div>
            </>
          )}
        </div>

        {/* Back to beginning */}
        {isLastBlock && (
          <button
            onClick={onBack}
            className="w-full text-[var(--setly-text-secondary)] py-2 text-sm mt-2"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
