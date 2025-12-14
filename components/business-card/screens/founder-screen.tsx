"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FounderScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function FounderScreen({ onNext, onBack }: FounderScreenProps) {

  return (
    <div className="h-full flex flex-col px-6 py-8 bg-white">
      <div className="max-w-md w-full mx-auto flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--setly-primary-blue)] to-[var(--setly-primary-blue-dark)] mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
            KR
          </div>
          <h2 className="text-2xl font-bold text-[var(--setly-ink)] mb-1">
            Kiran Revally
          </h2>
          <p className="text-[var(--setly-text-secondary)]">
            Founder & Builder
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex-1 space-y-6 overflow-y-auto pb-6"
        >
          <div className="bg-[var(--setly-surface-2)] rounded-2xl p-6">
            <p className="text-[var(--setly-ink)] leading-relaxed">
              I moved to the U.S. for grad school. I remember the chaos — finding housing,
              getting rides, buying essentials, feeling lost.
            </p>
          </div>

          <div className="bg-[var(--setly-surface-2)] rounded-2xl p-6">
            <p className="text-[var(--setly-ink)] leading-relaxed">
              Setly is what I wish existed when I landed. Built from lived experience,
              for people going through exactly what I did. You're not alone — you'll figure this out.
            </p>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            <a
              href="mailto:setlyhq@gmail.com"
              className="flex items-center gap-3 p-4 rounded-xl bg-white border-2 border-[var(--setly-border)] hover:border-[var(--setly-primary-blue)] transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--setly-primary-blue-soft)] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--setly-primary-blue)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-[var(--setly-ink)]">Email</div>
                <div className="text-sm text-[var(--setly-text-secondary)]">
                  setlyhq@gmail.com
                </div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/revally-kiran/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-white border-2 border-[var(--setly-border)] hover:border-[var(--setly-primary-blue)] transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--setly-primary-blue-soft)] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="var(--setly-primary-blue)"
                  className="w-5 h-5"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-[var(--setly-ink)]">LinkedIn</div>
                <div className="text-sm text-[var(--setly-text-secondary)]">
                  Connect with me
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Waitlist CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="space-y-3"
        >
          <button
            onClick={onNext}
            className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-medium shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
          >
            What is Setly really?
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
