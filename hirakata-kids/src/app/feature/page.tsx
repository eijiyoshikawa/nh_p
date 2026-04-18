import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { features } from "@/lib/features";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "特集シリーズ",
  description: `${site.name}の特集記事一覧。テーマ横断で記事をまとめて読めます。`,
  alternates: { canonical: `${site.url}/feature/` },
};

export default function FeatureIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "特集" },
        ]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        特集シリーズ
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        入学準備・夏休み・防災など、テーマ横断で記事をまとめた特集一覧です。
      </p>

      {features.length === 0 ? (
        <p className="mt-8 text-sm text-stone-600">特集を準備中です。</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f.slug}>
              <Link
                href={`/feature/${f.slug}/`}
                className="block rounded-xl border border-orange-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
              >
                <h2 className="text-base font-bold text-stone-900">
                  {f.title}
                </h2>
                <p className="mt-2 text-sm text-stone-600">{f.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
