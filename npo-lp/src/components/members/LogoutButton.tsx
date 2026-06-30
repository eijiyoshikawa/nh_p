"use client";

import { useState } from "react";

export function LogoutButton() {
  const [pending, setPending] = useState(false);

  async function onLogout() {
    if (pending) return;
    setPending(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore — redirect anyway
    }
    window.location.href = "/login";
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={pending}
      className="rounded-full border border-green-200 bg-white px-3 py-1.5 text-xs font-semibold text-text-secondary transition hover:border-accent-orange hover:text-accent-orange disabled:opacity-60"
    >
      {pending ? "ログアウト中…" : "ログアウト"}
    </button>
  );
}
