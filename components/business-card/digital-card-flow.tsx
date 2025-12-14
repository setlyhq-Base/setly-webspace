"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IdentityScreen } from "./screens/identity-screen";
import { MomentScreen } from "./screens/moment-screen";
import { ExperienceScreen } from "./screens/experience-screen";
import { DifferenceScreen } from "./screens/difference-screen";
import { FounderScreen } from "./screens/founder-screen";
import { StoryScreen } from "./screens/story-screen";
import { WaitlistScreen } from "./screens/waitlist-screen";

type Screen = "identity" | "moment" | "experience" | "difference" | "founder" | "story" | "waitlist";

const mainScreens: Screen[] = ["identity", "moment", "experience", "difference", "founder", "story"];

export function DigitalCardFlow() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("identity");
  const [direction, setDirection] = useState(1);
  const [selectedMoment, setSelectedMoment] = useState<string | null>(null);

  const currentIndex = mainScreens.indexOf(currentScreen);

  const goToScreen = (screen: Screen) => {
    const newIndex = mainScreens.indexOf(screen);
    if (newIndex === -1) {
      // Special screens (like waitlist) don't have an index
      setDirection(1);
      setCurrentScreen(screen);
    } else {
      setDirection(newIndex > currentIndex ? 1 : -1);
      setCurrentScreen(screen);
    }
  };

  const nextScreen = () => {
    if (currentIndex < mainScreens.length - 1) {
      setDirection(1);
      setCurrentScreen(mainScreens[currentIndex + 1]);
    }
  };

  const prevScreen = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentScreen(mainScreens[currentIndex - 1]);
    }
  };

  const goToMoment = () => {
    goToScreen("moment");
  };

  const goToWaitlist = () => {
    setDirection(1);
    setCurrentScreen("waitlist");
  };

  // Screen variants for smooth transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      {/* Progress Indicator - Only show for main flow */}
      {currentScreen !== "waitlist" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
          <div className="flex gap-1 p-4 max-w-md mx-auto">
            {mainScreens.map((screen, idx) => (
              <div
                key={screen}
                className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden"
              >
                <motion.div
                  className="h-full bg-[var(--setly-primary-blue)]"
                  initial={{ width: "0%" }}
                  animate={{
                    width: idx < currentIndex ? "100%" : idx === currentIndex ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screen Container */}
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentScreen}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={currentScreen === "waitlist" ? "absolute inset-0" : "absolute inset-0 pt-16"}
          >
            {currentScreen === "identity" && (
              <IdentityScreen onNext={nextScreen} />
            )}
            {currentScreen === "moment" && (
              <MomentScreen
                onNext={nextScreen}
                onBack={prevScreen}
                onSelectMoment={setSelectedMoment}
              />
            )}
            {currentScreen === "experience" && (
              <ExperienceScreen
                onNext={nextScreen}
                onBack={prevScreen}
                selectedMoment={selectedMoment}
              />
            )}
            {currentScreen === "difference" && (
              <DifferenceScreen onNext={nextScreen} onBack={prevScreen} />
            )}
            {currentScreen === "founder" && (
              <FounderScreen onNext={nextScreen} onBack={prevScreen} />
            )}
            {currentScreen === "story" && (
              <StoryScreen
                onNext={goToWaitlist}
                onBack={prevScreen}
                onExploreApp={goToMoment}
              />
            )}
            {currentScreen === "waitlist" && (
              <WaitlistScreen
                onBack={() => goToScreen("story")}
                onExploreApp={goToMoment}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
