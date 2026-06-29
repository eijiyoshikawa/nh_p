"use client";

import { useEffect, useState } from "react";

// Thin horizontal progress bar pinned to the top of the viewport that
// tracks how far the reader has scrolled through the page.
export function ScrollProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? (scrolled / total) * 100 : 0;
      setPercent(Math.min(100, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-accent-orange to-accent-orange-dark transition-[width] duration-150"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
