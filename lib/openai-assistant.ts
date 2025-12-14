export type UserContext = {
  entryChoice?: "landed" | "housing" | "essentials" | "community";
  currentStep?: "welcome" | "choose" | "explore";
  situation?: "landed" | "room" | "rides" | "essentials" | "people";
  selectedFeatures?: string[];
  timeSpent?: number;
  completedSteps?: string[];
};

export type AssistantMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: number;
};

const SYSTEM_PROMPT = `You are the Setly Assistant — a calm, intelligent guide for someone settling into a new place.

Core behavior:
- Respond ONLY to user actions (card selections, step completions)
- Never repeat yourself — every message must be unique
- Max 2 sentences per response
- Acknowledge emotions naturally ("That makes sense given...")
- Ask ONE thoughtful follow-up question when appropriate

Your knowledge:
Setly provides: verified housing, roommate matching, transport/rides, essentials marketplace, local community connections.

Your goal:
Help them feel understood and guided — not sold to. Be human, brief, and useful.

CRITICAL: Never say the same thing twice. Check previous messages before responding.`;

export async function getAssistantResponse(
  userContext: UserContext,
  previousMessages: AssistantMessage[] = []
): Promise<string> {
  try {
    const contextPrompt = buildContextPrompt(userContext);
    
    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...previousMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user" as const, content: contextPrompt }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I'm here to help — what do you need?";
  } catch (error) {
    console.error("OpenAI Assistant error:", error);
    // Fallback to static response
    return getFallbackResponse(userContext);
  }
}

function buildContextPrompt(context: UserContext): string {
  const parts: string[] = [];
  
  if (context.entryChoice) {
    const choiceMap = {
      landed: "just landed and doesn't know where to start",
      housing: "needs a place to stay urgently",
      essentials: "needs transport and essentials",
      community: "doesn't want to feel alone"
    };
    parts.push(`User chose: "${choiceMap[context.entryChoice]}"`);
  }
  
  if (context.currentStep) {
    parts.push(`Current step: ${context.currentStep}`);
  }
  
  if (context.situation) {
    parts.push(`Situation selected: ${context.situation}`);
  }
  
  if (context.selectedFeatures && context.selectedFeatures.length > 0) {
    parts.push(`Explored features: ${context.selectedFeatures.join(", ")}`);
  }
  
  if (context.completedSteps && context.completedSteps.length > 0) {
    parts.push(`Completed steps: ${context.completedSteps.join(", ")}`);
  }
  
  return parts.join("\n") + "\n\nProvide a brief, empathetic response acknowledging their choice and what happens next.";
}

function getFallbackResponse(context: UserContext): string {
  if (context.entryChoice === "landed") {
    return "You just landed. Most people feel overwhelmed at this point — you're not alone. Let me help you figure out what comes next.";
  }
  
  if (context.entryChoice === "housing") {
    return "Got it — housing feels urgent. This is usually the hardest part. Let me show you how we simplify it.";
  }
  
  if (context.situation === "room") {
    return "Looking for verified housing. Here's what changes when you have the right help.";
  }
  
  if (context.completedSteps?.includes("explore")) {
    return "You've walked through the journey. Now you know what Setly can do — you don't have to figure this out alone.";
  }
  
  return "I'm here to help you settle in. What matters most to you right now?";
}
