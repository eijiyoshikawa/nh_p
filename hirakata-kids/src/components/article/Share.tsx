"use client";

import { useState } from "react";

export function Share({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(`${title} | HIRAKIDS`);
  const encUrl = encodeURIComponent(url);
  const xHref = `https://twitter.com/intent/tweet?text=${text}&url=${encUrl}`;
  const lineHref = `https://social-plugins.line.me/lineit/share?url=${encUrl}`;

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop — clipboard permission denied
    }
  }

  return (
    <section className="mt-10 rounded-lg border border-orange-100 bg-white p-4">
      <p className="text-sm font-semibold text-stone-900">この記事をシェア</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <a
          href={xHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1.5 font-medium text-stone-700 transition hover:border-stone-400"
        >
          Xでシェア
        </a>
        <a
          href={lineHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-medium text-emerald-700 transition hover:bg-emerald-100"
        >
          LINEでシェア
        </a>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 font-medium text-orange-700 transition hover:bg-orange-100"
        >
          {copied ? "コピーしました" : "URLをコピー"}
        </button>
      </div>
    </section>
  );
}
