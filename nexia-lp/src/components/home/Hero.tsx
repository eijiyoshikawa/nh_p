import Button from "@/components/ui/Button";
import { LogoMark } from "@/components/Logo";
import Icon from "@/components/Icon";
import { hero, org } from "@/lib/site";

function Shapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="animate-float absolute -left-16 top-24 h-64 w-64 rounded-full bg-sun/30 blur-2xl sm:h-80 sm:w-80" />
      <div className="animate-float-reverse absolute -right-10 top-10 h-72 w-72 rounded-full bg-brand/15 blur-2xl sm:h-96 sm:w-96" />
      <div className="animate-float absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-mint/25 blur-2xl" />
      {/* orbit ring */}
      <svg
        className="animate-spin-slow absolute -right-24 top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 text-brand/15 lg:block"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 3" />
        <circle cx="50" cy="2" r="2.5" fill="#B69B47" />
        <circle cx="98" cy="50" r="2" fill="#4E6B33" />
        <circle cx="50" cy="98" r="2.5" fill="#7FA95A" />
        <circle cx="2" cy="50" r="2" fill="#D4704F" />
      </svg>
      <div className="bg-dots absolute inset-0 opacity-60" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pt-32">
      <Shapes />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="max-w-3xl">
          <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-xs font-bold text-brand shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-sun" />
            {hero.badge}
          </span>

          <h1 className="animate-fade-in-up delay-100 mt-6 whitespace-pre-line text-4xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
            {hero.tagline}
          </h1>

          <p className="animate-fade-in-up delay-200 mt-7 max-w-xl whitespace-pre-line text-base leading-relaxed text-ink-2 sm:text-lg">
            {hero.description}
          </p>

          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <Icon name="arrow" size={18} />
            </Button>
            <Button href={hero.secondaryCta.href} size="lg" variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <p className="animate-fade-in-up delay-400 mt-8 text-xs text-ink-3">
            {org.name} ／ {org.operator}
          </p>
        </div>
        <div className="animate-fade-in-up delay-300 hidden justify-center lg:flex">
          <div className="animate-float rounded-full bg-white/70 p-6 shadow-[0_30px_80px_-30px_rgba(78,107,51,0.35)] backdrop-blur">
            <LogoMark size={300} />
          </div>
        </div>
      </div>

      <a
        href="#audiences"
        className="animate-bounce-soft absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs font-bold tracking-widest text-ink-3 md:block"
        aria-label="下へスクロール"
      >
        SCROLL ↓
      </a>
    </section>
  );
}
