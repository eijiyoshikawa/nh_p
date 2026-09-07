import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Cta from "@/components/home/Cta";
import Icon, { IconBadge } from "@/components/Icon";
import { joinDetails } from "@/lib/site";

export const metadata: Metadata = {
  title: "関わる",
  description:
    "子ども・保護者、子ども食堂の運営者、飲食店・企業、行政・団体、個人サポーター。立場ごとの関わり方をご案内します。",
};

const tones = {
  sun: "bg-sun-soft border-sun/50",
  coral: "bg-coral-soft border-coral/50",
  brand: "bg-brand-soft border-brand/40",
  mint: "bg-mint-soft border-mint/50",
};

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow="JOIN"
        title="関わる"
        lead="立場は問いません。それぞれの「したい」に合わせた関わり方があります。"
      />

      <nav className="sticky top-14 z-30 border-b border-ink/5 bg-paper/90 backdrop-blur" aria-label="対象別">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {joinDetails.map((j) => (
            <Link
              key={j.id}
              href={`#${j.id}`}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold text-ink-2 hover:bg-brand-soft hover:text-brand"
            >
              <span className="inline-flex items-center gap-1.5">
                <Icon name={j.icon} size={14} />
                {j.title.replace("の方へ", "")}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-14 sm:px-6 md:py-20">
        {joinDetails.map((j, i) => (
          <ScrollReveal key={j.id} delay={i * 60} variant={i % 2 === 0 ? "left" : "right"}>
            <section
              id={j.id}
              className={`grid gap-8 rounded-[2rem] border-2 p-7 md:grid-cols-[1.2fr_1fr] md:p-10 ${tones[j.tone]}`}
            >
              <div>
                <IconBadge name={j.icon} tone={j.tone} size="lg" className="bg-white" />
                <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">{j.title}</h2>
                <p className="mt-2 text-base font-bold text-ink">{j.lead}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-2">{j.body}</p>
                <div className="mt-6">
                  <Button href={j.cta.href} external={"external" in j.cta && j.cta.external}>
                    {j.cta.label} <Icon name="arrow" size={16} />
                  </Button>
                </div>
              </div>
              <ol className="space-y-3 self-center rounded-3xl bg-white/80 p-6">
                <p className="text-xs font-bold tracking-[0.2em] text-ink-3">流れ</p>
                {j.steps.map((s, n) => (
                  <li key={s} className="flex gap-3 text-sm text-ink">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                      {n + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </section>
          </ScrollReveal>
        ))}
      </div>
      <Cta />
    </>
  );
}
