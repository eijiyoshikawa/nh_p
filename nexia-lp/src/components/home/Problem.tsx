import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { problem } from "@/lib/site";

export default function Problem() {
  return (
    <section id="problem" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading eyebrow={problem.eyebrow} title={problem.title} lead={problem.lead} tone="coral" />
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-3">
          {problem.issues.map((issue, i) => (
            <ScrollReveal key={issue.title} delay={i * 100}>
              <Card className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-soft text-2xl">
                  {issue.icon}
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-ink">{issue.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{issue.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={300}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-bold leading-relaxed text-ink sm:text-base">
            <span className="marker">{problem.bridge}</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
