import { sns } from "@/lib/content";

const ICONS: Record<(typeof sns)[number]["id"], React.ReactNode> = {
  line: (
    <>
      <path d="M12 3.5c-5.5 0-10 3.4-10 7.6 0 2.4 1.4 4.5 3.6 5.9L5 21l4.4-2.3c.8.2 1.7.3 2.6.3 5.5 0 10-3.4 10-7.6S17.5 3.5 12 3.5Z" />
      <path d="M8 9.5v4M11 9.5v4M14 9.5v4l2.5-4v4" />
    </>
  ),
  threads: (
    <>
      <path d="M12 21c-4.4 0-7.5-3.2-7.5-9S7.6 3 12 3c3.6 0 6.2 2 7 5.2" />
      <path d="M8.5 13.2c0-2 1.7-3.2 3.7-3.2 2.7 0 4.2 1.6 4.2 4.1 0 2.3-1.6 3.9-3.9 3.9-1.9 0-3.3-1-3.3-2.5s1.4-2.4 3.4-2.4c1.4 0 2.6.3 3.7.9" />
      <path d="M14.3 9.4c-.4-1.2-1.3-2-2.6-2-1.2 0-2 .6-2.4 1.4" />
    </>
  ),
  tiktok: (
    <>
      <path d="M13.5 3v11.2a3.2 3.2 0 1 1-3.2-3.2" />
      <path d="M13.5 3c.4 2.6 2 4.3 4.5 4.6" />
      <path d="M13.5 7.2c1.2 1 2.6 1.6 4.5 1.6" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10 9.3v5.4l4.6-2.7L10 9.3Z" />
    </>
  ),
};

// 公式SNSリンク（LINE / Threads / TikTok / YouTube）
export function SocialLinks({
  variant = "light",
  withLabel = false,
  className = "",
}: {
  variant?: "light" | "dark";
  withLabel?: boolean;
  className?: string;
}) {
  const tone =
    variant === "dark"
      ? "bg-white/10 text-white hover:bg-white hover:text-text-primary"
      : "bg-green-50 text-accent-green-dark hover:bg-accent-green-dark hover:text-white";
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="公式SNS">
      {sns.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`flex items-center gap-2 rounded-full transition hover:-translate-y-0.5 ${
              withLabel ? "px-4 py-2 text-sm font-semibold" : "h-10 w-10 justify-center"
            } ${tone}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {ICONS[s.id]}
            </svg>
            {withLabel && s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
