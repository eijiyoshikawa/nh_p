import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { perspectives } from "@/lib/site";

const tones = {
  sun: { bg: "bg-sun-soft", text: "text-sun-dark", ring: "border-sun" },
  coral: { bg: "bg-coral-soft", text: "text-coral", ring: "border-coral" },
  brand: { bg: "bg-brand-soft", text: "text-brand", ring: "border-brand" },
  mint: { bg: "bg-mint-soft", text: "text-mint", ring: "border-mint" },
};

export default function Perspectives() {
  return (
    <section id="perspectives" className="bg-paper-2 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow={perspectives.eyebrow}
            title={perspectives.title}
            lead={perspectives.lead}
          />
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perspectives.items.map((p, i) => {
            const t = tones[p.tone];
            return (
              <ScrollReveal key={p.want + p.who} delay={i * 80}>
                <div
                  className={`flex h-full flex-col rounded-3xl border-2 bg-white p-6 ${t.ring} ${
                    i === perspectives.items.length - 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${t.bg}`}>
                      {p.emoji}
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs font-bold text-ink-3">{p.who}</p>
                      <p className={`text-2xl font-extrabold ${t.text}`}>{p.want}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-2">{p.body}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
