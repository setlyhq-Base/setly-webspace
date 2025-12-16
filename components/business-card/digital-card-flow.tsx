"use client";

import { useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, AnimatePresence } from "framer-motion";
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
  const [selectedMoment, setSelectedMoment] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentIndex = mainScreens.indexOf(currentScreen);
  const x = useMotionValue(0);

  const goToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const nextScreen = () => {
    if (currentIndex < mainScreens.length - 1) {
      setCurrentScreen(mainScreens[currentIndex + 1]);
    }
  };

  const prevScreen = () => {
    if (currentIndex > 0) {
      setCurrentScreen(mainScreens[currentIndex - 1]);
    }
  };

  const goToMoment = () => {
    goToScreen("moment");
  };

  const goToWaitlist = () => {
    setCurrentScreen("waitlist");
  };

  const restartFlow = () => {
    setCurrentScreen("identity");
    setSelectedMoment(null);
  };

  // Handle swipe with instant response - Apple-calibrated thresholds
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Swipe right (go back)
    if (offset > swipeThreshold || velocity > velocityThreshold) {
      if (currentScreen === "waitlist") {
        goToScreen("story");
      } else if (currentIndex > 0) {
        prevScreen();
      }
    }
    // Swipe left (go forward)
    else if (offset < -swipeThreshold || velocity < -velocityThreshold) {
      if (currentScreen !== "waitlist" && currentIndex < mainScreens.length - 1) {
        nextScreen();
      }
    }
  };

  // Calculate transform based on current screen
  const getScreenOffset = (screenIndex: number) => {
    const diff = screenIndex - currentIndex;
    return `${diff * 100}%`;
  };

  // Apple-calibrated spring physics - matches iOS native screen transitions
  const screenTransition = {
    type: "spring" as const,
    stiffness: 380,
    damping: 30,
    mass: 0.8,
    velocity: 0,
  };

  // Micro blur effect during transitions (barely perceptible forward momentum cue)
  const getMotionBlur = (isActive: boolean) => {
    return isActive ? "blur(0px)" : "blur(1.5px)";
  };

  return (
    <div className="fixed inset-0 bg-white overflow-hidden select-none">
      {/* Progress Indicator */}
      {currentScreen !== "waitlist" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
          <div className="flex gap-1 p-4 max-w-md mx-auto">
            {mainScreens.map((screen, idx) => (
              <button
                key={screen}
                onClick={() => {
                  const targetScreen = mainScreens[idx];
                  if (targetScreen) setCurrentScreen(targetScreen);
                }}
                className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden cursor-pointer"
              >
                <motion.div
                  className="h-full bg-[var(--setly-primary-blue)]"
                  initial={false}
                  animate={{
                    width: idx <= currentIndex ? "100%" : "0%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Continuous Screen Container - All screens always rendered */}
      <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className={currentScreen === "waitlist" ? "absolute inset-0" : "absolute inset-0 pt-16"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
        {/* Identity Screen */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ 
            x: currentScreen === "identity" ? 0 : currentScreen === "waitlist" ? "-100%" : getScreenOffset(0),
            opacity: currentScreen === "identity" ? 1 : 0,
            filter: getMotionBlur(currentScreen === "identity"),
            pointerEvents: currentScreen === "identity" ? "auto" : "none"
          }}
          transition={screenTransition}
        >
          <IdentityScreen onNext={nextScreen} />
        </motion.div>

        {/* Moment Screen */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ 
            x: currentScreen === "moment" ? 0 : currentScreen === "waitlist" ? "-100%" : getScreenOffset(1),
            opacity: currentScreen === "moment" ? 1 : 0,
            filter: getMotionBlur(currentScreen === "moment"),
            pointerEvents: currentScreen === "moment" ? "auto" : "none"
          }}
          transition={screenTransition}
        >
          <MomentScreen
            onNext={nextScreen}
            onBack={prevScreen}
            onSelectMoment={setSelectedMoment}
          />
        </motion.div>

        {/* Experience Screen */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ 
            x: currentScreen === "experience" ? 0 : currentScreen === "waitlist" ? "-100%" : getScreenOffset(2),
            opacity: currentScreen === "experience" ? 1 : 0,
            filter: getMotionBlur(currentScreen === "experience"),
            pointerEvents: currentScreen === "experience" ? "auto" : "none"
          }}
          transition={screenTransition}
        >
          <ExperienceScreen
            onNext={nextScreen}
            onBack={prevScreen}
            selectedMoment={selectedMoment}
          />
        </motion.div>

        {/* Difference Screen */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ 
            x: currentScreen === "difference" ? 0 : currentScreen === "waitlist" ? "-100%" : getScreenOffset(3),
            opacity: currentScreen === "difference" ? 1 : 0,
            filter: getMotionBlur(currentScreen === "difference"),
            pointerEvents: currentScreen === "difference" ? "auto" : "none"
          }}
          transition={screenTransition}
        >
          <DifferenceScreen onNext={nextScreen} onBack={prevScreen} />
        </motion.div>

        {/* Founder Screen */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ 
            x: currentScreen === "founder" ? 0 : currentScreen === "waitlist" ? "-100%" : getScreenOffset(4),
            opacity: currentScreen === "founder" ? 1 : 0,
            filter: getMotionBlur(currentScreen === "founder"),
            pointerEvents: currentScreen === "founder" ? "auto" : "none"
          }}
          transition={screenTransition}
        >
          <FounderScreen onNext={nextScreen} onBack={prevScreen} />
        </motion.div>

        {/* Story Screen */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ 
            x: currentScreen === "story" ? 0 : currentScreen === "waitlist" ? "-100%" : getScreenOffset(5),
            opacity: currentScreen === "story" ? 1 : 0,
            filter: getMotionBlur(currentScreen === "story"),
            pointerEvents: currentScreen === "story" ? "auto" : "none"
          }}
          transition={screenTransition}
        >
          <StoryScreen
            onNext={goToWaitlist}
            onBack={prevScreen}
            onRestart={restartFlow}
          />
        </motion.div>

        {/* Waitlist Screen */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ 
            x: currentScreen === "waitlist" ? 0 : "100%",
            opacity: currentScreen === "waitlist" ? 1 : 0,
            pointerEvents: currentScreen === "waitlist" ? "auto" : "none"
          }}
          transition={screenTransition}
        >
          <WaitlistScreen
            onBack={() => goToScreen("story")}
            onExploreApp={goToMoment}
          />
          </motion.div>
        </motion.div>
    </div>
  );
}