import type { Metadata } from "next";
import AdultShell from "@/components/AdultShell";
import { readPosts } from "@/lib/store";
import { TAG_LABEL } from "@/lib/safety";
import { CATEGORY_LABEL } from "@/lib/content";
import type { Category, Tag } from "@/lib/types";

export const metadata: Metadata = { title: "傾向" };
export const dynamic = "force-dynamic";

function weekStart(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); // 月曜始まり
  return x;
}

export default async function StatsPage() {
  const posts = await readPosts();
  const now = new Date();
  const thisWeek = weekStart(now).getTime();
  const lastWeek = thisWeek - 7 * 86400000;

  const inRange = (iso: string, from: number, to: number) => {
    const t = new Date(iso).getTime();
    return t >= from && t < to;
  };

  const tagRows = (Object.keys(TAG_LABEL) as Tag[]).map((t) => {
    const all = posts.filter((p) => p.tags.includes(t));
    const tw = all.filter((p) => inRange(p.createdAt, thisWeek, Infinity)).length;
    const lw = all.filter((p) => inRange(p.createdAt, lastWeek, thisWeek)).length;
    return { tag: t, label: TAG_LABEL[t], thisWeek: tw, lastWeek: lw, total: all.length };
  });
  const catRows = (Object.keys(CATEGORY_LABEL) as Category[]).map((c) => ({
    label: CATEGORY_LABEL[c],
    n: posts.filter((p) => p.category === c).length,
  }));
  const schools = new Map<string, { total: number; watch: number }>();
  for (const p of posts) {
    if (!p.schoolCode) continue;
    const s = schools.get(p.schoolCode) ?? { total: 0, watch: 0 };
    s.total += 1;
    if (p.urgency !== "normal") s.watch += 1;
    schools.set(p.schoolCode, s);
  }
  const max = Math.max(1, ...tagRows.map((r) => r.total));

  return (
    <AdultShell current="stats">
      <h1 className="text-xl font-extrabold text-ink">傾向</h1>
      <p className="mt-1 text-xs text-ink-2">
        自動タグ別の件数。今週（月曜〜）と先週を比べて、増えているサインに気づくためのページです。
      </p>

      <section className="mt-6 overflow-hidden rounded-3xl bg-white">
        <table className="w-full text-sm">
          <thead className="bg-paper-2 text-xs text-ink-2">
            <tr>
              <th className="px-4 py-2 text-left font-bold">サイン</th>
              <th className="px-3 py-2 text-right font-bold">今週</th>
              <th className="px-3 py-2 text-right font-bold">先週</th>
              <th className="px-3 py-2 text-right font-bold">増減</th>
              <th className="px-3 py-2 text-right font-bold">累計</th>
              <th className="w-1/3 px-4 py-2 text-left font-bold">割合</th>
            </tr>
          </thead>
          <tbody>
            {tagRows.map((r) => {
              const diff = r.thisWeek - r.lastWeek;
              return (
                <tr key={r.tag} className="border-t border-paper-2">
                  <td className="px-4 py-2 font-bold text-ink">{r.label}</td>
                  <td className="px-3 py-2 text-right">{r.thisWeek}</td>
                  <td className="px-3 py-2 text-right">{r.lastWeek}</td>
                  <td className={`px-3 py-2 text-right font-bold ${diff > 0 ? "text-danger" : diff < 0 ? "text-leaf" : "text-ink-3"}`}>
                    {diff > 0 ? `+${diff}` : diff}
                  </td>
                  <td className="px-3 py-2 text-right">{r.total}</td>
                  <td className="px-4 py-2">
                    <div className="h-2 w-full rounded-full bg-paper-2">
                      <div className="h-2 rounded-full bg-sky" style={{ width: `${(r.total / max) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl bg-white p-5">
          <h2 className="text-sm font-extrabold text-ink">カテゴリ別（子どもが選んだもの）</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {catRows.map((c) => (
              <li key={c.label} className="flex justify-between border-b border-paper-2 py-1">
                <span>{c.label}</span>
                <span className="font-bold">{c.n}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-3xl bg-white p-5">
          <h2 className="text-sm font-extrabold text-ink">学校コード別（入力があったもの）</h2>
          {schools.size === 0 ? (
            <p className="mt-3 text-xs text-ink-3">学校コード付きの投稿はまだありません。</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {[...schools.entries()].map(([code, s]) => (
                <li key={code} className="flex justify-between border-b border-paper-2 py-1">
                  <span className="font-mono">{code}</span>
                  <span>
                    <span className="font-bold">{s.total}</span> 件（要注意以上 {s.watch}）
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdultShell>
  );
}
