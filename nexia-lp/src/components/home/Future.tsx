import ScrollReveal from "@/components/ui/ScrollReveal";
import Icon from "@/components/Icon";
import { future } from "@/lib/site";

export default function Future() {
  return (
    <section id="future" className="animate-gradient relative overflow-hidden bg-[linear-gradient(120deg,#D9B85A_0%,#EAD68F_45%,#D9B85A_100%)] px-4 py-20 sm:px-6 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-glow-a absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/40 blur-3xl" />
        <div className="animate-glow-b absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-coral/25 blur-3xl" />
        <svg
          className="animate-spin-slow absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 text-ink/10"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.4" strokeDasharray="0.6 2.5" />
        </svg>
        <Icon name="sprout" size={40} className="animate-leaf-a absolute right-[12%] top-[16%] hidden text-ink/15 sm:block" />
        <Icon name="sprout" size={26} className="animate-leaf-b absolute bottom-[18%] right-[30%] hidden text-ink/15 sm:block" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <ScrollReveal variant="left">
          <p className="text-xs font-bold tracking-[0.25em] text-ink/60">{future.eyebrow}</p>
          <h2 className="mt-3 whitespace-pre-line text-[1.75rem] font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl">
            {future.title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150} variant="right">
          <div className="lift rounded-3xl bg-white/80 p-7 backdrop-blur">
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
