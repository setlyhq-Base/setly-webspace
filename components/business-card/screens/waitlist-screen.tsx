"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface WaitlistScreenProps {
  onBack: () => void;
  onExploreApp: () => void;
}

export function WaitlistScreen({ onBack, onExploreApp }: WaitlistScreenProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to actual waitlist API
    console.log("Early access signup:", email);
    setSubmitted(true);
  };

  return (
    <div className="h-full flex flex-col px-6 py-8 bg-gradient-to-b from-[var(--setly-primary-blue-soft)] to-white">
      <div className="max-w-md w-full mx-auto flex flex-col h-full justify-center">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold text-[var(--setly-ink)] mb-3">
                Get early access
              </h2>
              <p className="text-lg text-[var(--setly-text-secondary)]">
                Be part of the first Setlies
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-[var(--setly-border)] focus:border-[var(--setly-primary-blue)] outline-none text-lg bg-white"
              />
              <button
                type="submit"
                className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-medium shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
              >
                Get notified when Setly launches
              </button>
            </form>

            {/* Secondary options */}
            <div className="space-y-3 pt-4">
              <button
                onClick={onExploreApp}
                className="w-full text-[var(--setly-primary-blue)] font-medium py-3"
              >
                Explore the app experience first
              </button>
              <button
                onClick={onBack}
                className="w-full text-[var(--setly-text-secondary)] py-2 text-sm"
              >
                ← Back
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 text-center"
          >
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-[var(--setly-ink)] mb-3">
              You're on the list!
            </h2>
            <p className="text-lg text-[var(--setly-text-secondary)] mb-8">
              We'll email you when Setly launches.
            </p>

            <div className="space-y-3">
              <button
                onClick={onExploreApp}
                className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-medium shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
              >
                Explore the app experience
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied! Share Setly with friends.");
                }}
                className="w-full text-[var(--setly-text-secondary)] py-3"
              >
                Share Setly
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
