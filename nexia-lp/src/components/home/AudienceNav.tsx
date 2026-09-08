import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { IconBadge } from "@/components/Icon";
import { audiences } from "@/lib/site";

export default function AudienceNav() {
  return (
    <section id="audiences" className="px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-center text-sm font-bold text-ink-2">{audiences.lead}</p>
        </ScrollReveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {audiences.items.map((a, i) => (
            <ScrollReveal key={a.id} delay={i * 70} variant="zoom" className="h-full">
              <Link
                href={`/join#${a.id}`}
                className="group lift flex h-full flex-col rounded-3xl border-2 border-ink/5 bg-white p-5 hover:border-brand/30"
              >
                <IconBadge name={a.icon} tone={a.tone} />
                <span className="mt-4 text-base font-extrabold text-ink">{a.label}</span>
                <span className="mt-1 text-xs font-bold text-brand">{a.lead}</span>
                <span className="mt-2 flex-1 text-xs leading-relaxed text-ink-2">{a.body}</span>
                <span className="mt-4 text-xs font-bold text-ink-3 transition group-hover:text-brand">
                  {a.cta} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
