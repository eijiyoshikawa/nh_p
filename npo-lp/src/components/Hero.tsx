"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";

/**
 * Hero 背景動画（Pixabay: marbles / glass sphere / multicoloured, ID 95186）
 *   https://pixabay.com/videos/marbles-glass-sphere-multicoloured-95186/
 *
 * Pixabay ライセンス（Content License）上、動画ファイルは直リンクではなく
 * 自分のサーバーにホストする必要があるため、下記手順でセットアップする：
 *
 *   1. Pixabay ページから MP4 をダウンロード（推奨: 1080p / 720p）
 *   2. `npo-lp/public/hero-bg.mp4` に配置
 *   3. 再デプロイ（ビルド側のコード変更は不要）
 *
 * 差し替え前は Pexels のフリー動画をフォールバックとして再生する。
 */
const LOCAL_VIDEO = "/hero-bg.mp4";
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
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-20 text-center sm:px-6 md:pt-24">
      {/* Base: deep emerald fallback (shown while video loads or if it fails) */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950" />

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

      {/*
        サイト背景に使っている緑グラデーションを動画の上に重ねる。
        ・上から emerald-400 → emerald-600 → emerald-900 の流れで、
          マーブルの彩りを緑にまとめつつテキストの可読性を確保する。
        ・ブレンドモード multiply で下の動画を色づけ、さらに不透明レイヤーで暗く締める。
      */}
      <div
        className="absolute inset-0 -z-20 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(52,211,153,0.85) 0%, rgba(16,185,129,0.9) 45%, rgba(6,78,59,0.95) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,95,70,0.35) 0%, rgba(6,78,59,0.25) 50%, rgba(3,46,32,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Green glow accents */}
      <div
        className="absolute -left-32 top-1/4 -z-10 h-[32rem] w-[32rem] rounded-full bg-emerald-400/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-lime-300/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Content */}
      <span className="animate-fade-in-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-medium tracking-[0.18em] text-emerald-100 uppercase backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.2em]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
        <span className="whitespace-nowrap">{hero.subtitle}</span>
      </span>

      <h1
        className="animate-fade-in-up max-w-4xl whitespace-pre-line text-[2rem] font-extrabold leading-[1.2] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(5,46,22,0.55)] sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ animationDelay: "80ms" }}
      >
        {hero.tagline}
      </h1>

      <p
        className="animate-fade-in-up mt-6 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] sm:mt-7 sm:text-base md:text-lg"
        style={{ animationDelay: "180ms" }}
      >
        {hero.descriptionLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < hero.descriptionLines.length - 1 && (
              <>
                <br className="hidden md:inline" />
                <span className="md:hidden"> </span>
              </>
            )}
          </span>
        ))}
      </p>

      <div
        className="animate-fade-in-up mt-9 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
        style={{ animationDelay: "260ms" }}
      >
        <a
          href="#cta"
          className="hover-sheen press-scale group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-7 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(16,185,129,0.7)] ring-1 ring-white/30 transition-all hover:scale-[1.03] hover:shadow-[0_14px_40px_-10px_rgba(16,185,129,0.85)] sm:px-9 sm:py-4"
        >
          <span className="relative z-10">{hero.cta}</span>
          <span
            className="relative z-10 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </a>
        <a
          href="#business"
          className="press-scale inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          事業を見る
        </a>
      </div>

      {/* Scroll hint */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/70 sm:text-xs"
        aria-hidden="true"
      >
        <span className="block text-center">SCROLL</span>
        <span className="mx-auto mt-2 block h-10 w-px animate-pulse bg-white/60" />
      </div>
    </section>
  );
}
