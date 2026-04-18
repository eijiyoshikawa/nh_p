import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${site.name}のプライバシーポリシー。個人情報の取扱い、アクセス解析、Cookieの利用、情報開示請求について。`,
  alternates: { canonical: `${site.url}/privacy/` },
};

const LAST_UPDATED = "2026年4月17日";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "プライバシーポリシー" }]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        プライバシーポリシー
      </h1>
      <p className="mt-2 text-sm text-stone-500">最終更新日: {LAST_UPDATED}</p>

      <section className="mt-8 space-y-4 text-sm leading-7 text-stone-700">
        <p>
          {site.operator.name}（以下「当法人」といいます）は、当法人が運営する
          <strong>{site.name}</strong>
          （以下「本サイト」といいます）における個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          1. 運営者
        </h2>
        <ul className="mt-3 space-y-1 text-sm leading-7 text-stone-700">
          <li>団体名：{site.operator.name}</li>
          <li>
            公式サイト：
            <a
              href={site.operator.url}
              target="_blank"
              rel="noreferrer"
              className="text-[#F97316] hover:underline"
            >
              {site.operator.url}
            </a>
          </li>
          <li>メディア名：{site.name}（略称 {site.shortName}）</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          2. 取得する情報
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本サイトでは、以下の情報を取得することがあります。
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-stone-700">
          <li>お問い合わせフォームから送信された情報（氏名、メールアドレス、お問い合わせ内容等）</li>
          <li>アクセスログ（IPアドレス、ブラウザ種別、参照元URL、アクセス日時等）</li>
          <li>アクセス解析ツールが自動取得する Cookie・端末情報</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          3. 利用目的
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-stone-700">
          <li>お問い合わせへの対応</li>
          <li>本サイトの利用状況の分析・改善</li>
          <li>不正アクセス等のトラブル防止</li>
          <li>法令等に基づく対応</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          4. 第三者提供
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          当法人は、法令で認められる場合を除き、ご本人の同意なく取得した個人情報を第三者に提供しません。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          5. アクセス解析・Cookie
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本サイトは、利用状況の分析のために Google Analytics 等のアクセス解析ツールを使用する場合があります。これらのツールは Cookie を用いてデータを収集します。Cookie は個人を特定できる情報を含まず、収集されたデータは各ツール提供元のプライバシーポリシーに従って管理されます。ブラウザ設定により Cookie の受信を拒否することも可能ですが、一部の機能が利用できなくなる場合があります。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          6. 外部リンク
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本サイトからリンクされた外部サイトにおける個人情報の取扱いについて、当法人は責任を負いません。リンク先サイトのプライバシーポリシーをご確認ください。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          7. 個人情報の開示・訂正・削除
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          ご本人からの個人情報の開示、訂正、利用停止、削除のご請求については、第8項のお問い合わせ窓口よりご連絡ください。ご本人確認のうえ、法令に従って対応いたします。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          8. お問い合わせ窓口
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          本ポリシーおよび個人情報の取扱いに関するお問い合わせは、
          <Link href="/contact/" className="text-[#F97316] hover:underline">
            お問い合わせページ
          </Link>
          よりご連絡ください。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">
          9. 本ポリシーの変更
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          当法人は、必要に応じて本ポリシーを変更することがあります。変更後の本ポリシーは、本サイトに掲載された時点から効力を生じるものとします。
        </p>
      </section>

      <p className="mt-10 text-sm text-stone-500">
        制定日・最終更新日: {LAST_UPDATED}
      </p>
    </div>
  );
}
