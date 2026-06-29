"use client";

import { useEffect, useRef } from "react";
import { members } from "@/lib/content";

export default function MemberCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let paused = false;

    const interval = setInterval(() => {
      if (paused) return;

      const cardWidth = el.firstElementChild
        ? (el.firstElementChild as HTMLElement).offsetWidth + 16
        : 200;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3000);

    const handleEnter = () => (paused = true);
    const handleLeave = () => (paused = false);

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("touchstart", handleEnter, { passive: true });
    el.addEventListener("touchend", handleLeave);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("touchstart", handleEnter);
      el.removeEventListener("touchend", handleLeave);
    };
  }, []);

  // Duplicate members for seamless looping
  const displayMembers = [...members, ...members];

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            メンバー紹介
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent-orange" />
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayMembers.map((member, i) => (
            <div
              key={`${member.romaji}-${i}`}
              className="flex w-56 flex-shrink-0 flex-col items-center rounded-2xl bg-white p-6 shadow-sm transition-transform hover:scale-105"
            >
              {/* Avatar placeholder */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200 text-2xl font-bold text-accent-orange">
                {member.name.charAt(0)}
              </div>

              <p className="mt-4 text-xs font-medium tracking-wider text-accent-orange uppercase">
                {member.title}
              </p>
              <p className="mt-1 text-base font-bold text-text-primary">
                {member.name}
              </p>
              <p className="mt-0.5 text-xs tracking-wide text-text-secondary">
                {member.romaji}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-text-secondary">
          ← スワイプで他のメンバーを見る →
        </p>
      </div>
    </section>
  );
}
