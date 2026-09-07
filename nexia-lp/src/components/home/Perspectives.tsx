import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/Icon";
import { perspectives } from "@/lib/site";

const tones = {
  sun: { text: "text-sun-dark", ring: "border-sun" },
  coral: { text: "text-coral", ring: "border-coral" },
  brand: { text: "text-brand", ring: "border-brand" },
  mint: { text: "text-mint", ring: "border-mint" },
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
                    <IconBadge name={p.icon} tone={p.tone} />
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
