import Link from "next/link";
import { categories } from "@/lib/categories";
import { getAllArticles, getArticleUrl } from "@/lib/content";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { site } from "@/lib/site";
import { getTag } from "@/lib/tags";
import type { Article } from "@/lib/types";

function pickSeasonalPill(month: number): { label: string; href: string } {
  // Month-driven hero-pill rotation pointing readers at the most
  // relevant feature/category for the time of year.
  if (month === 12 || month === 1 || month === 2) {
    return { label: "冬休み・入学準備シーズン", href: "/feature/nyugaku-junbi-2026/" };
  }
  if (month === 3 || month === 4) {
    return { label: "新学期・お花見シーズン", href: "/outings/parks/" };
  }
  if (month === 5) {
    return { label: "GW・家族でおでかけ", href: "/outings/events/" };
  }
  if (month === 6 || month === 7) {
    return { label: "梅雨・夏休み準備", href: "/outings/rainy-day/" };
  }
  if (month === 8) {
    return { label: "夏休み真っ最中", href: "/feature/natsuyasumi-2026/" };
  }
  if (month === 9 || month === 10) {
    return { label: "防災月間・運動会", href: "/feature/bousai-kihon/" };
  }
  return { label: "クリスマス・冬支度", href: "/community/events/" };
}

export default async function HomePage() {
  const articles = await getAllArticles();
  const latest = articles.slice(0, 6);
  const featured = articles[0];
  const byCategory = new Map<string, Article[]>();
  const countByCategory = new Map<string, number>();
  const tagCounts = new Map<string, number>();
  for (const a of articles) {
    countByCategory.set(a.category, (countByCategory.get(a.category) ?? 0) + 1);
    const list = byCategory.get(a.category) ?? [];
    if (list.length < 3) list.push(a);
    byCategory.set(a.category, list);
    for (const t of [...(a.themeTags ?? []), ...(a.ageTags ?? [])]) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    }
  }
  const popularTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([slug, count]) => ({ slug, count, tag: getTag(slug) }))
    .filter((x): x is { slug: string; count: number; tag: NonNullable<ReturnType<typeof getTag>> } => !!x.tag);

  const month = new Date().getMonth() + 1;
  const seasonalPill = pickSeasonalPill(month);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-[#FFFBF5] to-white">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-32 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl text-center md:text-left">
            <p className="text-xs font-semibold tracking-widest text-orange-600">
              HIRAKIDS / ひらかた子育てナビ
            </p>
            <Link
              href={seasonalPill.href}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-semibold text-orange-700 backdrop-blur transition hover:bg-orange-50"
            >
              <span aria-hidden>🟠</span>
              {seasonalPill.label}
            </Link>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-stone-900 md:text-5xl">
              枚方市の子育てを、
              <br className="md:hidden" />
              もっと楽しく、ちゃんと。
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-stone-600 md:mx-0 md:text-base">
              {site.description}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/outings/"
                className="rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea6a0e]"
              >
                おでかけ記事を見る
              </Link>
              <Link
                href="/health/"
                className="rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
              >
                医療・健康記事
              </Link>
              <Link
                href="/search/"
                className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
              >
                記事を検索
              </Link>
            </div>
          </div>

          {featured && (
            <Link
              href={getArticleUrl(featured)}
              className="mt-10 block rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:mt-12 md:p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-orange-600">
                    PICK UP
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-stone-900 md:text-xl">
                    {featured.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-stone-600">
                    {featured.description}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-[#F97316]">
                  詳しく読む →
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-stone-900">カテゴリから探す</h2>
          <Link
            href="/area/"
            className="text-xs font-semibold text-orange-700 hover:underline"
          >
            エリアから探す →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard
              key={c.slug}
              category={c}
              articleCount={countByCategory.get(c.slug) ?? 0}
            />
          ))}
        </div>
      </section>

      {popularTags.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-4 pt-2">
          <h2 className="text-sm font-semibold text-stone-700">よく読まれているタグ</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-xs">
            {popularTags.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/tag/${t.slug}/`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-3 py-1 text-orange-700 transition hover:bg-orange-50"
                >
                  {t.tag.label}
                  <span className="text-[10px] text-stone-500">({t.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-stone-900">新着記事</h2>
        {latest.length === 0 ? (
          <p className="mt-4 text-sm text-stone-600">
            記事を準備中です。最初の記事がもうすぐ公開されます。
          </p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-orange-50/60 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold text-stone-900">カテゴリ別ピックアップ</h2>
          <div className="mt-6 space-y-10">
            {categories.map((c) => {
              const list = byCategory.get(c.slug) ?? [];
              if (list.length === 0) return null;
              return (
                <div key={c.slug}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-stone-900">
                      {c.label}
                    </h3>
                    <Link
                      href={`/${c.slug}/`}
                      className="text-xs font-semibold text-orange-700 hover:underline"
                    >
                      {c.label}の一覧 →
                    </Link>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((a) => (
                      <ArticleCard key={a.slug} article={a} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
