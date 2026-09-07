import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/Icon";
import { model } from "@/lib/site";

export default function Model() {
  return (
    <section id="model" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading eyebrow={model.eyebrow} title={model.title} lead={model.lead} tone="mint" />
        </ScrollReveal>

        {/* equation */}
        <ScrollReveal delay={100} variant="zoom">
          <div className="mx-auto flex max-w-3xl flex-col items-stretch justify-center gap-3 text-center sm:flex-row sm:flex-wrap sm:items-center">
            <div className="rounded-3xl border-2 border-brand/30 bg-brand-soft px-6 py-5 transition hover:scale-[1.03]">
              <p className="text-xs font-bold text-brand">既存の仕組み</p>
              <p className="mt-1 text-xl font-extrabold text-ink">学童保育</p>
            </div>
            <span className="text-3xl font-extrabold text-ink-3">×</span>
            <div className="rounded-3xl border-2 border-coral/30 bg-coral-soft px-6 py-5 transition hover:scale-[1.03]">
              <p className="text-xs font-bold text-coral">既存の仕組み</p>
              <p className="mt-1 text-xl font-extrabold text-ink">子ども食堂</p>
            </div>
            <span className="text-3xl font-extrabold text-ink-3">=</span>
            <div className="rounded-3xl bg-ink px-6 py-5 text-white shadow-xl transition hover:scale-[1.03]">
              <p className="text-xs font-bold text-sun">第三の選択肢</p>
              <p className="mt-1 text-xl font-extrabold">新しい子ども食堂</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {model.pillars.map((p, i) => (
            <ScrollReveal key={p.label} delay={150 + i * 100} className="h-full">
              <div className="group lift flex h-full items-start gap-4 rounded-3xl border-2 border-ink/5 bg-white p-6">
                <IconBadge name={p.icon} tone={i === 0 ? "sun" : i === 1 ? "coral" : "brand"} />
                <div>
                  <p className="text-lg font-extrabold text-ink">{p.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{p.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-2">
            {model.note}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
