import type { Metadata } from "next";
import Link from "next/link";
import { ageTags, themeTags } from "@/lib/tags";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "タグ一覧",
  description: "年齢・テーマから枚方市の子育て情報を探せます。",
  alternates: { canonical: `${site.url}/tag/` },
};

export default function TagIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "タグ" }]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        タグから探す
      </h1>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-stone-800">年齢で探す</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {ageTags.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/tag/${t.slug}/`}
                className="inline-flex items-center rounded-full border border-orange-200 bg-white px-3 py-1 text-sm text-orange-700 hover:bg-orange-50"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-stone-800">テーマで探す</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {themeTags.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/tag/${t.slug}/`}
                className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-700 hover:bg-orange-50"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: `${site.url}/` },
              { name: "タグ", url: `${site.url}/tag/` },
            ])
          ),
        }}
      />
    </div>
  );
}
