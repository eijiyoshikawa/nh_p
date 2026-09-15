"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.replace("/adults/login");
      }}
      className="rounded-full border border-ink/10 px-4 py-2 text-sm font-bold text-ink-2 hover:bg-paper-2"
    >
      ログアウト
    </button>
  );
}
