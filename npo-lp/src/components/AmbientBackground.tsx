"use client";

/**
 * ページ全体の後ろに敷くスタイリッシュなアンビエント背景。
 *
 * 構成：
 *   1. 静かなラインのグリッド（ゆっくり流れる）
 *   2. ぼかした緑系オーブ3つ（位置・サイズ・速度が異なる）
 *   3. 粒子が下から上へ緩やかに上昇
 *
 * すべて pointer-events:none で、白基調＋緑グラデの色調を邪魔しないよう
 * 低透過度に抑えている。
 */
export default function AmbientBackground() {
  // Deterministic particle distribution (SSR 一致用にランダム禁止)
  const particles = Array.from({ length: 14 }, (_, i) => {
    const left = (i * 7.3) % 100;
    const driftX = ((i * 37) % 120) - 60; // -60 〜 60px
    const dur = 22 + ((i * 4) % 18); // 22〜40s
    const delay = (i * 1.7) % 16; // 0〜16s
    const size = 3 + ((i * 2) % 5); // 3〜7px
    const opacity = 0.18 + ((i * 13) % 7) / 50; // 0.18〜0.32
    return { left, driftX, dur, delay, size, opacity, key: i };
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-40 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle grid, fading out to edges */}
      <div className="animate-grid-drift absolute inset-0 opacity-60" />

      {/* Soft green gradient orbs */}
      <div className="animate-orb-1 absolute left-[-10%] top-[10%] h-[38rem] w-[38rem] rounded-full bg-emerald-300/25 blur-[110px]" />
      <div className="animate-orb-2 absolute right-[-12%] top-[45%] h-[42rem] w-[42rem] rounded-full bg-teal-200/30 blur-[120px]" />
      <div className="animate-orb-3 absolute bottom-[-10%] left-[25%] h-[34rem] w-[34rem] rounded-full bg-lime-200/25 blur-[110px]" />

      {/* Floating particles rising upward */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.key}
            className="animate-particle absolute bottom-0 block rounded-full bg-emerald-400"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              // CSS custom properties consumed by .animate-particle
              ["--drift-x" as string]: `${p.driftX}px`,
              ["--dur" as string]: `${p.dur}s`,
              ["--delay" as string]: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
