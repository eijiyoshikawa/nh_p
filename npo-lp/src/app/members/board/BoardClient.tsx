"use client";

import { useState } from "react";
import { useCollection } from "@/components/members/useCollection";
import { StoreNotice } from "@/components/members/StoreNotice";

type Announcement = {
  id: string;
  createdAt: string; // ISO
  author?: string;
  title: string;
  body: string;
  pinned?: boolean;
};

export function BoardClient() {
  const c = useCollection<Announcement>("announcements");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const sorted = [...c.items].sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    return b.createdAt.localeCompare(a.createdAt);
  });

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setErr("タイトルと本文は必須です");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await c.add({
        author: author.trim(),
        title: title.trim(),
        body: body.trim(),
        createdAt: new Date().toISOString(),
        pinned: false,
      });
      setTitle("");
      setBody("");
    } catch (e2) {
      setErr(String(e2));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      {!c.configured && <StoreNotice />}

      <form
        onSubmit={onAdd}
        className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
      >
        <p className="text-sm font-bold text-text-primary">お知らせを投稿</p>
        <div className="mt-3 space-y-3">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="投稿者（任意）"
            className="w-full rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル *"
            className="w-full rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="本文 *"
            rows={3}
            className="w-full rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-4 rounded-full bg-accent-orange px-5 py-2 text-sm font-bold text-white transition hover:bg-accent-orange-dark disabled:opacity-60"
        >
          {busy ? "投稿中…" : "投稿する"}
        </button>
      </form>

      {c.loading ? (
        <p className="text-sm text-text-secondary">読み込み中…</p>
      ) : sorted.length === 0 ? (
        <p className="text-sm text-text-secondary">お知らせはまだありません。</p>
      ) : (
        <ul className="space-y-3">
          {sorted.map((a) => (
            <li
              key={a.id}
              className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {a.pinned && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                        固定
                      </span>
                    )}
                    <h3 className="text-base font-bold text-text-primary">
                      {a.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    {a.createdAt.slice(0, 10).replace(/-/g, "/")}
                    {a.author ? ` ・ ${a.author}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => c.patch(a.id, { pinned: !a.pinned })}
                    className="rounded-md px-2 py-1 text-xs text-stone-400 transition hover:bg-amber-50 hover:text-amber-600"
                  >
                    {a.pinned ? "固定解除" : "固定"}
                  </button>
                  <button
                    type="button"
                    onClick={() => c.remove(a.id)}
                    className="rounded-md px-2 py-1 text-xs text-stone-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    削除
                  </button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
                {a.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
