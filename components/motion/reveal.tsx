"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  once?: boolean;
  yPx?: number;
};

export function Reveal({
  children,
  className,
  delayMs = 0,
  once = true,
  yPx = 12,
}: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const style = useMemo(() => {
    return {
      "--setly-delay": `${delayMs}ms`,
      "--setly-reveal-y": `${yPx}px`,
    } as CSSProperties;
  }, [delayMs, yPx]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setRevealed(true);
          if (once) observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.15,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, revealed]);

  return (
    <div
      ref={(node) => {
        elementRef.current = node;
      }}
      className={"setly-reveal" + (className ? ` ${className}` : "")}
      data-revealed={revealed ? "true" : "false"}
      style={style}
    >
      {children}
    </div>
  );
}
