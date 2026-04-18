import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PopBackground } from "@/components/ui/PopBackground";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "メルマガ登録",
  description: `${site.name}のメールマガジン登録ページ。枚方市の子育て情報・新着記事・季節イベントを週1回お届けします。`,
  alternates: { canonical: `${site.url}/newsletter/` },
};

const benefits = [
  {
    icon: "📨",
    title: "週1回お届け",
    text: "新着記事・季節のおでかけ・防災や医療の注意点を、コンパクトにまとめて配信します。",
  },
  {
    icon: "🎯",
    title: "枚方市に特化",
    text: "市公式発信や大阪府のオープンデータを起点にした、地域密着の内容だけ。",
  },
  {
    icon: "🎁",
    title: "登録者向けプレビュー",
    text: "特集記事の一部を公開前にご覧いただける、登録者限定のプレビューコーナーあり。",
  },
  {
    icon: "🔐",
    title: "いつでも解除OK",
    text: "メール末尾のリンクからワンクリックで配信停止できます。",
  },
];

export default function NewsletterPage() {
  return (
    <div>
      <PopBackground className="bg-gradient-to-b from-orange-50 via-[#FFFBF5] to-white">
        <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
          <Breadcrumb
            items={[
              { label: "ホーム", href: "/" },
              { label: "メルマガ登録" },
            ]}
          />
          <div className="mt-6 text-center md:text-left">
            <p className="text-xs font-semibold tracking-widest text-orange-600">
              HIRAKIDS NEWSLETTER
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-stone-900 md:text-5xl">
              枚方の子育て、
              <br className="md:hidden" />
              週1回のダイジェストで。
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-700 md:mx-0 md:text-base">
              新着記事・季節のおでかけ・防災や医療の注意点を、編集部がまとめて毎週お届けします。登録は無料、いつでも配信停止できます。
            </p>

            <div className="mt-8 max-w-xl md:max-w-2xl">
              <NewsletterForm source="newsletter-page" variant="hero" />
              <p className="mt-3 text-xs text-stone-500">
                入力いただいたメールアドレスは配信目的のみに使用します。詳細は
                <Link
                  href="/privacy/"
                  className="text-[#F97316] hover:underline"
                >
                  プライバシーポリシー
                </Link>
                をご確認ください。
              </p>
            </div>
          </div>
        </div>
      </PopBackground>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-xl font-bold text-stone-900">
          メルマガで届くもの
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-xl border border-orange-100 bg-white p-5"
            >
              <span aria-hidden className="shrink-0 text-3xl">
                {b.icon}
              </span>
              <div>
                <p className="text-base font-bold text-stone-900">{b.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {b.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-orange-50/60 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-bold text-stone-900">
            よくある質問
          </h2>
          <dl className="mt-6 space-y-4 text-sm leading-7 text-stone-700">
            <div className="rounded-xl bg-white p-5">
              <dt className="font-bold text-stone-900">
                Q. 費用はかかりますか？
              </dt>
              <dd className="mt-2">
                完全無料です。登録・購読・配信停止いずれも費用はかかりません。
              </dd>
            </div>
            <div className="rounded-xl bg-white p-5">
              <dt className="font-bold text-stone-900">
                Q. どれくらいの頻度で届きますか？
              </dt>
              <dd className="mt-2">
                基本は週1回（毎週金曜の朝）です。季節の節目やイベント直前には号外をお送りすることがあります。
              </dd>
            </div>
            <div className="rounded-xl bg-white p-5">
              <dt className="font-bold text-stone-900">
                Q. 広告メールは届きますか？
              </dt>
              <dd className="mt-2">
                編集部からのみの配信で、提携企業からの直接送信はありません。記事中に広告が含まれる場合は必ず「PR」「広告」表記を行います。
              </dd>
            </div>
            <div className="rounded-xl bg-white p-5">
              <dt className="font-bold text-stone-900">
                Q. 解除したいときは？
              </dt>
              <dd className="mt-2">
                各メール末尾の「配信停止」リンクをクリックするだけで完了します。再登録もいつでも可能です。
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: `${site.url}/` },
              { name: "メルマガ登録", url: `${site.url}/newsletter/` },
            ])
          ),
        }}
      />
    </div>
  );
}
