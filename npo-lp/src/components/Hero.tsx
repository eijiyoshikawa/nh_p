"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";

// TODO: 子どもたちが遊ぶ動画に差し替え。
//   - 推奨: public/ に hero-children.mp4 (H.264, 1080p, 10〜20秒ループ) を配置。
//   - 暫定: Pexels の無料ストック動画（商用可・クレジット不要）。
const LOCAL_VIDEO = "/hero-children.mp4";
const FALLBACK_VIDEO =
  "https://videos.pexels.com/video-files/4881267/4881267-hd_1920_1080_30fps.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      {/* Base: soft green → white gradient (fallback and brand tone) */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700" />

      {/* Video background with subtle Ken Burns motion */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`animate-kenburns absolute inset-0 -z-30 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={LOCAL_VIDEO} type="video/mp4" />
        <source src={FALLBACK_VIDEO} type="video/mp4" />
      </video>

      {/* Readability veil: dark→green gradient that lifts text without killing warmth */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/55 via-emerald-900/40 to-emerald-950/70" />

      {/* Green glow accents for impact */}
      <div
        className="absolute -left-32 top-1/4 -z-10 h-[32rem] w-[32rem] rounded-full bg-emerald-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-lime-300/15 blur-3xl"
        aria-hidden="true"
      />

      {/* Content */}
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-emerald-100 uppercase backdrop-blur-md sm:text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
        {hero.subtitle}
      </span>

      <h1 className="max-w-4xl whitespace-pre-line text-3xl font-extrabold leading-[1.2] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(5,46,22,0.55)] sm:text-5xl md:text-6xl lg:text-7xl">
        {hero.tagline}
      </h1>

      <p className="mt-7 max-w-xl text-base leading-relaxed text-white/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] sm:text-lg">
        {hero.description}
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="#cta"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-8 py-4 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(16,185,129,0.7)] ring-1 ring-white/30 transition-all hover:scale-[1.03] hover:shadow-[0_14px_40px_-10px_rgba(16,185,129,0.85)]"
        >
          {hero.cta}
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            &rarr;
          </span>
        </a>
        <a
          href="#business"
          className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          事業を見る
        </a>
      </div>

      {/* Scroll hint */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/70"
        aria-hidden="true"
      >
        <span className="block text-center">SCROLL</span>
        <span className="mx-auto mt-2 block h-10 w-px animate-pulse bg-white/60" />
      </div>
    </section>
  );
}
