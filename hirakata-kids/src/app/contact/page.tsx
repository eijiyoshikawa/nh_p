import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${site.name}への取材・PR・記事内容の指摘・掲載情報の訂正依頼等のお問い合わせ窓口。`,
  alternates: { canonical: `${site.url}/contact/` },
};

type ContactReason = {
  heading: string;
  lede: string;
  details: string[];
};

const reasons: ContactReason[] = [
  {
    heading: "記事内容の指摘・情報訂正のご依頼",
    lede: "記載事項の誤りや古くなった情報にお気づきの場合、ご連絡をお願いいたします。",
    details: [
      "該当記事のURL",
      "訂正が必要な箇所",
      "正しい情報・参考URL（可能な範囲で）",
    ],
  },
  {
    heading: "取材・PR記事・施設掲載のご依頼",
    lede: "枚方市内の子育て関連施設・教室・イベントについて取材を承ります。PR記事の場合は冒頭に広告表記を行います。",
    details: [
      "施設・団体名",
      "所在地 / 対象年齢 / サービス内容",
      "希望する掲載内容（記事 / インタビュー / 写真等）",
    ],
  },
  {
    heading: "ボランティア・寄稿のご相談",
    lede: "枚方市の子育て情報を一緒に発信してくださる執筆者・監修者を募集しています。",
    details: [
      "ご自身または所属団体の概要",
      "得意分野（例：子育て支援、医療、教育）",
      "執筆可能ジャンル",
    ],
  },
  {
    heading: "提携・業務委託のご相談",
    lede: "他メディア・自治体・NPO様との相互リンクや共同企画のご相談もお気軽にどうぞ。",
    details: [
      "団体名 / サイトURL",
      "ご提案内容",
    ],
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "お問い合わせ" }]}
      />
      <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
        お問い合わせ
      </h1>
      <p className="mt-3 text-sm leading-7 text-stone-700">
        <strong>{site.name}</strong>（運営：{site.operator.name}）では、記事内容のご指摘・取材依頼・PR記事・ボランティア応募など、さまざまなお問い合わせをお受けしています。
      </p>

      <section className="mt-10 rounded-xl border border-orange-100 bg-white p-6">
        <h2 className="text-lg font-bold text-stone-900">
          連絡窓口
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
          <li>
            <span className="inline-block w-28 font-semibold text-stone-900">
              運営団体サイト：
            </span>
            <a
              href={site.operator.url}
              target="_blank"
              rel="noreferrer"
              className="text-[#F97316] hover:underline"
            >
              {site.operator.url}
            </a>
            <span className="block pl-0 text-xs text-stone-500 md:inline md:pl-2">
              （LINE公式アカウント経由でもお問い合わせいただけます）
            </span>
          </li>
          <li>
            <span className="inline-block w-28 font-semibold text-stone-900">
              お問い合わせ：
            </span>
            運営団体サイト記載のメールフォーム・LINE窓口をご利用ください。
          </li>
        </ul>
        <p className="mt-4 text-xs text-stone-500">
          本サイト内の専用フォームは準備中です。お急ぎのご連絡は運営団体サイトまでお願いいたします。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">ご連絡時にお伝えいただきたいこと</h2>
        <div className="mt-4 space-y-5">
          {reasons.map((r) => (
            <div
              key={r.heading}
              className="rounded-lg border border-stone-200 bg-white p-5"
            >
              <h3 className="text-base font-semibold text-stone-900">
                {r.heading}
              </h3>
              <p className="mt-2 text-sm leading-7 text-stone-700">{r.lede}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-600">
                {r.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">
          対応時間と返信の目安
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          当メディアはボランティア運営のため、原則3〜5営業日以内に返信いたします。緊急性の高い内容（個人情報・名誉毀損に関するご指摘等）は、運営団体サイトの連絡窓口から「緊急」と明記のうえご連絡ください。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900">
          個人情報の取扱い
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          お問い合わせ時に取得した個人情報は、
          <Link href="/privacy/" className="text-[#F97316] hover:underline">
            プライバシーポリシー
          </Link>
          に従って管理し、お問い合わせ対応以外の目的には使用しません。
        </p>
      </section>
    </div>
  );
}
