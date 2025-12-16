"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState } from "react";

interface ExperienceScreenProps {
  onNext: () => void;
  onBack: () => void;
  selectedMoment: string | null;
}

// Core problems and solutions - simplified, human
const solutions = [
  {
    id: "housing",
    problem: "Finding housing",
    painPoint: "Random Facebook groups. Scams everywhere. No way to tell who's real.",
    solution: "Verified students only. Real listings. Safe payments. Your community helps you settle.",
    color: "#7C3AED",
    lightBg: "#FAFAFE",
  },
  {
    id: "rides",
    problem: "Getting around",
    painPoint: "Uber drains your budget. Can't find people going the same way. No coordination.",
    solution: "Split rides with verified students. Same route, same timing. Save money, make friends.",
    color: "#10B981",
    lightBg: "#F7FEF9",
  },
  {
    id: "essentials",
    problem: "Buying essentials",
    painPoint: "Everything's expensive when new. Craigslist feels sketchy. Don't know where to shop.",
    solution: "Buy and sell within your student community. Local pickup. Fair prices. Real people.",
    color: "#F59E0B",
    lightBg: "#FFFEF7",
  },
  {
    id: "community",
    problem: "Feeling alone",
    painPoint: "Don't know anyone. Generic apps feel forced. Hard to find people who get it.",
    solution: "Connect with students who share your experience. Real bonds, not networking.",
    color: "#4F8DFF",
    lightBg: "#F7FBFF",
  },
];

export function ExperienceScreen({ onNext, onBack }: ExperienceScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const current = solutions[activeIndex];

  // Swipe navigation
  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 60;
    const velocity = 400;

    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocity) {
      if (info.offset.x > 0 && activeIndex > 0) {
        setDirection(-1);
        setActiveIndex(activeIndex - 1);
      } else if (info.offset.x < 0 && activeIndex < solutions.length - 1) {
        setDirection(1);
        setActiveIndex(activeIndex + 1);
      }
    }
  };

  const navigateTo = (index: number) => {
    if (index !== activeIndex) {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Minimal back */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-gray-400 hover:text-gray-900 transition-colors text-sm"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back</span>
      </button>

      <div className="flex-1 flex flex-col px-6 pt-20 pb-6">
        <div className="max-w-lg w-full mx-auto flex flex-col h-full">
          
          {/* Simple headline */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[28px] font-semibold text-gray-900 mb-2 leading-tight"
          >
            Here's what you'll need
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 mb-8 text-[15px]"
          >
            And how Setly makes each one easier
          </motion.p>

          {/* Pagination dots - simple, calm */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {solutions.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateTo(index)}
                className="transition-all duration-300"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 h-1.5'
                      : 'w-1.5 h-1.5 opacity-20 hover:opacity-40'
                  }`}
                  style={{
                    backgroundColor: index === activeIndex ? current.color : '#94a3b8'
                  }}
                />
              </button>
            ))}
          </div>

          {/* Main content - horizontal carousel */}
          <div className="flex-1 relative mb-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
                transition={{
                  x: { type: "spring", stiffness: 280, damping: 32, mass: 0.8 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 flex flex-col"
              >
                {/* Problem section */}
                <div className="mb-12">
                  <div className="flex items-baseline gap-3 mb-4">
                    <div 
                      className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0"
                      style={{ backgroundColor: current.color }}
                    />
                    <h3 className="text-[22px] font-semibold text-gray-900">
                      {current.problem}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-[16px] leading-relaxed pl-6">
                    {current.painPoint}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-gray-200 to-transparent mb-12 ml-6" />

                {/* Solution section */}
                <div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                      style={{ backgroundColor: current.color }}
                    />
                    <h4 
                      className="text-xs uppercase tracking-wider font-semibold"
                      style={{ color: current.color }}
                    >
                      How Setly helps
                    </h4>
                  </div>
                  <p className="text-gray-900 text-[16px] leading-relaxed font-medium pl-6">
                    {current.solution}
                  </p>
                </div>

                {/* Swipe hint - very subtle */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 text-gray-300 text-xs">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                  <span>Swipe</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Continue button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={onNext}
            className="w-full bg-gray-900 text-white rounded-2xl px-8 py-4 text-[17px] font-semibold shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20 active:scale-[0.98] transition-all"
          >
            Continue
          </motion.button>

        </div>
      </div>
    </div>
  );
}
