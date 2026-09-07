import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { activities } from "@/lib/site";

const tones = {
  coral: { n: "text-coral", bg: "bg-coral-soft", check: "text-coral" },
  brand: { n: "text-brand", bg: "bg-brand-soft", check: "text-brand" },
  sun: { n: "text-sun-dark", bg: "bg-sun-soft", check: "text-sun-dark" },
};

export default function Activities() {
  return (
    <section id="activities" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading eyebrow={activities.eyebrow} title={activities.title} lead={activities.lead} />
        </ScrollReveal>
        <div className="space-y-5">
          {activities.items.map((a, i) => {
            const t = tones[a.tone];
            return (
              <ScrollReveal key={a.n} delay={i * 100}>
                <article className="grid gap-6 rounded-3xl border-2 border-ink/5 bg-white p-6 md:grid-cols-[auto_1fr_1fr] md:items-start md:gap-10 md:p-10">
                  <span className={`text-5xl font-extrabold leading-none ${t.n}`}>{a.n}</span>
                  <div>
                    <h3 className="text-xl font-extrabold text-ink sm:text-2xl">{a.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">{a.body}</p>
                  </div>
                  <ul className={`space-y-2 rounded-2xl p-5 ${t.bg}`}>
                    {a.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm font-medium text-ink">
                        <span className={t.check}>✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
