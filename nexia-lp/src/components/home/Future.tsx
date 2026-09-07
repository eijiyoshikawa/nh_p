import ScrollReveal from "@/components/ui/ScrollReveal";
import { future } from "@/lib/site";

export default function Future() {
  return (
    <section id="future" className="relative overflow-hidden bg-sun px-4 py-20 sm:px-6 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-coral/30 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <ScrollReveal>
          <p className="text-xs font-bold tracking-[0.25em] text-ink/60">{future.eyebrow}</p>
          <h2 className="mt-3 whitespace-pre-line text-[1.75rem] font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl">
            {future.title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div className="rounded-3xl bg-white/80 p-7 backdrop-blur">
            <div className="space-y-4 text-sm leading-[1.9] text-ink sm:text-base">
              {future.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-5 text-xs text-ink-3">{future.disclaimer}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
