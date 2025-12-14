"use client";

import { useEffect, useRef } from "react";

export function useScrollParallax<T extends HTMLElement = HTMLElement>(options?: {
  strength?: number;
}) {
  const strength = options?.strength ?? 0.12;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number | null = null;

    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight || 1;
        const progress = (rect.top / viewportH) * -1;
        const y = Math.max(-18, Math.min(18, progress * 24 * strength));
        el.style.setProperty("--setly-parallax-y", `${y.toFixed(2)}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return ref;
}
