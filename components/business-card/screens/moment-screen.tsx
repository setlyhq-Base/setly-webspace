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
    subtitle: "Everything feels new",
    gradient: "from-slate-50 to-blue-50/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 3L3 9L12 15L21 9L12 3Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 15L12 21L21 15" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15V21" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "housing",
    title: "Looking for housing",
    subtitle: "Need a place to call home",
    gradient: "from-slate-50 to-violet-50/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12H15V22" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "essentials",
    title: "Need rides & essentials",
    subtitle: "Getting around is a puzzle",
    gradient: "from-slate-50 to-emerald-50/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V11L4.45 5.9C4.61696 5.55849 4.87808 5.27118 5.20269 5.07434C5.5273 4.87749 5.9 4.77907 6.28 4.79H17.72C18.1 4.77907 18.4727 4.87749 18.7973 5.07434C19.1219 5.27118 19.383 5.55849 19.55 5.9L22 11V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "community",
    title: "Don't want to feel alone",
    subtitle: "Looking for connection",
    gradient: "from-slate-50 to-amber-50/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
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
    <div className="h-full flex flex-col px-6 py-8 bg-white">
      <div className="max-w-md w-full mx-auto flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-[var(--setly-ink)] mb-2">
            The moment
          </h2>
          <p className="text-base text-[var(--setly-text-secondary)]">
            Which situation feels most familiar?
          </p>
        </motion.div>

        {/* Premium Cards */}
        <div className="flex-1 space-y-3 overflow-y-auto pb-4 px-4 pt-2">
          {moments.map((moment, index) => {
            const isSelected = selected === moment.id;
            
            return (
              <motion.button
                key={moment.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                onClick={() => handleSelect(moment.id)}
                className={`
                  group relative w-full p-3 rounded-2xl text-left
                  transition-all duration-300 ease-out
                  ${isSelected
                    ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-[1.02] ring-2 ring-[var(--setly-primary-blue)] ring-offset-2'
                    : 'bg-white shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.08)] hover:scale-[1.01]'
                  }
                `}
              >
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${moment.gradient} opacity-50 transition-opacity duration-300 ${isSelected ? 'opacity-70' : 'group-hover:opacity-60'}`} />
                
                {/* Content */}
                <div className="relative flex items-start gap-3">
                  {/* Icon */}
                  <motion.div 
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isSelected 
                        ? 'bg-[var(--setly-primary-blue)] text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-slate-100/80 text-slate-600 group-hover:bg-slate-200/80'
                    }`}
                    animate={isSelected ? { scale: [1, 1.1, 1], rotate: [0, -5, 0] } : {}}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {moment.icon}
                  </motion.div>
                  
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-semibold mb-0.5 transition-colors duration-300 ${
                      isSelected ? 'text-[var(--setly-ink)]' : 'text-[var(--setly-ink)] group-hover:text-[var(--setly-primary-blue)]'
                    }`}>
                      {moment.title}
                    </h3>
                    <p className="text-xs text-[var(--setly-text-secondary)]">
                      {moment.subtitle}
                    </p>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--setly-primary-blue)] flex items-center justify-center shadow-lg shadow-blue-500/30"
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
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`
              w-full rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300
              ${selected
                ? 'bg-[var(--setly-primary-blue)] text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            Continue
          </button>
          <button
            onClick={onBack}
            className="w-full text-[var(--setly-text-secondary)] hover:text-[var(--setly-ink)] py-2 text-sm font-medium transition-colors"
          >
            ← Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
