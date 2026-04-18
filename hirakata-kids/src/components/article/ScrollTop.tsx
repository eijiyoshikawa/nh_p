"use client";

import { useEffect, useState } from "react";

export function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      type="button"
      aria-label="ページ上部へ戻る"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-orange-200 bg-white/95 text-stone-700 shadow-md backdrop-blur transition hover:text-[#F97316] focus:outline-none focus:ring-2 focus:ring-orange-300"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden>
        <path
          d="M4 12l6-6 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </button>
  );
}
