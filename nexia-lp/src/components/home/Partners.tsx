import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { partners } from "@/lib/site";

export default function Partners() {
  return (
    <section id="partners" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading eyebrow={partners.eyebrow} title={partners.title} lead={partners.lead} />
        </ScrollReveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partners.categories.map((c, i) => (
            <ScrollReveal key={c.label} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border-2 border-ink/5 bg-white p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-paper-2 text-2xl">
                  {c.emoji}
                </span>
                <div>
                  <p className="font-extrabold text-ink">{c.label}</p>
                  <p className="text-xs text-ink-2">{c.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={300}>
          <div className="mt-8 rounded-2xl border-2 border-dashed border-brand/30 bg-brand-soft/40 p-6 text-center">
            <p className="text-sm font-bold text-brand">連携先ロゴ掲載スペース</p>
            <p className="mt-1 text-xs text-ink-2">{partners.note}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
