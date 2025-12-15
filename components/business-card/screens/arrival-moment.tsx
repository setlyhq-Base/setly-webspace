"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ArrivalMomentProps {
  onComplete: () => void;
}

export function ArrivalMoment({ onComplete }: ArrivalMomentProps) {
  useEffect(() => {
    // Auto-advance after 3.5 seconds
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#0F172A] flex items-center justify-center px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-medium text-white text-center leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3,
          ease: [0.32, 0.72, 0, 1] 
        }}
      >
        Remember when you first landed?
      </motion.h1>
    </motion.div>
  );
}
