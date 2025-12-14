"use client";

import { motion } from "framer-motion";

interface IdentityScreenProps {
  onNext: () => void;
}

export function IdentityScreen({ onNext }: IdentityScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 bg-white">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[var(--setly-primary-blue)] mb-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-[var(--setly-ink)] mb-2">
            Setly
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-semibold text-[var(--setly-ink)] leading-tight">
            From landing to belonging.
          </h2>
          <p className="text-lg text-[var(--setly-text-secondary)] leading-relaxed">
            Setly helps students and expats settle into a new place — faster, calmer, together.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="pt-8"
        >
          <button
            onClick={onNext}
            className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] transition-all"
          >
            See how
          </button>
        </motion.div>

        {/* Subtle indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center pt-4"
        >
          <div className="flex gap-2 text-xs text-[var(--setly-muted)]">
            <span>Swipe to explore</span>
            <span>→</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
