import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "利用規約",
  description: `${site.name}の利用規約。禁止事項、免責事項、著作権、準拠法について。`,
  alternates: { canonical: `${site.url}/terms/` },
};

const LAST_UPDATED = "2026年4月17日";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "利用規約" }]} />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        利用規約
      </h1>
      <p className="mt-2 text-sm text-stone-500">最終更新日: {LAST_UPDATED}</p>

      <section className="mt-8 space-y-4 text-sm leading-7 text-stone-700">
        <p>
          この利用規約（以下「本規約」といいます）は、{site.operator.name}（以下「当社」といいます）が運営する
          <strong>{site.name}</strong>
          （以下「本サイト」といいます）の利用条件を定めるものです。本サイトをご利用になる方（以下「利用者」といいます）は、本規約に同意したものとみなします。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">第1条（適用）</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本規約は、利用者と当社との間の本サイトの利用に関わる一切の関係に適用されます。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          第2条（掲載情報の取扱い）
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本サイトに掲載する情報は、掲載時点で可能な限り正確であるよう努めていますが、その完全性・正確性・有用性について保証するものではありません。最新・詳細な情報は、各記事末尾に記載の出典元（枚方市公式サイト等）で必ずご確認ください。
        </p>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          医療・防災など生命・身体に関わる内容については、記事を根拠に行動する前に必ず公的窓口（#8000、119、市公式など）にご確認ください。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          第3条（著作権・知的財産権）
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本サイトに掲載されているテキスト、画像、デザイン等の著作権は、当社または正当な権利者に帰属します。私的使用の範囲を超える利用（無断転載、改変、再配布等）は禁じます。
        </p>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          引用の際は、著作権法第32条に基づき、出典を明記し、引用範囲を明瞭にしたうえでご利用ください。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">第4条（禁止事項）</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          利用者は、本サイトの利用にあたり、以下の行為を行ってはなりません。
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-stone-700">
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>当社、他の利用者、または第三者の知的財産権、プライバシー、名誉その他の権利を侵害する行為</li>
          <li>本サイトの運営を妨害するおそれのある行為（過度なアクセス、クローリング等を含む）</li>
          <li>本サイトの掲載情報を、許諾なく商用目的で複製・再配布する行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">第5条（免責事項）</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本サイトの情報を利用することで生じた損害について、当社は一切の責任を負いません。施設の営業時間・料金・サービス内容等は変更される場合がありますので、ご来訪前に各施設の公式情報をご確認ください。
        </p>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本サイトからリンクする外部サイトの内容については、当社は責任を負いません。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">第6条（広告・PR表記）</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          当社が第三者から対価を得て掲載する記事には、記事冒頭に「PR」「広告」等の表記を行います。アフィリエイトリンクを含む記事にも同様の表示を行います。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">第7条（リンク）</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本サイトへのリンクは原則自由です。ただし、公序良俗に反するサイトや、誤解を招くおそれのある方法でのリンクはお断りします。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">第8条（規約の変更）</h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          当社は、必要と判断した場合、利用者への事前通知なく本規約を変更できるものとします。変更後の本規約は、本サイトに掲載された時点から効力を生じるものとします。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          第9条（準拠法・裁判管轄）
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本規約の解釈にあたっては、日本法を準拠法とします。本サイトに関して紛争が生じた場合には、大阪地方裁判所を専属的合意管轄裁判所とします。
        </p>
      </section>

      <p className="mt-10 text-sm text-stone-500">
        制定日・最終更新日: {LAST_UPDATED}
      </p>
    </div>
  );
}
