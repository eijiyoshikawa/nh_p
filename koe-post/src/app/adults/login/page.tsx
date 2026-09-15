import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { app } from "@/lib/content";

export const metadata: Metadata = { title: "担当者ログイン" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ setup?: string }> }) {
  const { setup } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-2 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-ink/5 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold tracking-widest text-sky">ADULTS ONLY</p>
        <h1 className="mt-1 text-xl font-extrabold text-ink">{app.name} 担当者ログイン</h1>
        <p className="mt-2 text-xs text-ink-2">子どもの投稿を読むための画面です。担当者に共有されたパスワードを入力してください。</p>
        {setup === "1" && (
          <p className="mt-4 rounded-2xl bg-warn-soft px-4 py-3 text-xs font-bold text-warn">
            環境変数 ADULT_PASSWORD が未設定です。Vercel の Settings → Environment Variables に設定してから再デプロイしてください。
          </p>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
