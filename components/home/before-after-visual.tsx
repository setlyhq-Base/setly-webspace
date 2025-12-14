"use client";

import { motion, useReducedMotion } from "framer-motion";

type BeforeAfterVisualProps = {
  before: {
    label: string;
    items: string[];
  };
  after: {
    label: string;
    items: string[];
  };
};

export function BeforeAfterVisual({ before, after }: BeforeAfterVisualProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {/* Before */}
      <motion.div
        className="rounded-2xl border border-border/50 bg-surface/50 p-4"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-muted/40" />
          <p className="text-xs font-semibold tracking-[0.18em] text-muted/60">
            {before.label}
          </p>
        </div>
        <div className="space-y-2">
          {before.items.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-2 text-sm text-muted/70 line-through opacity-60"
              initial={reduceMotion ? { opacity: 0.6 } : { opacity: 0, x: -5 }}
              animate={reduceMotion ? { opacity: 0.6 } : { opacity: 0.6, x: 0 }}
              transition={{ duration: 0.2, delay: 0.2 + idx * 0.05 }}
            >
              <span className="mt-1 text-xs">×</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* After */}
      <motion.div
        className="rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-4"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
          <p className="text-xs font-semibold tracking-[0.18em] text-ink">
            {after.label}
          </p>
        </div>
        <div className="space-y-2">
          {after.items.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-2 text-sm font-medium text-ink"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 5 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.3 + idx * 0.05 }}
            >
              <span className="mt-0.5 text-brand-gold">✓</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
