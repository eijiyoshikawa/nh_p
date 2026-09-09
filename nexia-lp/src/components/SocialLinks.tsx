import Icon, { type IconName } from "@/components/Icon";
import { org } from "@/lib/site";

// 公式SNSリンク（LINE / Threads / TikTok / YouTube）。フッター・お問い合わせ・CTAで共通利用。
export default function SocialLinks({
  variant = "light",
  size = "md",
  className = "",
}: {
  variant?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}) {
  const box = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const icon = size === "sm" ? 18 : 22;
  const tone =
    variant === "dark"
      ? "bg-white/10 text-white hover:bg-white hover:text-ink"
      : "bg-brand-soft text-brand hover:bg-brand hover:text-white";
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="公式SNS">
      {org.sns.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`flex ${box} items-center justify-center rounded-full transition-all hover:-translate-y-0.5 ${tone}`}
          >
            <Icon name={s.id as IconName} size={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
