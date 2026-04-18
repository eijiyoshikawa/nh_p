"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="text-xs font-semibold tracking-widest text-orange-600">
        ERROR
      </p>
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        ページの読み込みに失敗しました
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-stone-600">
        一時的な問題の可能性があります。少し時間をおいて再度お試しください。
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-stone-400">参照 ID: {error.digest}</p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#F97316] px-5 py-2 font-semibold text-white transition hover:bg-[#ea6a0e]"
        >
          もう一度読み込む
        </button>
        <Link
          href="/"
          className="rounded-full border border-orange-200 bg-white px-5 py-2 font-semibold text-orange-700 transition hover:bg-orange-50"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
