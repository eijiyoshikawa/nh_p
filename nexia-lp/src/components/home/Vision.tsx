import ScrollReveal from "@/components/ui/ScrollReveal";
import { vision } from "@/lib/site";

export default function Vision() {
  return (
    <section id="vision" className="bg-ink px-4 py-20 text-white sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <ScrollReveal>
          <p className="text-xs font-bold tracking-[0.25em] text-sun">{vision.eyebrow}</p>
          <h2 className="mt-4 whitespace-pre-line text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
            {vision.statement}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div className="space-y-5 text-sm leading-[1.9] text-white/80 sm:text-base">
            {vision.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
