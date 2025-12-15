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
    <div className="h-full flex flex-col px-6 py-8 bg-white">
      <div className="max-w-md w-full mx-auto flex flex-col h-full">
        {/* Context badge */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--setly-primary-blue-soft)] text-[var(--setly-primary-blue)] text-sm font-medium">
            <span>✓</span>
            <span>{context.label}</span>
          </div>
        </motion.div>

        {/* Header - contextualized */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-[var(--setly-ink)] mb-2 leading-tight">
            {context.headline}
          </h2>
          <p className="text-[var(--setly-text-secondary)] text-sm">
            {isFlipped ? "Tap card to see overview" : "Tap card to see how Setly solves this"}
          </p>
        </motion.div>

        {/* Feature Preview Card - Flippable */}
        <div className="flex-1 mb-6 perspective-1000">
          <motion.button
            onClick={handleCardTap}
            className="relative w-full h-full preserve-3d cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {/* Front of card */}
            <div
              className="absolute inset-0 rounded-3xl shadow-xl backface-hidden bg-white"
              style={{ 
                backfaceVisibility: "hidden",
              }}
            >
              <div className="h-full flex flex-col p-6">
                {/* Header section with icon */}
                <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-all"
                    style={{ backgroundColor: currentFeature.lightAccent }}
                  >
                    <div style={{ color: currentFeature.accentColor }}>
                      {currentFeature.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-[var(--setly-ink)] mb-0.5">
                      {currentFeature.title}
                    </h3>
                    <p className="text-sm text-[var(--setly-text-secondary)]">
                      {currentFeature.description}
                    </p>
                  </div>
                </div>
                
                {/* Stats section - structured grid */}
                <motion.div 
                  key={currentFeature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <div className="grid grid-cols-3 gap-3">
                    {currentFeature.stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-3 rounded-xl" style={{ backgroundColor: currentFeature.lightAccent }}>
                        <div className="text-xl font-bold mb-1" style={{ color: currentFeature.accentColor }}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-[var(--setly-text-secondary)] font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Features preview list */}
                <div className="space-y-2 mb-6">
                  {currentFeature.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentFeature.accentColor }} />
                      <span className="text-[var(--setly-text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tap hint */}
                <div className="mt-auto pt-4 border-t border-gray-100 text-center">
                  <div className="text-xs text-[var(--setly-muted)] flex items-center justify-center gap-1.5">
                    <span className="text-base" style={{ color: currentFeature.accentColor }}>↻</span>
                    <span>Tap to see problems vs solutions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div
              className="absolute inset-0 rounded-3xl shadow-xl backface-hidden"
              style={{ 
                backgroundColor: currentFeature.bgColor,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="h-full flex flex-col p-6 overflow-y-auto">
                {/* Problems section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">❌</span>
                    <h4 className="text-sm font-bold text-[var(--setly-ink)] uppercase tracking-wide">
                      What usually goes wrong
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {currentFeature.problems.map((problem, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-[var(--setly-text-secondary)]"
                      >
                        <span className="text-red-400 mt-0.5">•</span>
                        <span>{problem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solutions section */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">✓</span>
                    <h4 className="text-sm font-bold uppercase tracking-wide"
                      style={{ color: currentFeature.color }}
                    >
                      How Setly fixes this
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {currentFeature.solutions.map((solution, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-[var(--setly-ink)]"
                      >
                        <span style={{ color: currentFeature.color }} className="mt-0.5">✓</span>
                        <span>{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flip hint */}
                <div className="text-xs text-[var(--setly-muted)] text-center pt-4 flex items-center justify-center gap-1">
                  <span>↻</span>
                  <span>Tap to flip back</span>
                </div>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Minimal Category Dots - Subtle navigation */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {orderedFeatures.map((feature, index) => {
            const isActive = activeFeature === feature.id;
            const isPriority = index === 0;
            
            return (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                onClick={() => setActiveFeature(feature.id)}
                className="relative group"
                title={feature.title}
              >
                {/* Priority indicator */}
                {isPriority && !isActive && (
                  <div className="absolute -top-1 -right-1 w-1 h-1 rounded-full bg-[var(--setly-primary-blue)]" />
                )}
                
                {/* Icon container */}
                <div 
                  className={`
                    flex items-center justify-center transition-all duration-300
                    ${isActive 
                      ? 'w-9 h-9 rounded-xl shadow-sm' 
                      : 'w-7 h-7 rounded-lg opacity-40 hover:opacity-70'
                    }
                  `}
                  style={{
                    backgroundColor: isActive ? feature.lightAccent : 'transparent'
                  }}
                >
                  <div 
                    className="transition-colors duration-300"
                    style={{ 
                      color: isActive ? feature.accentColor : 'var(--setly-text-secondary)'
                    }}
                  >
                    {feature.iconSmall}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom CTA */}
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
            Why it's different
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
