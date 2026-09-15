"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { AUDIENCE_LABEL, CATEGORY_LABEL, GRADE_LABEL, STATUS_LABEL } from "@/lib/content";
import { TAG_LABEL, URGENCY_LABEL } from "@/lib/safety";
import type { Post, Status, Tag, Urgency } from "@/lib/types";

const URGENCY_STYLE: Record<Urgency, string> = {
  urgent: "bg-danger text-white",
  watch: "bg-warn-soft text-warn",
  normal: "bg-paper-2 text-ink-2",
};
const TAG_STYLE: Record<Tag, string> = {
  "self-harm": "bg-danger-soft text-danger",
  abuse: "bg-danger-soft text-danger",
  bullying: "bg-warn-soft text-warn",
  "school-refusal": "bg-warn-soft text-warn",
  isolation: "bg-grape-soft text-grape",
  "family-hardship": "bg-warn-soft text-warn",
  teacher: "bg-sky-soft text-sky-dark",
  wish: "bg-leaf-soft text-leaf",
  spam: "bg-paper-2 text-ink-3",
};
const STATUSES: Status[] = ["new", "seen", "working", "done"];

function fmt(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [urgency, setUrgency] = useState<Urgency | "all">("all");
  const [tag, setTag] = useState<Tag | "all">("all");
  const [status, setStatus] = useState<Status | "all" | "open">("open");
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/adults/posts", { cache: "no-store" })
      .then((res) => res.json() as Promise<{ ok: boolean; configured: boolean; posts: Post[] }>)
      .then((data) => {
        if (cancelled) return;
        setPosts(data.posts ?? []);
        setConfigured(data.configured);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const rank: Record<Urgency, number> = { urgent: 0, watch: 1, normal: 2 };
    return posts
      .filter((p) => urgency === "all" || p.urgency === urgency)
      .filter((p) => tag === "all" || p.tags.includes(tag))
      .filter((p) => (status === "all" ? true : status === "open" ? p.status !== "done" : p.status === status))
      .filter((p) => !q || p.body.includes(q) || p.note.includes(q) || p.schoolCode.includes(q))
      .sort((a, b) => rank[a.urgency] - rank[b.urgency] || (a.createdAt < b.createdAt ? 1 : -1));
  }, [posts, urgency, tag, status, q]);

  const counts = useMemo(
    () => ({
      urgent: posts.filter((p) => p.urgency === "urgent" && p.status !== "done").length,
      watch: posts.filter((p) => p.urgency === "watch" && p.status !== "done").length,
      open: posts.filter((p) => p.status !== "done").length,
      total: posts.length,
    }),
    [posts]
  );

  async function patch(id: string, body: { status?: Status; note?: string }) {
    const res = await fetch(`/api/adults/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as { ok: boolean; post?: Post };
    if (data.ok && data.post) setPosts((ps) => ps.map((p) => (p.id === id ? data.post! : p)));
  }
  async function remove(id: string) {
    if (!confirm("この投稿を削除します。元に戻せません。よろしいですか？")) return;
    await fetch(`/api/adults/posts/${id}`, { method: "DELETE" });
    setPosts((ps) => ps.filter((p) => p.id !== id));
  }

  const chip = (active: boolean, extra = "") =>
    `rounded-full px-3 py-1.5 text-xs font-bold transition ${active ? "bg-ink text-white" : "bg-white text-ink-2 hover:bg-paper-2"} ${extra}`;

  return (
    <div>
      {!configured && (
        <p className="mb-4 rounded-2xl bg-warn-soft px-4 py-3 text-xs font-bold text-warn">
          データベース（Upstash Redis）が未設定のため、投稿はサーバー再起動で消えます。本番運用前に UPSTASH_REDIS_REST_URL / TOKEN を設定してください。
        </p>
      )}

      {/* summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "緊急（未対応）", n: counts.urgent, cls: counts.urgent ? "border-danger bg-danger-soft text-danger" : "bg-white text-ink" },
          { label: "要注意（未対応）", n: counts.watch, cls: counts.watch ? "border-warn bg-warn-soft text-warn" : "bg-white text-ink" },
          { label: "未対応 合計", n: counts.open, cls: "bg-white text-ink" },
          { label: "累計", n: counts.total, cls: "bg-white text-ink" },
        ].map((c) => (
          <div key={c.label} className={`rounded-2xl border-2 border-transparent p-4 ${c.cls}`}>
            <p className="text-xs font-bold opacity-80">{c.label}</p>
            <p className="mt-1 text-3xl font-extrabold">{c.n}</p>
          </div>
        ))}
      </div>

      {/* filters */}
      <div className="mt-5 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-ink-3">緊急度</span>
          {(["all", "urgent", "watch", "normal"] as const).map((u) => (
            <button key={u} type="button" onClick={() => setUrgency(u)} className={chip(urgency === u)}>
              {u === "all" ? "すべて" : URGENCY_LABEL[u]}
            </button>
          ))}
          <span className="ml-3 text-xs font-bold text-ink-3">状況</span>
          {(["open", "all", ...STATUSES] as const).map((s) => (
            <button key={s} type="button" onClick={() => setStatus(s)} className={chip(status === s)}>
              {s === "open" ? "未対応のみ" : s === "all" ? "すべて" : STATUS_LABEL[s]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-ink-3">タグ</span>
          <button type="button" onClick={() => setTag("all")} className={chip(tag === "all")}>
            すべて
          </button>
          {(Object.keys(TAG_LABEL) as Tag[]).map((t) => (
            <button key={t} type="button" onClick={() => setTag(t)} className={chip(tag === t)}>
              {TAG_LABEL[t]}
            </button>
          ))}
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="本文・メモ・学校コードで検索"
            className="ml-auto w-full rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs sm:w-64"
          />
        </div>
      </div>

      {/* list */}
      <p className="mt-5 text-xs text-ink-3">{filtered.length} 件（緊急 → 要注意 → 通常、新しい順）</p>
      {loading ? (
        <p className="mt-6 text-sm text-ink-2">読み込み中…</p>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border-2 border-dashed border-ink/10 bg-white p-10 text-center text-sm text-ink-2">
          該当する投稿はありません。
        </div>
      ) : (
        <ul className="mt-3 space-y-3">
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} onPatch={patch} onRemove={remove} />
          ))}
        </ul>
      )}
    </div>
  );
}

function PostCard({
  post,
  onPatch,
  onRemove,
}: {
  post: Post;
  onPatch: (id: string, body: { status?: Status; note?: string }) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}) {
  const [note, setNote] = useState(post.note);
  const [saving, setSaving] = useState(false);
  const dirty = note !== post.note;

  return (
    <li
      className={`rounded-3xl border-2 bg-white p-5 ${
        post.urgency === "urgent" ? "border-danger" : post.urgency === "watch" ? "border-warn/50" : "border-transparent"
      } ${post.status === "done" ? "opacity-60" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold ${URGENCY_STYLE[post.urgency]}`}>
          {URGENCY_LABEL[post.urgency]}
        </span>
        {post.tags.map((t) => (
          <span key={t} className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${TAG_STYLE[t]}`}>
            {TAG_LABEL[t]}
          </span>
        ))}
        <span className="ml-auto text-xs text-ink-3">{fmt(post.createdAt)}</span>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-ink">{post.body}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
        <span>{CATEGORY_LABEL[post.category]}</span>
        <span>見てほしい相手：{AUDIENCE_LABEL[post.audience]}</span>
        <span>学年帯：{GRADE_LABEL[post.grade]}</span>
        {post.schoolCode && <span>学校コード：{post.schoolCode}</span>}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[auto_1fr]">
        <div className="flex flex-wrap gap-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onPatch(post.id, { status: s })}
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                post.status === s ? "bg-sky text-white" : "bg-paper-2 text-ink-2 hover:bg-sky-soft"
              }`}
            >
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={1}
            placeholder="内部メモ（子どもには見えません）"
            className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm"
          />
          <button
            type="button"
            disabled={!dirty || saving}
            onClick={async () => {
              setSaving(true);
              await onPatch(post.id, { note });
              setSaving(false);
            }}
            className="shrink-0 rounded-xl bg-ink px-3 text-xs font-bold text-white disabled:opacity-30"
          >
            保存
          </button>
          <button
            type="button"
            onClick={() => onRemove(post.id)}
            aria-label="削除"
            title="削除"
            className="shrink-0 rounded-xl px-2 text-ink-3 hover:bg-danger-soft hover:text-danger"
          >
            <Icon name="box" size={16} />
          </button>
        </div>
      </div>
    </li>
  );
}
