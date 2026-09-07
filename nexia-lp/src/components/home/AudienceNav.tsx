import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { audiences } from "@/lib/site";

const toneBg = {
  sun: "bg-sun-soft",
  coral: "bg-coral-soft",
  brand: "bg-brand-soft",
  mint: "bg-mint-soft",
};

export default function AudienceNav() {
  return (
    <section id="audiences" className="px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-center text-xs font-bold tracking-[0.25em] text-brand">FOR YOU</p>
          <h2 className="mt-2 text-center text-2xl font-extrabold text-ink sm:text-3xl">
            あなたは、どの立場ですか？
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map((a, i) => (
            <ScrollReveal key={a.id} delay={i * 60}>
              <Link
                href={`/join#${a.id}`}
                className="group flex h-full flex-col rounded-3xl border-2 border-ink/5 bg-white p-5 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${toneBg[a.tone]}`}
                >
                  {a.emoji}
                </span>
                <span className="mt-4 text-base font-extrabold text-ink">{a.label}</span>
                <span className="mt-1 text-xs font-bold text-brand">{a.lead}</span>
                <span className="mt-2 flex-1 text-xs leading-relaxed text-ink-2">{a.body}</span>
                <span className="mt-4 text-xs font-bold text-ink-3 transition group-hover:text-brand">
                  {a.cta} →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
