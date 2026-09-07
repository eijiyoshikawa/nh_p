import type { CSSProperties, ReactNode } from "react";

// サイト専用のラインアイコン（24x24, stroke ベース）。
// ロゴのトーンに合わせた細めの線画。色は currentColor で親から制御。
export type IconName =
  | "child"
  | "family"
  | "users"
  | "bowl"
  | "pan"
  | "building"
  | "office"
  | "factory"
  | "school"
  | "handshake"
  | "box"
  | "door"
  | "house"
  | "flask"
  | "bulb"
  | "chat"
  | "wrench"
  | "flag"
  | "sprout"
  | "heart"
  | "check"
  | "message"
  | "mail"
  | "arrow";

const PATHS: Record<IconName, ReactNode> = {
  child: (
    <>
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M9.5 5.5c1-1.2 4-1.2 5 0" />
      <path d="M6 21v-2.5a6 6 0 0 1 12 0V21" />
    </>
  ),
  family: (
    <>
      <circle cx="9" cy="6.5" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 9-5.2" />
      <circle cx="17" cy="11" r="2.3" />
      <path d="M13 21v-2a4 4 0 0 1 8 0v2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20v-.8a6.5 6.5 0 0 1 13 0v.8" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M16.5 15.2a4.5 4.5 0 0 1 5 4.5v.3" />
    </>
  ),
  bowl: (
    <>
      <path d="M3 12h18a9 9 0 0 1-18 0Z" />
      <path d="M8 21h8M12 18v3" />
      <path d="M9 4c0 1.5-1 1.5-1 3M13 4c0 1.5-1 1.5-1 3M17 4c0 1.5-1 1.5-1 3" />
    </>
  ),
  pan: (
    <>
      <circle cx="10" cy="13.5" r="6" />
      <path d="M15.5 11.5 21 8.5" />
      <path d="M7.5 13.5a2.5 2.5 0 0 1 2.5-2.5" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M4 9h16" />
      <path d="M6 9v12M10 9v12M14 9v12M18 9v12" />
      <path d="M12 3 3 8h18L12 3Z" />
    </>
  ),
  office: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8.5 7.5h2M13.5 7.5h2M8.5 11.5h2M13.5 11.5h2M8.5 15.5h2M13.5 15.5h2" />
      <path d="M10.5 21v-3h3v3" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l5 3v-3l5 3v-3l5 3V5h3v16H3Z" />
      <path d="M7 17h2M12 17h2M17 17h2" />
    </>
  ),
  school: (
    <>
      <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" />
      <path d="M6 11.5v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" />
      <path d="M22 9.5V15" />
    </>
  ),
  handshake: (
    <>
      <path d="M2.5 9.5 6 6.5l4.5 1L14 6.5l3.5 3" />
      <path d="M2.5 9.5v6l4 4 4-1.5" />
      <path d="M21.5 9.5v6l-4 4-4-2.5" />
      <path d="M10.5 7.5 8 10a1.6 1.6 0 0 0 2.3 2.3L12 11l4 4a1.5 1.5 0 0 1-2 2l-1.5-1.5" />
    </>
  ),
  box: (
    <>
      <path d="M3 8l9-5 9 5v8l-9 5-9-5V8Z" />
      <path d="M3 8l9 5 9-5" />
      <path d="M12 13v8" />
    </>
  ),
  door: (
    <>
      <path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17" />
      <path d="M3 21h18" />
      <circle cx="14.5" cy="12.5" r="1" />
      <path d="M9 3v18" />
    </>
  ),
  house: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v11h13V10" />
      <path d="M10 21v-6h4v6" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v6L4.2 19a1.3 1.3 0 0 0 1.2 2h13.2a1.3 1.3 0 0 0 1.2-2L14 9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  bulb: (
    <>
      <path d="M9.5 18h5M10.5 21h3" />
      <path d="M12 3a6 6 0 0 0-3.8 10.6c.6.5.8 1.2.8 1.9V16h6v-.5c0-.7.2-1.4.8-1.9A6 6 0 0 0 12 3Z" />
    </>
  ),
  chat: (
    <>
      <path d="M4 4.5h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-2-2v-5a2 2 0 0 1 1-2Z" />
      <path d="M18.5 9H20a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-.5v3l-4-3H12" />
    </>
  ),
  wrench: (
    <>
      <path d="M21 6.3a4.5 4.5 0 0 1-6 4.3L7.3 18.3a2 2 0 0 1-2.8-2.8l7.7-7.7A4.5 4.5 0 0 1 17.7 3l-2.4 2.4.6 2.3 2.3.6L21 6.3Z" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4.5h12.5l-2.5 4 2.5 4H5" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7Z" />
      <path d="M12 13c0-3-2.5-6-7-6 0 3 2.5 6 7 6Z" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7.5-4.6-7.5-10.2A4 4 0 0 1 12 7.4a4 4 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  message: (
    <>
      <path d="M12 3.5c-5.5 0-10 3.4-10 7.6 0 2.4 1.4 4.5 3.6 5.9L5 21l4.4-2.3c.8.2 1.7.3 2.6.3 5.5 0 10-3.4 10-7.6S17.5 3.5 12 3.5Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export default function Icon({
  name,
  size = 24,
  className = "",
  strokeWidth = 1.7,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 ${className}`}
      style={style}
    >
      {PATHS[name]}
    </svg>
  );
}

export type Tone = "brand" | "sun" | "coral" | "mint";

const badgeTone: Record<Tone, string> = {
  brand: "bg-brand-soft text-brand",
  sun: "bg-sun-soft text-sun-dark",
  coral: "bg-coral-soft text-coral",
  mint: "bg-mint-soft text-brand",
};

// 角丸の色付きボックスにアイコンを載せるバッジ。カード類で共通利用。
export function IconBadge({
  name,
  tone = "brand",
  size = "md",
  className = "",
}: {
  name: IconName;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = size === "lg" ? "h-16 w-16 rounded-3xl" : size === "sm" ? "h-9 w-9 rounded-xl" : "h-12 w-12 rounded-2xl";
  const icon = size === "lg" ? 32 : size === "sm" ? 18 : 24;
  return (
    <span className={`icon-badge flex items-center justify-center ${box} ${badgeTone[tone]} ${className}`}>
      <Icon name={name} size={icon} />
    </span>
  );
}
