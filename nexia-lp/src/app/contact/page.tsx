import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "./ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { org } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "連携・参加・取材のご相談、その他お問い合わせはこちらから。LINE公式アカウントでも受け付けています。",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  return (
    <>
      <PageHeader
        eyebrow="CONTACT"
        title="お問い合わせ"
        lead="立場は問いません。「ちょっと話を聞きたい」「枚方のことでひとこと言いたい」からで大丈夫です。"
      />
      <section className="px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border-2 border-ink/5 bg-white p-6 sm:p-8">
            <ContactForm defaultType={type} />
          </div>
          <aside className="space-y-4">
            <a
              href={org.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lift block rounded-3xl bg-[#06C755] p-6 text-white"
            >
              <p className="text-xs font-bold tracking-widest text-white/80">LINE</p>
              <p className="mt-1 text-lg font-extrabold">LINE公式アカウントで話す</p>
              <p className="mt-2 text-xs text-white/85">
                見学・体験会・募集情報もLINEでお知らせします。友だち追加はこちら →
              </p>
            </a>
            <div className="rounded-3xl border-2 border-ink/5 bg-white p-6">
              <p className="text-xs font-bold tracking-widest text-ink-3">MAIL</p>
              <a href={`mailto:${org.email}`} className="mt-1 block font-bold text-brand hover:underline">
                {org.email}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-ink-2">
                取材・メディアの方もこちらからご連絡ください。通常3営業日以内に返信します。
              </p>
            </div>
            <div className="rounded-3xl border-2 border-ink/5 bg-white p-6">
              <p className="text-xs font-bold tracking-widest text-ink-3">SNS</p>
              <p className="mt-1 text-sm font-bold text-ink">活動の様子はSNSで発信しています</p>
              <SocialLinks className="mt-3" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
