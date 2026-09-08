import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Icon from "@/components/Icon";
import { voice } from "@/lib/site";

// 市民の声ハブ：ちょっとした疑問・意見を集める入口。
export default function Voice() {
  return (
    <section id="voice" className="relative overflow-hidden bg-sun-soft px-4 py-20 sm:px-6 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-glow-a absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
        <div className="animate-glow-b absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-sun/40 blur-3xl" />
        <div className="bg-dots bg-dots-drift absolute inset-0 opacity-40" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
        <ScrollReveal variant="left">
          <p className="text-xs font-bold tracking-[0.25em] text-sun-dark">{voice.eyebrow}</p>
          <h2 className="mt-3 whitespace-pre-line text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl">
            {voice.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ink-2 sm:text-base">{voice.lead}</p>
          <div className="mt-8">
            <Button href={voice.cta.href} size="lg">
              <Icon name="chat" size={18} />
              {voice.cta.label}
            </Button>
          </div>
          <p className="mt-3 text-xs text-ink-3">{voice.note}</p>
        </ScrollReveal>

        <ScrollReveal delay={150} variant="right">
          <ul className="space-y-3">
            {voice.examples.map((e, i) => (
              <li
                key={e}
                className={`lift flex items-start gap-3 rounded-2xl bg-white/90 px-5 py-4 text-sm text-ink shadow-sm ${
                  i % 2 === 0 ? "md:mr-8" : "md:ml-8"
                }`}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun-soft text-sun-dark">
                  <Icon name="message" size={14} />
                </span>
                「{e}」
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
