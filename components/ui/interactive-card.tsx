"use client";

import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useMemo,
  useRef,
} from "react";

type InteractiveCardProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
};

export function InteractiveCard({ children, className, tilt }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const baseStyle = useMemo(() => {
    return {
      "--setly-mx": "50%",
      "--setly-my": "50%",
    } as CSSProperties;
  }, []);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--setly-mx", `${x.toFixed(2)}%`);
      el.style.setProperty("--setly-my", `${y.toFixed(2)}%`);
    });
  };

  const onPointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--setly-mx", "50%");
    el.style.setProperty("--setly-my", "50%");
  };

  return (
    <div
      ref={cardRef}
      className={
        "setly-card" +
        (tilt ? " setly-tilt" : "") +
        (className ? ` ${className}` : "")
      }
      style={baseStyle}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </div>
  );
}
