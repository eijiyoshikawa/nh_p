import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** hover lift を無効にしたい場合 false */
  interactive?: boolean;
};

export default function Card({
  children,
  className = "",
  interactive = true,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-emerald-50 bg-white p-5 shadow-sm sm:p-6 ${
        interactive ? "hover-lift" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
