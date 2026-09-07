import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "sun" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/30";
const sizes = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};
const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-lg shadow-brand/25 hover:bg-brand-dark hover:-translate-y-0.5",
  sun: "bg-sun text-ink shadow-lg shadow-sun/30 hover:bg-sun-dark hover:-translate-y-0.5",
  outline: "border-2 border-ink/15 bg-white text-ink hover:border-brand hover:text-brand",
  ghost: "text-brand hover:bg-brand-soft",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
