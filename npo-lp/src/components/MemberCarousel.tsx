"use client";

import { useEffect, useRef } from "react";
import { members } from "@/lib/content";

export default function MemberCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Auto-scroll loop (slides one card every 3s; pauses on hover/touch)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let paused = false;

    const interval = setInterval(() => {
      if (paused) return;

      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const cardWidth = first.offsetWidth + 24; // gap-6
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

  // 3D effect: rotate each card by its distance from the viewport center
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const viewport = el.getBoundingClientRect();
      const centerX = viewport.left + viewport.width / 2;
      const cards = el.querySelectorAll<HTMLElement>(".carousel-3d-item");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const deltaRatio = Math.max(-1.5, Math.min(1.5, (cardCenter - centerX) / (viewport.width / 2)));
        // Rotate around Y so near-center cards face the viewer, side cards tilt away
        const rotateY = -deltaRatio * 28; // degrees
        const translateZ = Math.max(-120, -Math.abs(deltaRatio) * 120); // push side cards backwards
        const scale = 1 - Math.min(0.18, Math.abs(deltaRatio) * 0.18);
        const opacity = 1 - Math.min(0.45, Math.abs(deltaRatio) * 0.45);

        card.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.zIndex = `${100 - Math.round(Math.abs(deltaRatio) * 50)}`;
      });
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Duplicate members for seamless looping
  const displayMembers = [...members, ...members];

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28">
      {/* Soft green glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium tracking-[0.25em] text-accent-green-dark uppercase">
            Members
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            メンバー紹介
          </h2>
          <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
            ひらかたの未来を、それぞれの得意で支える仲間たち。
          </p>
        </div>

        <div className="carousel-3d-viewport">
          <div
            ref={scrollRef}
            className="carousel-3d-track scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth px-[15%] pb-12 pt-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {displayMembers.map((member, i) => (
              <div
                key={`${member.romaji}-${i}`}
                className="carousel-3d-item flex w-72 flex-shrink-0 flex-col items-center rounded-3xl border border-emerald-100 bg-white p-6 shadow-[0_20px_60px_-24px_rgba(16,185,129,0.35)] sm:w-80"
                style={{ scrollSnapAlign: "center" }}
              >
                {/* Photo area (larger) */}
                <div className="relative h-48 w-48 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 via-emerald-50 to-white ring-1 ring-emerald-100 sm:h-56 sm:w-56">
                  {/* TODO: member.photoUrl を content.ts に追加して実写差し替え */}
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-6xl font-extrabold text-transparent sm:text-7xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                </div>

                <p className="mt-5 text-[11px] font-medium tracking-[0.2em] text-accent-green-dark uppercase">
                  {member.title}
                </p>
                <p className="mt-1 text-lg font-bold text-text-primary sm:text-xl">
                  {member.name}
                </p>
                <p className="mt-0.5 text-xs tracking-wide text-text-secondary">
                  {member.romaji}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-text-secondary">
          ← スワイプ / ドラッグで他のメンバーを見る →
        </p>
      </div>
    </section>
  );
}
