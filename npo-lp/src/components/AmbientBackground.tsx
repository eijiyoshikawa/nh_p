"use client";

/**
 * ページ全体の後ろに敷くアンビエント背景。
 *
 * 構成：
 *   1. ゆっくり流れるグリッド（視認性アップ）
 *   2. 緑系オーブ4つ（位置・サイズ・速度が異なる、輪郭をはっきり）
 *   3. 粒子が下から上へ上昇（数・輝度ともアップ）
 *   4. 緩やかに色が動くオーロラ風グラデーション
 */
export default function AmbientBackground() {
  // Deterministic distribution (SSR 一致用にランダム禁止)
  const particles = Array.from({ length: 26 }, (_, i) => {
    const left = (i * 7.3) % 100;
    const driftX = ((i * 37) % 160) - 80; // -80 〜 80px
    const dur = 18 + ((i * 3) % 18); // 18〜36s
    const delay = (i * 1.3) % 14; // 0〜14s
    const size = 4 + ((i * 2) % 7); // 4〜10px
    const opacity = 0.45 + ((i * 13) % 7) / 20; // 0.45〜0.75
    return { left, driftX, dur, delay, size, opacity, key: i };
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-40 overflow-hidden"
      aria-hidden="true"
    >
      {/* Aurora-like shifting gradient base */}
      <div className="animate-aurora absolute inset-0 opacity-70" />

      {/* Visible moving grid */}
      <div className="animate-grid-drift absolute inset-0 opacity-100" />

      {/* Crisper green gradient orbs */}
      <div className="animate-orb-1 absolute left-[-10%] top-[8%] h-[40rem] w-[40rem] rounded-full bg-emerald-400/55 blur-[90px]" />
      <div className="animate-orb-2 absolute right-[-12%] top-[38%] h-[46rem] w-[46rem] rounded-full bg-teal-300/55 blur-[100px]" />
      <div className="animate-orb-3 absolute bottom-[-12%] left-[22%] h-[38rem] w-[38rem] rounded-full bg-lime-300/55 blur-[90px]" />
      <div className="animate-orb-1 absolute right-[20%] top-[72%] h-[28rem] w-[28rem] rounded-full bg-emerald-300/45 blur-[80px]" />

      {/* Floating particles rising upward */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.key}
            className="animate-particle absolute bottom-0 block rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
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
