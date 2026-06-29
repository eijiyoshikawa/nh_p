import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "ログイン — メンバー限定",
  description: "ひらかた子ども食堂支援NPO メンバー限定サイト",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-warm-bg to-amber-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-orange-100 bg-white p-8 shadow-lg">
        <p className="text-xs font-semibold tracking-widest text-accent-orange">
          MEMBERS ONLY
        </p>
        <h1 className="mt-2 text-2xl font-bold text-text-primary">
          メンバー限定エリア
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          NPOメンバーから共有された共通パスワードを入力してください。
        </p>
        <LoginForm from={from ?? "/"} />
        <p className="mt-6 text-xs text-text-secondary">
          パスワードがわからない場合は、運営担当（{" "}
          <a
            href="https://skma.asia/"
            target="_blank"
            rel="noreferrer"
            className="text-accent-orange hover:underline"
          >
            三慧経営顧問株式会社
          </a>
          ）までお問い合わせください。
        </p>
      </div>
    </div>
  );
}
