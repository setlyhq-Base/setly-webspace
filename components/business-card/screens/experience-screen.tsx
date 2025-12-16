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
    <div className="h-full flex flex-col px-6 py-8 bg-white">
      <div className="max-w-md w-full mx-auto flex flex-col h-full">
        {/* Context badge - subtle */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="mb-6"
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
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-[var(--setly-ink)] mb-3 leading-tight">
            {context.headline}
          </h2>
        </motion.div>

        {/* Feature Card - Calm, focused */}
        <div className="flex-1 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={handleCardTap}
              className="relative h-full rounded-3xl shadow-lg bg-white cursor-pointer overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  /* Front - What it does */
                  <motion.div
                    key="front"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col p-8"
                  >
                    {/* Icon - refined, calm */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.1 }}
                      className="mb-8"
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${currentFeature.accentColor}10` }}
                      >
                        <div style={{ color: currentFeature.accentColor }}>
                          {currentFeature.icon}
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Clear headline */}
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-[var(--setly-ink)] mb-4 leading-tight">
                        {currentFeature.title}
                      </h3>
                      <p className="text-lg text-[var(--setly-text-secondary)] leading-relaxed mb-8">
                        {currentFeature.description}
                      </p>

                      {/* Key point - single strong supporting line */}
                      <div className="p-4 rounded-2xl bg-gray-50">
                        <p className="text-sm text-[var(--setly-ink)] leading-relaxed">
                          {currentFeature.preview}
                        </p>
                      </div>
                    </div>

                    {/* Subtle tap hint */}
                    <div className="mt-6 text-center">
                      <p className="text-xs text-[var(--setly-text-secondary)]/60">
                        Tap to see how Setly solves this
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  /* Back - How Setly helps */
                  <motion.div
                    key="back"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col p-8"
                    style={{ backgroundColor: `${currentFeature.accentColor}05` }}
                  >
                    {/* Icon stays consistent */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.1 }}
                      className="mb-8"
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${currentFeature.accentColor}10` }}
                      >
                        <div style={{ color: currentFeature.accentColor }}>
                          {currentFeature.icon}
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex-1 space-y-6">
                      {/* The problem */}
                      <div>
                        <h4 className="text-xs uppercase tracking-wide text-[var(--setly-text-secondary)]/60 mb-3 font-medium">
                          What usually goes wrong
                        </h4>
                        <p className="text-base text-[var(--setly-text-secondary)] leading-relaxed">
                          {currentFeature.problems.join('. ')}
                        </p>
                      </div>

                      {/* The solution */}
                      <div>
                        <h4 
                          className="text-xs uppercase tracking-wide mb-3 font-medium"
                          style={{ color: currentFeature.accentColor }}
                        >
                          How Setly helps
                        </h4>
                        <p className="text-base text-[var(--setly-ink)] leading-relaxed font-medium">
                          {currentFeature.solutions.join('. ')}
                        </p>
                      </div>

                      {/* Why it works - inline justification */}
                      {currentFeature.whyItWorks && (
                        <div className="pt-4 border-t border-gray-200/50">
                          <p className="text-sm text-[var(--setly-text-secondary)] leading-relaxed italic">
                            {currentFeature.whyItWorks}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Subtle tap hint */}
                    <div className="mt-6 text-center">
                      <p className="text-xs text-[var(--setly-text-secondary)]/60">
                        Tap to flip back
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Category Navigation - refined icons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.3 }}
          className="space-y-3"
        >
          <button
            onClick={onNext}
            className="w-full bg-[var(--setly-primary-blue)] text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] transition-all"
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
