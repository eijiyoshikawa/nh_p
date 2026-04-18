import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "ツール",
  description: `${site.name}の便利ツール一覧。学校検索・エリア情報などを提供します。`,
  alternates: { canonical: `${site.url}/tools/` },
};

const tools = [
  {
    slug: "school-map",
    title: "学校マップ（簡易版）",
    description: "枚方市の公立小中学校をエリアで絞り込める一覧ツール。",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "ツール" },
        ]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        ツール
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        枚方市の子育てに役立つ簡易ツールを順次追加していきます。
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/tools/${t.slug}/`}
              className="block rounded-xl border border-orange-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
            >
              <h2 className="text-base font-bold text-stone-900">{t.title}</h2>
              <p className="mt-2 text-sm text-stone-600">{t.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: `${site.url}/` },
              { name: "ツール", url: `${site.url}/tools/` },
            ])
          ),
        }}
      />
    </div>
  );
}
