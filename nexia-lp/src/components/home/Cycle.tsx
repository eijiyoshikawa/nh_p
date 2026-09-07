import ScrollReveal from "@/components/ui/ScrollReveal";
import Icon from "@/components/Icon";
import { cycle } from "@/lib/site";

export default function Cycle() {
  return (
    <section id="cycle" className="relative overflow-hidden bg-brand px-4 py-20 text-white sm:px-6 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-glow-a absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="animate-glow-b absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-sun/25 blur-3xl" />
        <div className="bg-dots absolute inset-0 opacity-[0.07]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.25em] text-sun">{cycle.eyebrow}</p>
            <h2 className="mt-2 whitespace-pre-line text-[1.75rem] font-extrabold leading-tight sm:text-4xl md:text-5xl">
              {cycle.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">{cycle.lead}</p>
          </div>
        </ScrollReveal>

        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cycle.steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 120} variant="zoom" as="li" className="h-full">
              <div className="lift relative flex h-full flex-col rounded-3xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/15 hover:bg-white/15">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-sun">STEP {s.n}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-sun">
                    <Icon name={s.icon} size={22} />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-extrabold">{s.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{s.body}</p>
                {i < cycle.steps.length - 1 && (
                  <>
                    <span
                      aria-hidden
                      className="animate-nudge-x absolute -right-5 top-1/2 hidden -translate-y-1/2 text-sun lg:block"
                    >
                      <Icon name="arrow" size={22} strokeWidth={2.2} />
                    </span>
                    <span aria-hidden className="animate-nudge-y mt-4 flex justify-center text-sun lg:hidden">
                      <Icon name="arrow" size={20} strokeWidth={2.2} className="rotate-90" />
                    </span>
                  </>
                )}
              </div>
            </ScrollReveal>
          ))}
        </ol>

        <ScrollReveal delay={200}>
          <div className="mt-6 flex justify-center">
            <span className="rounded-full bg-sun px-4 py-1.5 text-xs font-bold text-ink">
              ↻ 達成が、次の「やりたい」につながる
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-14">
            <p className="mb-4 text-center text-xs font-bold tracking-[0.25em] text-white/60">
              プロジェクトの例（構想）
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {cycle.examples.map((e) => (
                <div key={e.title} className="lift rounded-2xl bg-white p-5 text-ink">
                  <p className="font-extrabold">{e.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-2">{e.body}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
