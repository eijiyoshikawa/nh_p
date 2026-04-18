import type { ReactNode } from "react";

type Item = {
  emoji: string;
  top: string;
  left: string;
  size: string;
  variant: "a" | "b" | "c";
  delay?: string;
};

const defaultItems: Item[] = [
  { emoji: "🌈", top: "8%",  left: "6%",  size: "2.6rem", variant: "a", delay: "0s" },
  { emoji: "✨", top: "14%", left: "82%", size: "1.8rem", variant: "b", delay: "1.2s" },
  { emoji: "🎈", top: "62%", left: "4%",  size: "2.4rem", variant: "c", delay: "0.8s" },
  { emoji: "⭐️", top: "72%", left: "70%", size: "1.6rem", variant: "a", delay: "2s" },
  { emoji: "🎀", top: "38%", left: "88%", size: "1.8rem", variant: "c", delay: "0.4s" },
  { emoji: "🌟", top: "44%", left: "12%", size: "1.6rem", variant: "b", delay: "1.6s" },
  { emoji: "🧸", top: "22%", left: "46%", size: "1.8rem", variant: "a", delay: "2.4s" },
  { emoji: "🍭", top: "84%", left: "40%", size: "1.6rem", variant: "b", delay: "0.2s" },
];

const blobs = [
  { top: "-10%", left: "-6%",  size: "22rem", color: "bg-pink-200/50",   delay: "0s" },
  { top: "40%",  left: "-12%", size: "18rem", color: "bg-amber-200/50",  delay: "1.5s" },
  { top: "-8%",  left: "70%",  size: "24rem", color: "bg-orange-200/60", delay: "0.8s" },
  { top: "65%",  left: "60%",  size: "20rem", color: "bg-rose-200/50",   delay: "2.2s" },
];

// Decorative, pointer-events:none animated background. Respects
// prefers-reduced-motion via the CSS in globals.css.
export function PopBackground({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`pop-anim relative overflow-hidden ${className}`}
      aria-hidden={false}
    >
      <div className="pointer-events-none absolute inset-0">
        {blobs.map((b, i) => (
          <div
            key={`blob-${i}`}
            className={`pop-blob absolute rounded-full blur-3xl ${b.color}`}
            style={{
              top: b.top,
              left: b.left,
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
            }}
            aria-hidden
          />
        ))}
        {defaultItems.map((it, i) => (
          <span
            key={`item-${i}`}
            className={`pop-item pop-item-${it.variant} absolute select-none`}
            style={{
              top: it.top,
              left: it.left,
              fontSize: it.size,
              animationDelay: it.delay,
            }}
            aria-hidden
          >
            {it.emoji}
          </span>
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
