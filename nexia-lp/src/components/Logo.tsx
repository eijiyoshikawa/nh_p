import Link from "next/link";
import { org } from "@/lib/site";

// 名刺ロゴ（両手で包む種と芽、ゴールドの輪、"mirai lab / NEXIA"）を SVG で再現。
// 正式なロゴ画像（PNG/SVG）がある場合は public/logo.png に置き、
// 下の <LogoMark> を <img src="/logo.png" /> に差し替えてください。
export const LOGO_GREEN = "#4E6B33";
export const LOGO_GOLD = "#B69B47";

export function LogoMark({
  size = 40,
  withText = true,
}: {
  size?: number;
  withText?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden
      className="shrink-0"
    >
      {/* ring */}
      <circle cx="100" cy="100" r="95" fill="#FFFFFF" stroke={LOGO_GOLD} strokeWidth="5" />
      {/* seed */}
      <path
        d="M100 128 C84 128 74 116 74 104 C74 92 86 82 100 70 C114 82 126 92 126 104 C126 116 116 128 100 128 Z"
        fill={LOGO_GOLD}
      />
      <path d="M100 128 C96 112 96 96 100 78" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* stem + leaves */}
      <path d="M100 78 C100 66 100 58 100 48" stroke={LOGO_GREEN} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M100 56 C86 58 74 52 70 38 C84 34 98 42 100 56 Z" fill={LOGO_GREEN} />
      <path d="M100 52 C112 46 124 42 132 30 C122 24 106 32 100 52 Z" fill={LOGO_GREEN} />
      {/* hands */}
      <path
        d="M38 92 C36 108 46 122 64 130 C74 135 86 139 98 140 L98 132 C86 130 76 126 68 118 C62 112 56 104 54 94 C52 88 44 86 38 92 Z"
        fill={LOGO_GREEN}
      />
      <path
        d="M162 92 C164 108 154 122 136 130 C126 135 114 139 102 140 L102 132 C114 130 124 126 132 118 C138 112 144 104 146 94 C148 88 156 86 162 92 Z"
        fill={LOGO_GREEN}
      />
      <path d="M40 96 C50 92 60 96 66 106" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M160 96 C150 92 140 96 134 106" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {withText && (
        <>
          <text
            x="100"
            y="160"
            textAnchor="middle"
            fontFamily="Arial Rounded MT Bold, Helvetica, Arial, sans-serif"
            fontWeight="700"
            fontSize="19"
            fill={LOGO_GREEN}
          >
            mirai lab
          </text>
          <text
            x="100"
            y="182"
            textAnchor="middle"
            fontFamily="Helvetica, Arial, sans-serif"
            fontWeight="800"
            fontSize="22"
            letterSpacing="4"
            fill={LOGO_GREEN}
          >
            NEXIA
          </text>
        </>
      )}
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={org.name}>
      <span className="transition-transform duration-500 group-hover:rotate-12">
        <LogoMark size={40} withText={false} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-[10px] font-bold ${light ? "text-white/60" : "text-ink-3"}`}>
          {org.descriptor}
        </span>
        <span className={`mt-1 whitespace-nowrap text-[13px] font-extrabold tracking-tight sm:text-[15px] ${light ? "text-white" : "text-ink"}`}>
          {org.name}
        </span>
      </span>
    </Link>
  );
}
