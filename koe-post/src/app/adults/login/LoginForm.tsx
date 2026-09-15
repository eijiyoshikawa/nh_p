"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!data.ok) {
      setError(data.error ?? "ログインできませんでした");
      setPending(false);
      return;
    }
    router.replace("/adults");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-xs font-bold text-ink-2">パスワード</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-xl border-2 border-paper-2 bg-white px-4 py-3 text-base text-ink focus:border-sky focus:outline-none"
        />
      </label>
      {error && <p className="rounded-xl bg-danger-soft px-4 py-2 text-sm font-bold text-danger">{error}</p>}
      <button
        type="submit"
        disabled={pending || !password}
        className="w-full rounded-full bg-sky px-4 py-3 text-base font-extrabold text-white transition hover:bg-sky-dark disabled:opacity-50"
      >
        {pending ? "確認中…" : "ログイン"}
      </button>
    </form>
  );
}
