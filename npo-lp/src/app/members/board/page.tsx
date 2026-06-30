import type { Metadata } from "next";
import { MembersSubHeader } from "@/components/members/MembersSubHeader";
import { BoardClient } from "./BoardClient";

export const metadata: Metadata = {
  title: "お知らせ — メンバー専用",
  robots: { index: false, follow: false },
};

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <MembersSubHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-semibold tracking-widest text-accent-orange">
          BOARD
        </p>
        <h1 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">
          お知らせ・掲示板
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          メンバー向けの連絡事項を投稿・共有できます。
        </p>
        <BoardClient />
      </main>
    </div>
  );
}
