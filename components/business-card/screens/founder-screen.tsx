"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FounderScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function FounderScreen({ onNext, onBack }: FounderScreenProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white via-white to-[var(--setly-primary-blue)]/[0.02] relative overflow-hidden">
      <div className="relative z-10 flex flex-col h-full px-8 py-10">
        <div className="max-w-sm w-full mx-auto flex flex-col h-full justify-between">
          
          {/* The flip card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.1 }}
            className="flex-1 flex flex-col justify-center -mt-6 perspective-1000"
          >
            <div 
              className="relative w-full cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* FRONT SIDE - Emotional / Human */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                style={{ 
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d"
                }}
                className={isFlipped ? "hidden" : "block"}
              >
                {/* Photo - intimate, not profile */}
                <div className="w-28 h-28 rounded-full mx-auto mb-6 shadow-xl overflow-hidden ring-4 ring-white">
                  <img 
                    src="/kiran_builder.jpg" 
                    alt="Kiran" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Emotional content */}
                <div className="space-y-6 text-center">
                  <h2 className="text-2xl text-[var(--setly-ink)] leading-relaxed font-semibold px-2">
                    I moved to the U.S. for grad school.
                  </h2>

                  <p className="text-base text-[var(--setly-text-secondary)] leading-relaxed px-2">
                    I remember the chaos — finding housing, getting rides, buying essentials, feeling completely lost in a new place.
                  </p>

                  <p className="text-base text-[var(--setly-ink)] leading-relaxed px-2 font-medium pt-2">
                    Setly is what I wish existed when I landed.
                  </p>

                  {/* Signature */}
                  <div className="pt-4 text-sm text-[var(--setly-text-secondary)]/60">
                    — Kiran
                  </div>

                  {/* Flip hint */}
                  <div className="pt-6 text-sm text-[var(--setly-primary-blue)] font-medium">
                    Tap to see what Setly is →
                  </div>
                </div>
              </motion.div>

              {/* BACK SIDE - Business / Product Meaning */}
              <motion.div
                animate={{ rotateY: isFlipped ? 0 : -180 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                style={{ 
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d"
                }}
                className={!isFlipped ? "hidden" : "block"}
              >
                <div className="space-y-6 text-center px-2">
                  <h2 className="text-2xl text-[var(--setly-ink)] leading-tight font-bold">
                    What is Setly?
                  </h2>

                  <p className="text-base text-[var(--setly-ink)] leading-relaxed font-medium">
                    Setly helps students and expats settle into a new place — faster, calmer, together.
                  </p>

                  <p className="text-base text-[var(--setly-text-secondary)] leading-relaxed">
                    Housing, rides, essentials, and community — brought into one trusted experience.
                  </p>

                  <p className="text-base text-[var(--setly-text-secondary)] leading-relaxed">
                    Built from lived experience, designed for people navigating real transitions.
                  </p>

                  <p className="text-base text-[var(--setly-ink)] leading-relaxed pt-4 font-semibold">
                    Start. Evolve. Thrive. Live your way.
                  </p>

                  {/* Flip hint */}
                  <div className="pt-6 text-sm text-[var(--setly-primary-blue)] font-medium">
                    ← Tap to flip back
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Forward momentum - not conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Contact - subtle, not dominant */}
            <div className="flex items-center justify-center gap-4 pb-2">
              <a
                href="mailto:setlyhq@gmail.com"
                className="text-[var(--setly-text-secondary)] hover:text-[var(--setly-primary-blue)] transition-colors"
                title="Email Kiran"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/revally-kiran/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--setly-text-secondary)] hover:text-[var(--setly-primary-blue)] transition-colors"
                title="Connect on LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </a>
            </div>

            {/* CTA - creates curiosity for what's next */}
            <div className="space-y-3">
              <button
                onClick={onNext}
                className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] transition-all"
              >
                See how it works
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
