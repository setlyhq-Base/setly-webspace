"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { getAssistantResponse, type UserContext } from "@/lib/openai-assistant";

type ConversationalAssistantProps = {
  userContext: UserContext;
};

export function ConversationalAssistant({ userContext }: ConversationalAssistantProps) {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const previousContextRef = useRef<string>("");
  const hasFetchedInitial = useRef(false);

  useEffect(() => {
    const contextKey = JSON.stringify(userContext);
    
    // Skip if no meaningful context yet
    if (!userContext.entryChoice && !userContext.situation && !userContext.selectedFeatures?.length) {
      return;
    }

    // Skip if context hasn't changed
    if (contextKey === previousContextRef.current) return;
    previousContextRef.current = contextKey;

    // Skip initial render to avoid double-fetch
    if (!hasFetchedInitial.current) {
      hasFetchedInitial.current = true;
      return;
    }

    async function fetchResponse() {
      setIsThinking(true);
      
      try {
        const response = await getAssistantResponse(userContext, 
          messageHistory.map((content, i) => ({
            id: `msg-${i}`,
            role: "assistant" as const,
            content,
            timestamp: Date.now()
          }))
        );
        
        setCurrentMessage(response);
        setMessageHistory(prev => [...prev, response]);
      } catch (error) {
        console.error("Failed to get assistant response:", error);
      } finally {
        setIsThinking(false);
      }
    }

    fetchResponse();
  }, [userContext, messageHistory]);

  // Build "What I understand" summary from context
  const insights: string[] = [];
  
  if (userContext.entryChoice) {
    const choiceLabels = {
      landed: "You just arrived",
      housing: "Housing is urgent",
      essentials: "You need transport & essentials",
      community: "You want to connect with people"
    };
    insights.push(choiceLabels[userContext.entryChoice]);
  }
  
  if (userContext.situation && userContext.situation !== userContext.entryChoice) {
    const situationLabels = {
      landed: "Arrival support",
      room: "Verified housing",
      rides: "Transport options",
      essentials: "Local essentials",
      people: "Community connections"
    };
    insights.push(situationLabels[userContext.situation]);
  }
  
  if (userContext.selectedFeatures && userContext.selectedFeatures.length > 0) {
    insights.push(`Explored ${userContext.selectedFeatures.length} feature${userContext.selectedFeatures.length > 1 ? 's' : ''}`);
  }

  return (
    <div className="relative">
      <InteractiveCard className="relative bg-surface border-border/50">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
              Setly Assistant
            </h3>
            {isThinking && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-brand-blue"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* What I Understand Section */}
          {insights.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted">What I understand:</p>
              <div className="flex flex-wrap gap-2">
                {insights.map((insight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue/10 text-xs font-medium text-brand-blue"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {insight}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Current Message */}
          <AnimatePresence mode="wait">
            {currentMessage && (
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-2xl bg-surface-2 border border-border"
              >
                <p className="text-sm leading-relaxed text-ink">
                  {currentMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Placeholder when no message yet */}
          {!currentMessage && !isThinking && insights.length === 0 && (
            <div className="p-4 rounded-2xl bg-surface-2/50 border border-border/30">
              <p className="text-sm leading-relaxed text-muted">
                Make a selection to get started
              </p>
            </div>
          )}
        </div>
      </InteractiveCard>
    </div>
  );
}
