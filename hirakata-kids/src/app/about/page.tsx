import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "このサイトについて",
  description: `${site.name}の運営方針・編集ポリシー・運営団体のご紹介。`,
  alternates: { canonical: `${site.url}/about/` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "このサイトについて" }]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        このサイトについて
      </h1>

      <section className="mt-6 space-y-4 text-sm leading-7 text-stone-700">
        <p>
          <strong>{site.name}</strong>
          は、枚方市に住む4〜15歳のお子様がいるご家庭向けの地域情報メディアです。
          運営は
          <a
            href={site.operator.url}
            target="_blank"
            rel="noreferrer"
            className="text-[#F97316] hover:underline"
          >
            {site.operator.name}
          </a>
          が行っています。
        </p>
        <p>
          記事はすべて枚方市公式情報・国や府の公開データ・独自取材・提携コンテンツなど、一次情報をベースに作成しています。転載ではなく独自の視点での解説・比較・まとめに努めています。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">編集ポリシー</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-stone-700">
          <li>一次情報（枚方市公式・政府統計・独自取材）に基づく執筆</li>
          <li>出典の明示と最終更新日の表示</li>
          <li>読者利益を最優先し、広告記事は「PR」と明示</li>
          <li>誤情報の指摘は速やかに検証・修正</li>
          <li>医療・防災は必ず公的窓口（#8000、119、市公式）へ誘導</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">ファクトチェックの流れ</h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-7 text-stone-700">
          <li>記事テーマごとに公的情報（市・府・国）を一次ソースに指定</li>
          <li>執筆時に出典URL・発行年月を明記</li>
          <li>公開前に担当デスクが事実関係をレビュー</li>
          <li>公開後も年1回以上の定点更新で情報鮮度を維持</li>
          <li>読者からの指摘は
            <Link href="/contact/" className="text-[#F97316] hover:underline">
              お問い合わせ
            </Link>
            より受付、確認後に速やかに訂正
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">広告・PR表記の方針</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          当社または第三者からの対価提供がある記事には、記事冒頭に
          <strong>「PR」「広告」「提携」</strong>
          いずれかの表記を行います。アフィリエイトリンクを含む記事も同様に明示します。対価提供の有無に関わらず、編集方針は読者の利益を最優先します。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">著者・編集体制</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          編集部・医療デスク・教育デスクの体制で執筆しています。各著者のプロフィールは
          <Link href="/author/" className="text-[#F97316] hover:underline">
            著者一覧
          </Link>
          をご覧ください。
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-orange-100 bg-white p-5">
        <h2 className="text-base font-bold text-stone-900">お問い合わせ</h2>
        <p className="mt-2 text-sm text-stone-700">
          記事の誤りご指摘・取材ご依頼・提携のご相談は
          <Link href="/contact/" className="text-[#F97316] hover:underline">
            お問い合わせフォーム
          </Link>
          よりお寄せください。
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: `${site.url}/` },
              { name: "このサイトについて", url: `${site.url}/about/` },
            ])
          ),
        }}
      />
    </div>
  );
}
