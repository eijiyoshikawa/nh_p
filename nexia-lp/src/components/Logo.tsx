import Link from "next/link";
import { org } from "@/lib/site";

// Simple geometric mark: three overlapping circles (= nexus / つながり)
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="14" cy="16" r="11" fill="#2457C5" opacity="0.9" />
      <circle cx="26" cy="16" r="11" fill="#FFB703" opacity="0.9" />
      <circle cx="20" cy="26" r="11" fill="#3ECFA0" opacity="0.85" />
      <circle cx="20" cy="19" r="4" fill="#FBFAF6" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={org.name}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={`text-[15px] font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          {org.shortName}
        </span>
        <span className={`mt-1 text-[9px] font-bold tracking-[0.22em] ${light ? "text-white/60" : "text-ink-3"}`}>
          {org.en}
        </span>
      </span>
    </Link>
  );
}
