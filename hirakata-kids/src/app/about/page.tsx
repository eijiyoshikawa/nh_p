import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "このサイトについて",
  description: `${site.name}の運営方針・編集ポリシー・運営団体のご紹介。`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900 md:text-3xl">
        このサイトについて
      </h1>
      <section className="mt-6 space-y-4 text-sm leading-7 text-stone-700">
        <p>
          <strong>{site.name}</strong>は、枚方市に住む4〜15歳のお子様がいるご家庭向けの地域情報メディアです。
          運営は<a href={site.operator.url} target="_blank" rel="noreferrer" className="text-[#F97316] hover:underline">{site.operator.name}</a>が行っています。
        </p>
        <p>
          記事はすべて枚方市公式情報・国や府の公開データ・独自取材・提携コンテンツなど、
          一次情報をベースに作成しています。転載ではなく独自の視点での解説・比較・まとめに努めています。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">編集ポリシー</h2>
        <ul className="mt-3 list-disc pl-5 text-sm leading-7 text-stone-700">
          <li>一次情報（枚方市公式・政府統計・独自取材）に基づく執筆</li>
          <li>出典の明示と最終更新日の表示</li>
          <li>読者利益を最優先し、広告記事は「PR」と明示</li>
          <li>誤情報の指摘は速やかに検証・修正</li>
        </ul>
      </section>
    </div>
  );
}
