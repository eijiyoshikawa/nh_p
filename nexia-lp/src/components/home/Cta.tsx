import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Icon from "@/components/Icon";
import { cta } from "@/lib/site";

export default function Cta() {
  return (
    <section id="cta" className="px-4 pb-20 pt-6 sm:px-6 md:pb-28">
      <ScrollReveal variant="zoom">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-center text-white sm:px-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="animate-glow-a absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand/70 blur-3xl" />
            <div className="animate-glow-b absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-sun/40 blur-3xl" />
            <div className="bg-dots absolute inset-0 opacity-[0.06]" />
          </div>
          <div className="relative">
            <h2 className="whitespace-pre-line text-3xl font-extrabold leading-tight sm:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-4 text-sm text-white/75 sm:text-base">{cta.body}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={cta.primary.href} size="lg" variant="sun">
                {cta.primary.label}
              </Button>
              <Button href={cta.line.href} size="lg" variant="outline" external>
                <Icon name="message" size={18} />
                {cta.line.label}
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
