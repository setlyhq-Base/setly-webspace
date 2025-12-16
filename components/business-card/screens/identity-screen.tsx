"use client";

import { motion } from "framer-motion";

interface IdentityScreenProps {
  onNext: () => void;
}

export function IdentityScreen({ onNext }: IdentityScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 bg-white">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Unified Logo Lockup - Dots falling on S */}
        <motion.div
          className="flex items-start mb-10"
          initial={{ 
            scale: 0.3, 
            opacity: 0,
            filter: "blur(8px)"
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            filter: "blur(0px)"
          }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <h1 className="text-5xl font-bold text-[var(--setly-ink)] tracking-tight relative">
            <img 
              src="/setly_logo.png" 
              alt="" 
              className="w-10 h-10 absolute -left-1 -top-2.5 mix-blend-multiply"
              style={{ backgroundColor: 'transparent' }}
            />
            <span className="inline-block pl-8">Setly</span>
          </h1>
        </motion.div>

        {/* Tagline & Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, delay: 1.2 }}
          className="text-center space-y-5 mb-12"
        >
          <h2 className="text-3xl font-semibold text-[var(--setly-ink)] leading-tight">
            Your next move
          </h2>
          <p className="text-lg text-[var(--setly-text-secondary)] leading-relaxed max-w-sm mx-auto">
            Setly helps students and expats settle into a new place — faster, calmer, together.
          </p>
        </motion.div>

        {/* CTA Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 28, delay: 1.5 }}
          className="w-full space-y-4"
        >
          <button
            onClick={onNext}
            className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] transition-all"
          >
            See how Setly works
          </button>
          
          <p className="text-sm text-center text-[var(--setly-muted)]">
            Takes ~45 seconds · No signup
          </p>
        </motion.div>

        {/* Swipe indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 24, delay: 1.8 }}
          className="flex justify-center mt-8"
        >
          <div className="flex items-center gap-2 text-xs text-[var(--setly-muted)]">
            <span>Swipe to explore</span>
            <span>→</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
