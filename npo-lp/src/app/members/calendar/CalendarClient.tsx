"use client";

import { useState } from "react";
import { useCollection } from "@/components/members/useCollection";
import { StoreNotice } from "@/components/members/StoreNotice";

type EventItem = {
  id: string;
  date: string; // YYYY-MM-DD
  time?: string;
  title: string;
  place?: string;
  note?: string;
};

export function CalendarClient() {
  const c = useCollection<EventItem>("events");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const sorted = [...c.items].sort((a, b) =>
    `${a.date}${a.time ?? ""}`.localeCompare(`${b.date}${b.time ?? ""}`)
  );
  // 今日以降を「予定」、過去を「履歴」に分ける
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = sorted.filter((e) => e.date >= today);
  const past = sorted.filter((e) => e.date < today).reverse();

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !title.trim()) {
      setErr("日付とタイトルは必須です");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await c.add({ date, time, title: title.trim(), place, note });
      setDate("");
      setTime("");
      setTitle("");
      setPlace("");
      setNote("");
    } catch (e2) {
      setErr(String(e2));
    } finally {
      setBusy(false);
    }
  }

  const EventRow = ({ e, dim }: { e: EventItem; dim?: boolean }) => (
    <li
      className={`flex items-start justify-between gap-3 rounded-xl border border-green-100 bg-white p-4 ${
        dim ? "opacity-70" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="rounded-md bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700">
            {e.date.replace(/-/g, "/")}
            {e.time ? ` ${e.time}` : ""}
          </span>
          <span className="text-sm font-bold text-text-primary">{e.title}</span>
        </div>
        {(e.place || e.note) && (
          <p className="mt-1 text-xs text-text-secondary">
            {e.place && <span>📍 {e.place}</span>}
            {e.place && e.note && <span> ／ </span>}
            {e.note}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => c.remove(e.id)}
        className="shrink-0 rounded-md px-2 py-1 text-xs text-stone-400 transition hover:bg-red-50 hover:text-red-600"
        aria-label="削除"
      >
        削除
      </button>
    </li>
  );

  return (
    <div className="mt-8 space-y-8">
      {!c.configured && <StoreNotice />}

      {/* Add form */}
      <form
        onSubmit={onAdd}
        className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
      >
        <p className="text-sm font-bold text-text-primary">予定を追加</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-medium text-text-secondary">
            日付 *
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </label>
          <label className="text-xs font-medium text-text-secondary">
            時間
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 w-full rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </label>
          <label className="text-xs font-medium text-text-secondary sm:col-span-2">
            タイトル *
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 〇〇子ども食堂 開催"
              className="mt-1 w-full rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </label>
          <label className="text-xs font-medium text-text-secondary">
            場所
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="例: 枚方市〇〇"
              className="mt-1 w-full rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </label>
          <label className="text-xs font-medium text-text-secondary">
            メモ
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="持ち物・担当など"
              className="mt-1 w-full rounded-lg border border-green-200 px-3 py-2 text-sm text-text-primary focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </label>
        </div>
        {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-4 rounded-full bg-accent-orange px-5 py-2 text-sm font-bold text-white transition hover:bg-accent-orange-dark disabled:opacity-60"
        >
          {busy ? "追加中…" : "カレンダーに追加"}
        </button>
      </form>

      {c.loading ? (
        <p className="text-sm text-text-secondary">読み込み中…</p>
      ) : (
        <>
          <section>
            <h2 className="text-lg font-bold text-text-primary">
              これからの予定（{upcoming.length}）
            </h2>
            {upcoming.length === 0 ? (
              <p className="mt-3 text-sm text-text-secondary">
                予定はまだありません。
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {upcoming.map((e) => (
                  <EventRow key={e.id} e={e} />
                ))}
              </ul>
            )}
          </section>

          {past.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-text-primary">過去の活動</h2>
              <ul className="mt-3 space-y-2">
                {past.map((e) => (
                  <EventRow key={e.id} e={e} dim />
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
