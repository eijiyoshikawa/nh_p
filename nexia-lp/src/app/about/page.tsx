import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { LogoMark } from "@/components/Logo";
import Cta from "@/components/home/Cta";
import { org, nameOrigin, message, history } from "@/lib/site";

export const metadata: Metadata = {
  title: "団体概要",
  description: `${org.name}の団体概要、名前に込めた想い、代表メッセージ、沿革。`,
};

export default function AboutPage() {
  const rows: [string, string][] = [
    ["団体名", org.name],
    ["英字表記", org.en],
    ["設立", org.founded],
    ["代表者", `${org.representativeTitle}　${org.representative}（${org.representativeEn}）`],
    ["所在地", org.address],
    ["活動地域", org.area],
    ["連絡先", org.email],
    ["設立準備", org.operator.replace("設立準備：", "")],
  ];

  return (
    <>
      <PageHeader eyebrow="ABOUT" title="団体概要" lead={org.purpose} />

      {/* name origin */}
      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionHeading eyebrow="NAME" title="名前に込めた想い" />
          </ScrollReveal>
          <div className="grid gap-4 md:grid-cols-3">
            {nameOrigin.map((n, i) => (
              <ScrollReveal key={n.word} delay={i * 100}>
                <div className="h-full rounded-3xl border-2 border-ink/5 bg-white p-6 text-center">
                  <p className="text-xs font-bold tracking-[0.25em] text-ink-3">{n.en}</p>
                  <p className="mt-1 text-2xl font-extrabold text-brand">{n.word}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{n.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={300}>
            <div className="mt-8 flex items-center justify-center gap-4 rounded-3xl bg-paper-2 p-6">
              <LogoMark size={80} />
              <p className="text-sm leading-relaxed text-ink-2">
                ロゴは、<span className="font-bold text-ink">地域の手</span>が<span className="font-bold text-ink">子どもという種</span>を包み、
                <span className="font-bold text-ink">未来の芽</span>が伸びていく姿。ゴールドの輪は、つながりの循環を表しています。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* message */}
      <section className="bg-ink px-4 py-16 text-white sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-[0.25em] text-sun">MESSAGE</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">{message.title}</h2>
            <div className="mt-8 space-y-5 text-sm leading-[1.9] text-white/85 sm:text-base">
              {message.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-8 text-right text-sm font-bold text-white/70">{message.signature}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* overview */}
      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionHeading eyebrow="OVERVIEW" title="法人概要" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <dl className="overflow-hidden rounded-3xl border-2 border-ink/5 bg-white">
              {rows.map(([k, v]) => (
                <div key={k} className="grid border-b border-ink/5 last:border-0 sm:grid-cols-[160px_1fr]">
                  <dt className="bg-paper-2 px-5 py-3 text-xs font-bold text-ink-2 sm:py-4">{k}</dt>
                  <dd className="px-5 py-3 text-sm text-ink sm:py-4">{v}</dd>
                </div>
              ))}
              <div className="grid border-t border-ink/5 sm:grid-cols-[160px_1fr]">
                <dt className="bg-paper-2 px-5 py-3 text-xs font-bold text-ink-2 sm:py-4">事業内容</dt>
                <dd className="px-5 py-3 sm:py-4">
                  <ul className="list-disc space-y-1 pl-5 text-sm text-ink">
                    {org.activities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* history */}
      <section className="bg-paper-2 px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <SectionHeading eyebrow="HISTORY" title="沿革" />
          </ScrollReveal>
          <ol className="relative pl-8">
            <span aria-hidden className="absolute bottom-0 left-0 top-1 w-[2px] bg-brand/25" />
            {history.map((h, i) => (
              <ScrollReveal key={h.date} delay={i * 100} as="li" className="relative pb-8 last:pb-0">
                <div>
                  <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-paper-2 bg-brand" />
                  <p className="text-sm font-extrabold text-brand">{h.date}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink">{h.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>
      <Cta />
    </>
  );
}
