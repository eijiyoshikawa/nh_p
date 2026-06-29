import { problem } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Problem() {
  return (
    <section id="problem" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={problem.sectionTitle} />

        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-text-secondary sm:text-base">
          {problem.intro}
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-8 sm:gap-10">
          {problem.stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 120} className="text-center">
              <CountUp
                value={stat.value}
                className="text-3xl font-bold text-accent-orange sm:text-4xl"
              />
              <span className="ml-1 text-base text-text-secondary sm:text-lg">
                {stat.unit}
              </span>
              <p className="mt-1 text-xs text-text-secondary sm:text-sm">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {problem.issues.map((issue, i) => (
            <ScrollReveal key={issue.title} delay={i * 100}>
              <Card>
                <div className="mb-3 text-3xl">{issue.icon}</div>
                <h3 className="mb-2 text-base font-bold text-text-primary sm:text-lg">
                  {issue.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">{issue.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-green-50 p-5 sm:p-6">
          <p className="mb-3 text-center text-sm font-bold text-accent-orange-dark">
            子ども食堂は食事の場だけではありません
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {problem.necessity.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-text-primary shadow-sm sm:px-4 sm:py-2 sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
