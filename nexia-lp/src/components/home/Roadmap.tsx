import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { roadmap } from "@/lib/site";

const badge = {
  next: { label: "NEXT", cls: "bg-sun text-ink" },
  planned: { label: "PLAN", cls: "bg-brand-soft text-brand" },
  vision: { label: "VISION", cls: "bg-mint-soft text-mint" },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-paper-2 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <SectionHeading eyebrow={roadmap.eyebrow} title={roadmap.title} lead={roadmap.lead} />
        </ScrollReveal>
        <ScrollReveal>
        <ol className="relative pl-8">
          <span aria-hidden className="draw-line absolute bottom-0 left-0 top-1 w-[2px] bg-brand/30" />
          {roadmap.phases.map((p, i) => {
            const b = badge[p.status];
            return (
              <ScrollReveal key={p.period} delay={150 + i * 120} variant="left" as="li" className="relative pb-10 last:pb-0">
                <div>
                  <span
                    className={`absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-paper-2 ${
                      p.status === "next" ? "animate-ping-ring bg-sun" : p.status === "vision" ? "bg-mint" : "bg-brand"
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold text-brand">{p.period}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest ${b.cls}`}>
                      {b.label}
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-extrabold text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{p.body}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}
