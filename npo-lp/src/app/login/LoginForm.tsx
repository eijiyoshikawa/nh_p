"use client";

import { useState } from "react";

export function LoginForm({ from }: { from: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, from }),
      });
      const data = (await resp.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        redirect?: string;
      };
      if (resp.ok && data.ok) {
        window.location.href = data.redirect || "/";
      } else {
        setError(data.error || "ログインに失敗しました");
        setPending(false);
      }
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください。");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3" noValidate>
      <label className="block">
        <span className="text-xs font-medium text-text-secondary">パスワード</span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-base text-text-primary placeholder:text-stone-400 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-orange-200"
          disabled={pending}
        />
      </label>
      <button
        type="submit"
        disabled={pending || password.length === 0}
        className="w-full rounded-lg bg-accent-orange px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-accent-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "確認中…" : "ログイン"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
