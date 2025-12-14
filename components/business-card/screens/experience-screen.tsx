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
    icon: "🏠",
    color: "var(--setly-rooms-accent)",
    bgColor: "var(--setly-rooms-bg)",
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
    icon: "🚗",
    color: "var(--setly-rides-accent)",
    bgColor: "var(--setly-rides-bg)",
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
    icon: "🛍️",
    color: "var(--setly-market-accent)",
    bgColor: "var(--setly-market-bg)",
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
    icon: "👥",
    color: "var(--setly-primary-blue)",
    bgColor: "var(--setly-primary-blue-soft)",
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
              className="absolute inset-0 rounded-3xl shadow-xl backface-hidden"
              style={{ 
                backgroundColor: currentFeature.bgColor,
                backfaceVisibility: "hidden",
              }}
            >
              <div className="h-full flex flex-col items-center justify-center p-8">
                <div className="text-7xl mb-6">{currentFeature.icon}</div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: currentFeature.color }}
                >
                  {currentFeature.title}
                </h3>
                <p className="text-lg text-[var(--setly-text-secondary)] text-center mb-6">
                  {currentFeature.description}
                </p>
                <div className="text-xs text-[var(--setly-muted)] flex items-center gap-1">
                  <span>Tap to flip</span>
                  <span>↻</span>
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

        {/* Feature Tabs - reordered by priority */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {orderedFeatures.map((feature, index) => (
            <motion.button
              key={feature.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
              onClick={() => setActiveFeature(feature.id)}
              className={`
                p-3 rounded-xl transition-all relative
                ${activeFeature === feature.id
                  ? 'bg-[var(--setly-primary-blue)] shadow-lg scale-105'
                  : 'bg-[var(--setly-surface-2)] hover:bg-gray-100'
                }
              `}
            >
              {/* Priority indicator for first item */}
              {index === 0 && activeFeature !== feature.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--setly-primary-blue)] border-2 border-white" />
              )}
              <div className="text-2xl mb-1">{feature.icon}</div>
              <div
                className={`text-xs font-medium ${
                  activeFeature === feature.id ? 'text-white' : 'text-[var(--setly-text-secondary)]'
                }`}
              >
                {feature.title}
              </div>
            </motion.button>
          ))}
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
