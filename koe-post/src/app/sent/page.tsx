import type { Metadata } from "next";
import Link from "next/link";
import KidShell, { PostIcon } from "@/components/KidShell";
import Helplines from "@/components/Helplines";

export const metadata: Metadata = { title: "とどきました" };

export default async function SentPage({ searchParams }: { searchParams: Promise<{ care?: string }> }) {
  const { care } = await searchParams;
  const emphasize = care === "1";
  return (
    <KidShell>
      <div className="animate-pop mt-8 text-center">
        <div className="mx-auto w-fit">
          <PostIcon size={96} />
        </div>
        <h1 className="mt-5 text-3xl font-extrabold text-ink">とどきました。</h1>
        <p className="mt-3 text-base leading-relaxed text-ink-2">
          かいてくれて、ありがとう。
          <br />
          しんじられる おとなが、ちゃんと よむね。
        </p>
      </div>
      <div className="animate-fade-in-up delay-200 mt-8">
        <Helplines emphasize={emphasize} />
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="tap inline-flex items-center rounded-full bg-paper-2 px-6 text-sm font-bold text-ink-2">
          さいしょに もどる
        </Link>
      </div>
    </KidShell>
  );
}
