import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { org } from "@/lib/site";

export const metadata: Metadata = { title: "プライバシーポリシー" };

const sections = [
  {
    h: "1. 個人情報の取得",
    p: "当団体は、お問い合わせフォーム、LINE公式アカウント、イベント申込等を通じて、氏名・連絡先・所属などの個人情報を取得することがあります。",
  },
  {
    h: "2. 利用目的",
    p: "取得した個人情報は、お問い合わせへの回答、活動のご案内、連携・協働に関する連絡、統計的な分析（個人を特定しない形）に利用します。",
  },
  {
    h: "3. 第三者提供",
    p: "法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。",
  },
  {
    h: "4. 安全管理",
    p: "個人情報の漏えい・滅失・毀損を防止するため、適切な安全管理措置を講じます。",
  },
  {
    h: "5. 開示・訂正・削除",
    p: "ご本人からの開示・訂正・削除のご請求には、本人確認のうえ速やかに対応します。",
  },
  {
    h: "6. お問い合わせ窓口",
    p: `${org.name}（${org.email}）`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="PRIVACY" title="プライバシーポリシー" />
      <section className="px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-lg font-extrabold text-ink">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.p}</p>
            </div>
          ))}
          <p className="text-xs text-ink-3">制定日：2026年9月7日（設立準備室）</p>
        </div>
      </section>
    </>
  );
}
