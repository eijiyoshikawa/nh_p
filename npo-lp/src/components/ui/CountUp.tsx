"use client";

import { useEffect, useRef, useState } from "react";

// Lightweight intersection-triggered number animation.
// Pass `value` as a string so non-numeric suffixes ("約", "+") render
// untouched; only the digits animate.
export function CountUp({
  value,
  duration = 1400,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(value);
      return;
    }

    // Find the numeric token inside the value (handles "約40", "+10", "1,000")
    const match = /(\D*)([\d,]+)(\D*)/.exec(value);
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    if (!Number.isFinite(target) || target === 0) {
      setDisplay(value);
      return;
    }
    const useCommas = digits.includes(",");

    let started = false;
    let raf = 0;
    const start = (ts: number) => {
      const tick = (now: number) => {
        const t = Math.min(1, (now - ts) / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(target * eased);
        const fmt = useCommas
          ? current.toLocaleString("en-US")
          : String(current);
        setDisplay(`${prefix}${fmt}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            requestAnimationFrame((ts) => start(ts));
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    setDisplay(`${prefix}0${suffix}`);
    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
