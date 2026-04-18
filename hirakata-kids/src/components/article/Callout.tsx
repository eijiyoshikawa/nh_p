import type { ReactNode } from "react";

type Variant = "info" | "warn" | "tip";

const variants: Record<
  Variant,
  { bg: string; border: string; icon: string; label: string }
> = {
  info: { bg: "bg-blue-50", border: "border-blue-200", icon: "ℹ︎", label: "INFO" },
  warn: { bg: "bg-red-50", border: "border-red-200", icon: "!", label: "注意" },
  tip: { bg: "bg-orange-50", border: "border-orange-200", icon: "★", label: "TIP" },
};

// Inline callout for MDX body copy. Used via <Callout variant="warn">…</Callout>.
// Registered in MDXRemote via the `components` prop (to be wired once MDX
// shortcode support is enabled).
export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const v = variants[variant];
  return (
    <aside
      className={`my-6 rounded-lg border ${v.border} ${v.bg} p-4`}
      role="note"
    >
      <p className="flex items-center gap-2 text-xs font-semibold text-stone-700">
        <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[12px]">
          {v.icon}
        </span>
        {title ?? v.label}
      </p>
      <div className="mt-2 text-sm leading-7 text-stone-700">{children}</div>
    </aside>
  );
}
