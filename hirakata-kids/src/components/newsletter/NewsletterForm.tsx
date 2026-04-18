"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function NewsletterForm({
  source = "web",
  variant = "hero",
}: {
  source?: string;
  variant?: "hero" | "compact";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "pending") return;
    setStatus({ kind: "pending" });
    try {
      const resp = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await resp.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (resp.ok && data.ok) {
        setStatus({ kind: "success" });
        setEmail("");
      } else {
        setStatus({
          kind: "error",
          message: data.error ?? "登録に失敗しました",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "通信エラーが発生しました。時間をおいて再度お試しください。",
      });
    }
  }

  const inputCls =
    variant === "hero"
      ? "w-full rounded-full border border-orange-200 bg-white px-5 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
      : "w-full rounded-md border border-orange-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200";
  const buttonCls =
    variant === "hero"
      ? "rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea6a0e] disabled:cursor-not-allowed disabled:opacity-60"
      : "rounded-md bg-[#F97316] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ea6a0e] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <form
      onSubmit={onSubmit}
      className={variant === "hero" ? "mt-6 flex flex-col gap-3 sm:flex-row" : "mt-3 flex flex-col gap-2 sm:flex-row"}
      noValidate
    >
      <label className="sr-only" htmlFor={`newsletter-email-${variant}`}>
        メールアドレス
      </label>
      <input
        id={`newsletter-email-${variant}`}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレスを入力"
        className={inputCls}
        disabled={status.kind === "pending"}
      />
      <button
        type="submit"
        disabled={status.kind === "pending"}
        className={buttonCls}
      >
        {status.kind === "pending" ? "登録中…" : "無料で登録する"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={
          variant === "hero"
            ? "sr-only sm:not-sr-only sm:ml-1 sm:self-center sm:text-sm"
            : "text-xs"
        }
      >
        {status.kind === "success" && (
          <span className="text-emerald-600">
            登録ありがとうございます。確認メールをお送りしました。
          </span>
        )}
        {status.kind === "error" && (
          <span className="text-red-600">{status.message}</span>
        )}
      </p>
    </form>
  );
}
