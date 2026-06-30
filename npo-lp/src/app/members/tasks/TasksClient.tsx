"use client";

import { useState } from "react";
import { useCollection } from "@/components/members/useCollection";
import { StoreNotice } from "@/components/members/StoreNotice";
import { members } from "@/lib/members";

type TaskItem = {
  id: string;
  title: string;
  assignee?: string;
  due?: string;
  status: "todo" | "doing" | "done";
};

const COLUMNS: { key: TaskItem["status"]; label: string; tone: string }[] = [
  { key: "todo", label: "未着手", tone: "border-stone-200 bg-stone-50" },
  { key: "doing", label: "進行中", tone: "border-amber-200 bg-amber-50" },
  { key: "done", label: "完了", tone: "border-emerald-200 bg-emerald-50" },
];

export function TasksClient() {
  const c = useCollection<TaskItem>("tasks");
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [due, setDue] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setErr("タスク名は必須です");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await c.add({ title: title.trim(), assignee, due, status: "todo" });
      setTitle("");
      setAssignee("");
      setDue("");
    } catch (e2) {
      setErr(String(e2));
    } finally {
      setBusy(false);
    }
  }

  const nextStatus: Record<TaskItem["status"], TaskItem["status"]> = {
    todo: "doing",
    doing: "done",
    done: "todo",
  };

  return (
    <div className="mt-8 space-y-8">
      {!c.configured && <StoreNotice />}

      <form
        onSubmit={onAdd}
        className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
      >
        <p className="text-sm font-bold text-text-primary">タスクを追加</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タスク名 *"
            className="rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200 sm:col-span-3"
          />
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">担当者（任意）</option>
            {members.map((m) => (
              <option key={m.slug} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-accent-orange px-5 py-2 text-sm font-bold text-white transition hover:bg-accent-orange-dark disabled:opacity-60"
          >
            {busy ? "追加中…" : "追加"}
          </button>
        </div>
        {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
      </form>

      {c.loading ? (
        <p className="text-sm text-text-secondary">読み込み中…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {COLUMNS.map((col) => {
            const items = c.items.filter((t) => t.status === col.key);
            return (
              <div
                key={col.key}
                className={`rounded-2xl border-2 ${col.tone} p-3`}
              >
                <p className="px-1 text-sm font-bold text-text-primary">
                  {col.label}（{items.length}）
                </p>
                <ul className="mt-2 space-y-2">
                  {items.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-xl border border-green-100 bg-white p-3"
                    >
                      <p className="text-sm font-bold text-text-primary">
                        {t.title}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-text-secondary">
                        {t.assignee && <span>👤 {t.assignee}</span>}
                        {t.due && <span>📅 {t.due.replace(/-/g, "/")}</span>}
                      </div>
                      <div className="mt-2 flex gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            c.patch(t.id, { status: nextStatus[t.status] })
                          }
                          className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                        >
                          {t.status === "done" ? "↩ 未着手へ" : "→ 次へ"}
                        </button>
                        <button
                          type="button"
                          onClick={() => c.remove(t.id)}
                          className="rounded-md px-2 py-1 text-xs text-stone-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          削除
                        </button>
                      </div>
                    </li>
                  ))}
                  {items.length === 0 && (
                    <li className="px-1 py-2 text-xs text-text-secondary">
                      なし
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
