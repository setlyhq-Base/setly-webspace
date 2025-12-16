"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ExperienceScreenProps {
  onNext: () => void;
  onBack: () => void;
  selectedMoment: string | null;
}

const features = [
  {
    id: "housing",
    title: "Housing",
    description: "Find trusted rooms & rentals",
    preview: "Verified listings • Local matching • No scams",
    stats: [
      { label: "Verified", value: "100%" },
      { label: "Response", value: "< 2hrs" },
      { label: "Trust", value: "4.8★" }
    ],
    features: ["Verified only", "Real people", "Safe payments"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11">
        <path d="M3 10L12 3L21 10V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V10Z"/>
        <path d="M9 21V13H15V21"/>
      </svg>
    ),
    iconSmall: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 10L12 3L21 10V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V10Z"/>
      </svg>
    ),
    accentColor: "#7C3AED",
    lightAccent: "#F5F3FF",
    problems: [
      "Facebook groups",
      "Scams and fake listings",
      "No verification",
      "Too many messages",
    ],
    solutions: [
      "Verified listings only",
      "Real people, real places",
      "Location-based matching",
      "Community trust built-in",
    ],
    whyItWorks: "Trust matters when you're new. Random groups and strangers fail because there's no verification. Setly verifies everyone, so you settle with people you can actually trust.",
  },
  {
    id: "rides",
    title: "Rides",
    description: "Share rides, save money",
    preview: "Split costs • Verified riders • Safe & social",
    stats: [
      { label: "Savings", value: "60%" },
      { label: "Verified", value: "100%" },
      { label: "Rating", value: "4.9★" }
    ],
    features: ["Split costs", "Route match", "In-app chat"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11">
        <circle cx="7" cy="17" r="2"/>
        <circle cx="17" cy="17" r="2"/>
        <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V11.5L4.5 6C4.65 5.65 4.9 5.35 5.2 5.15C5.5 4.95 5.85 4.85 6.2 4.85H17.8C18.15 4.85 18.5 4.95 18.8 5.15C19.1 5.35 19.35 5.65 19.5 6L22 11.5V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19"/>
      </svg>
    ),
    iconSmall: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="7" cy="17" r="2"/>
        <circle cx="17" cy="17" r="2"/>
        <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V11.5"/>
      </svg>
    ),
    accentColor: "#10B981",
    lightAccent: "#F0FDF4",
    problems: [
      "Uber is expensive",
      "Can't find ride buddies",
      "Unsafe random drivers",
      "No coordination tools",
    ],
    solutions: [
      "Split costs with verified students",
      "Matched by route & timing",
      "Community-based trust",
      "Built-in messaging",
    ],
    whyItWorks: "Getting around shouldn't drain your budget or feel unsafe. Setly matches you with verified students going the same way, so you split costs and build connections — not just take rides.",
  },
  {
    id: "marketplace",
    title: "Essentials",
    description: "Buy & sell what you need",
    preview: "Student-to-student • Local pickup • Trusted",
    stats: [
      { label: "Local", value: "100%" },
      { label: "Savings", value: "40%" },
      { label: "Sold in", value: "< 3d" }
    ],
    features: ["Local pickup", "Verified sellers", "Fair pricing"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11">
        <path d="M2 2H4.5L7 14.5C7.1 15 7.35 15.4 7.7 15.7C8.05 16 8.5 16.15 8.95 16.15H18.5C18.95 16.15 19.4 16 19.75 15.7C20.1 15.4 20.35 15 20.45 14.5L22.5 6.5H6"/>
        <circle cx="9" cy="20.5" r="1.5"/>
        <circle cx="18" cy="20.5" r="1.5"/>
      </svg>
    ),
    iconSmall: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M2 2H4.5L7 14.5"/>
        <circle cx="9" cy="20.5" r="1.5"/>
        <circle cx="18" cy="20.5" r="1.5"/>
      </svg>
    ),
    accentColor: "#F59E0B",
    lightAccent: "#FFFBEB",
    problems: [
      "Need to buy everything new",
      "Don't know where to shop",
      "Craigslist feels sketchy",
      "No local recommendations",
    ],
    solutions: [
      "Buy/sell within your community",
      "Local pickup only",
      "Verified buyers & sellers",
      "Student-to-student exchange",
    ],
    whyItWorks: "You don't need brand new everything, and Craigslist feels sketchy. Setly keeps it local and student-to-student — verified people from your community, not random strangers.",
  },
  {
    id: "community",
    title: "Community",
    description: "Connect with people like you",
    preview: "Fellow Setlies • Shared experiences • Real connections",
    stats: [
      { label: "Users", value: "2.5k+" },
      { label: "Response", value: "95%" },
      { label: "Rating", value: "4.9★" }
    ],
    features: ["Find Setlies", "Local groups", "Real bonds"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11">
        <circle cx="9" cy="7" r="4"/>
        <path d="M2 21V19C2 17.9391 2.42143 16.9217 3.17157 16.1716C3.92172 15.4214 4.93913 15 6 15H12C13.0609 15 14.0783 15.4214 14.8284 16.1716C15.5786 16.9217 16 17.9391 16 19V21"/>
        <path d="M16 4C16.8604 4.22031 17.623 4.72071 18.1676 5.42232C18.7122 6.12392 19.0078 6.98683 19.0078 7.875C19.0078 8.76318 18.7122 9.62608 18.1676 10.3277C17.623 11.0293 16.8604 11.5297 16 11.75"/>
        <path d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13"/>
      </svg>
    ),
    iconSmall: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="9" cy="7" r="4"/>
        <path d="M2 21V19C2 17.9391 2.42143 16.9217 3.17157 16.1716C3.92172 15.4214 4.93913 15 6 15H12"/>
      </svg>
    ),
    accentColor: "#4F8DFF",
    lightAccent: "#EFF6FF",
    problems: [
      "Feeling isolated",
      "Don't know anyone yet",
      "Hard to meet locals",
      "Generic social apps",
    ],
    solutions: [
      "Connect with fellow Setlies",
      "Shared experience groups",
      "Location-based communities",
      "Real relationships, not networking",
    ],
    whyItWorks: "Loneliness is real when you're in a new place. Generic social apps feel forced. Setly connects you with people who share your interests and are actually nearby — verified students, not profiles.",
  },
];

// Context mapping: what matters first based on their situation
const momentContext = {
  landed: {
    label: "Just landed in the U.S.",
    headline: "Just landed? Here's what usually matters first",
    primaryFeature: "housing",
    order: ["housing", "rides", "marketplace", "community"],
  },
  housing: {
    label: "Looking for housing",
    headline: "Looking for housing? Here's how Setly helps",
    primaryFeature: "housing",
    order: ["housing", "community", "marketplace", "rides"],
  },
  essentials: {
    label: "Need rides / essentials",
    headline: "Getting settled? Here's what you need",
    primaryFeature: "marketplace",
    order: ["marketplace", "rides", "housing", "community"],
  },
  community: {
    label: "Don't want to feel alone",
    headline: "Building connections? Here's how we help",
    primaryFeature: "community",
    order: ["community", "housing", "rides", "marketplace"],
  },
};

export function ExperienceScreen({ onNext, onBack, selectedMoment }: ExperienceScreenProps) {
  // Get context based on their selection
  const context = momentContext[selectedMoment as keyof typeof momentContext] || momentContext.landed;
  
  // Start with the most relevant feature for their situation
  const [activeFeature, setActiveFeature] = useState(context.primaryFeature);
  const [isFlipped, setIsFlipped] = useState(false);

  // Update active feature when selectedMoment changes
  useEffect(() => {
    setActiveFeature(context.primaryFeature);
    setIsFlipped(false);
  }, [selectedMoment, context.primaryFeature]);

  // Reset flip when changing features
  useEffect(() => {
    setIsFlipped(false);
  }, [activeFeature]);

  const currentFeature = features.find((f) => f.id === activeFeature) || features[0];

  // Reorder features based on their situation
  const orderedFeatures = context.order
    .map((id) => features.find((f) => f.id === id))
    .filter(Boolean) as typeof features;

  const handleCardTap = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Minimal top back - subtle, non-competing */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[var(--setly-text-secondary)]/60 hover:text-[var(--setly-ink)] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-16 pb-6 overflow-y-auto">
        <div className="max-w-md w-full mx-auto flex flex-col h-full">
          {/* Context badge - subtle */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 text-[var(--setly-text-secondary)] text-xs font-medium">
              <span className="text-[var(--setly-primary-blue)]">✓</span>
              <span>{context.label}</span>
            </div>
          </motion.div>

          {/* Header - clear hierarchy */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-[var(--setly-ink)] mb-3 leading-tight">
              {context.headline}
            </h2>
          </motion.div>

          {/* Category Navigation - ABOVE the card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.15 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            {orderedFeatures.map((feature) => {
              const isActive = activeFeature === feature.id;
              
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className="relative group transition-all"
                  title={feature.title}
                >
                  <div 
                    className={`
                      flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'w-12 h-12 rounded-xl' 
                        : 'w-9 h-9 rounded-lg opacity-30 hover:opacity-60'
                      }
                    `}
                    style={{
                      backgroundColor: isActive ? `${feature.accentColor}10` : 'transparent'
                    }}
                  >
                    <div 
                      className="transition-all duration-300"
                      style={{ 
                        color: isActive ? feature.accentColor : 'var(--setly-text-secondary)'
                      }}
                    >
                      {feature.iconSmall}
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Feature Card - Premium, intentional */}
          <div className="flex-1 min-h-0">
            {/* Single persistent card container */}
            <div 
              onClick={handleCardTap}
              className="relative h-full rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white cursor-pointer border border-gray-100/50 overflow-hidden"
            >
              {/* Flip container - preserves card shape */}
              <motion.div
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 1,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="relative h-full"
              >
                {/* Front - What usually goes wrong */}
                <motion.div
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0 flex flex-col"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 32,
                        mass: 0.8 
                      }}
                      className="h-full flex flex-col p-8"
                    >
                      {/* Subtle icon - supportive, not dominant */}
                      <div className="flex items-center gap-4 mb-8">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${currentFeature.accentColor}08` }}
                        >
                          <div 
                            className="w-6 h-6"
                            style={{ color: currentFeature.accentColor }}
                          >
                            {currentFeature.iconSmall}
                          </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-[var(--setly-ink)]">
                          {currentFeature.title}
                        </h3>
                      </div>

                      {/* Problem section - scannable */}
                      <div className="flex-1 space-y-4">
                        <h4 className="text-xs uppercase tracking-wider text-[var(--setly-text-secondary)]/60 font-medium mb-4">
                          What usually goes wrong
                        </h4>
                        <div className="space-y-2.5">
                          {currentFeature.problems.map((problem, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                delay: idx * 0.06,
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                              }}
                              className="flex items-start gap-2.5"
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: `${currentFeature.accentColor}40` }}
                              />
                              <p className="text-[15px] text-[var(--setly-text-secondary)] leading-relaxed">
                                {problem}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tap hint - minimal */}
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-xs text-center text-[var(--setly-text-secondary)]/50">
                          Tap to see how Setly helps
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Back - How Setly helps */}
                <motion.div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  className="absolute inset-0 flex flex-col"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full flex flex-col p-8"
                      style={{ 
                        background: `linear-gradient(135deg, ${currentFeature.accentColor}03 0%, ${currentFeature.accentColor}08 100%)` 
                      }}
                    >
                      {/* Icon stays consistent - same size, same position */}
                      <div className="flex items-center gap-4 mb-8">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${currentFeature.accentColor}12` }}
                        >
                          <div 
                            className="w-6 h-6"
                            style={{ color: currentFeature.accentColor }}
                          >
                            {currentFeature.iconSmall}
                          </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-[var(--setly-ink)]">
                          {currentFeature.title}
                        </h3>
                      </div>

                      {/* Solution section - scannable, confident */}
                      <div className="flex-1 space-y-4">
                        <h4 
                          className="text-xs uppercase tracking-wider font-medium mb-4"
                          style={{ color: `${currentFeature.accentColor}` }}
                        >
                          How Setly helps
                        </h4>
                        <div className="space-y-2.5">
                          {currentFeature.solutions.map((solution, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                delay: idx * 0.06,
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                              }}
                              className="flex items-start gap-2.5"
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: currentFeature.accentColor }}
                              />
                              <p className="text-[15px] text-[var(--setly-ink)] leading-relaxed font-medium">
                                {solution}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Why it works - calm justification */}
                        {currentFeature.whyItWorks && (
                          <div className="mt-6 pt-6 border-t border-gray-200/30">
                            <p className="text-[13px] text-[var(--setly-text-secondary)] leading-relaxed">
                              {currentFeature.whyItWorks}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Tap hint - minimal */}
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-xs text-center text-[var(--setly-text-secondary)]/50">
                          Tap to flip back
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>
          </div>

        {/* Bottom Continue - Strong anchor */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.3 }}
          className="mt-6"
        >
          <button
            onClick={onNext}
            className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] transition-all"
          >
            Continue
          </button>
        </motion.div>
      </div>
    </div>
    </div>
  );
}
