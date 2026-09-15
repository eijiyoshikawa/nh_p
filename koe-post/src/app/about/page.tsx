import type { Metadata } from "next";
import Link from "next/link";
import KidShell from "@/components/KidShell";
import { app } from "@/lib/content";

export const metadata: Metadata = { title: "おとなのかたへ" };

const rows: [string, string][] = [
  ["集めるもの", "書かれた本文、選んだカテゴリ（家／学校／友だち／自分／してほしいこと）、見てほしい相手、学年帯（任意）、学校コード（任意）、投稿日時"],
  ["集めないもの", "名前、メールアドレス、電話番号、住所、端末やアカウントの情報。IPアドレスも保存しません（連投防止のため、その日限りの暗号化した値を1日だけ保持し、投稿とは結びつけません）"],
  ["誰が読むか", `${app.operator}の担当者。学校の先生に届けるかは、投稿時の「見てほしい相手」と内容に応じて担当者が判断します`],
  ["子どもは読めるか", "読めません。投稿の一覧・検索・自分の投稿履歴は、子ども側の画面には存在しません"],
  ["危険なサイン", "本文に自傷・虐待・いじめ・不登校などのサインがあると、担当者の画面で最優先に表示されます。緊急の場合は関係機関につなぎます"],
  ["保存期間", "対応が終わった投稿は一定期間後に削除します（期間は運用開始時に定めて公開します）"],
];

export default function AboutPage() {
  return (
    <KidShell back={{ href: "/", label: "もどる" }}>
      <div className="animate-fade-in-up mt-4">
        <p className="text-xs font-bold tracking-widest text-sky">FOR ADULTS</p>
        <h1 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">保護者・先生の皆さまへ</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-2">
          「{app.name}」は、子どもが家や学校で困っていること・してほしいことを、名前を出さずに書ける投稿箱です。
          子どもが安心して書けるよう、次のルールで運営します。
        </p>
        <dl className="mt-6 overflow-hidden rounded-3xl border-2 border-paper-2 bg-white">
          {rows.map(([k, v]) => (
            <div key={k} className="grid border-b border-paper-2 last:border-0 sm:grid-cols-[130px_1fr]">
              <dt className="bg-paper-2 px-4 py-3 text-xs font-bold text-ink-2">{k}</dt>
              <dd className="px-4 py-3 text-sm leading-relaxed text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-ink-2">
          学校での配布（QRコード・学校コードの発行）や、先生向けの閲覧権限については、
          <a href={app.publicSite + "/contact?type=gov"} className="font-bold text-sky underline" target="_blank" rel="noopener noreferrer">
            {app.operator}
          </a>
          までお問い合わせください。
        </p>
        <p className="mt-8 text-xs text-ink-3">
          担当者の方は <Link href="/adults" className="underline">こちら</Link>
        </p>
      </div>
    </KidShell>
  );
}
