import { type ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";

type StaggerProps = {
  children: ReactNode[];
  className?: string;
  baseDelayMs?: number;
  stepMs?: number;
  yPx?: number;
};

export function Stagger({
  children,
  className,
  baseDelayMs = 0,
  stepMs = 80,
  yPx = 12,
}: StaggerProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal key={index} delayMs={baseDelayMs + index * stepMs} yPx={yPx}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
