import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
  accent,
}: {
  children: ReactNode;
  className?: string;
  accent?: "brand" | "sun" | "coral" | "mint";
}) {
  const border =
    accent === "sun"
      ? "border-sun/60"
      : accent === "coral"
        ? "border-coral/50"
        : accent === "mint"
          ? "border-mint/60"
          : accent === "brand"
            ? "border-brand/40"
            : "border-ink/8";
  return (
    <div
      className={`rounded-3xl border-2 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(27,31,42,0.12)] ${border} ${className}`}
    >
      {children}
    </div>
  );
}
