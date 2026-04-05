"use client";

import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <p className="mb-4 text-sm font-medium tracking-widest text-orange-300 uppercase">
        {hero.subtitle}
      </p>
      <h1 className="max-w-3xl text-3xl font-extrabold leading-snug tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {hero.tagline}
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
        {hero.description}
      </p>
      <a
        href="#cta"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent-orange px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-accent-orange-dark"
      >
        {hero.cta}
        <span aria-hidden="true">&rarr;</span>
      </a>
    </section>
  );
}
