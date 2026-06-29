"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";

// Pexels free stock video: Japanese street scene (Video ID: 4711774)
// License: Free for personal and commercial use, no attribution required
// Replace with /hero-bg.mp4 if you have a local video file
const VIDEO_URL =
  "https://videos.pexels.com/video-files/4711774/4711774-hd_1920_1080_25fps.mp4";

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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      {/* Gradient fallback (shown while video loads or if video fails) */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-green-900 via-stone-800 to-stone-900" />

      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-300/40 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-widest text-green-200 backdrop-blur sm:text-sm">
        <span aria-hidden className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-300" />
        {hero.subtitle}
      </span>
      <h1 className="max-w-3xl whitespace-pre-line text-3xl font-extrabold leading-snug tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {hero.tagline}
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
        {hero.description}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-full bg-accent-orange px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-accent-orange-dark"
        >
          {hero.cta}
          <span aria-hidden="true">&rarr;</span>
        </a>
        <a
          href="#problem"
          className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-4 text-base font-medium text-white backdrop-blur transition hover:bg-white/15"
        >
          まずは知る
        </a>
      </div>

      {/* Scroll indicator */}
      <a
        href="#problem"
        aria-label="次のセクションへスクロール"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/70 transition hover:text-white md:block"
      >
        <span className="block h-9 w-5 rounded-full border-2 border-white/60 p-1">
          <span className="block h-2 w-1 mx-auto animate-bounce rounded-full bg-white/70" />
        </span>
      </a>
    </section>
  );
}
