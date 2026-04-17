import { problem } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export default function Problem() {
  return (
    <section id="problem" className="px-4 py-14 sm:px-6 md:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={problem.sectionTitle} />

        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-text-secondary sm:text-base">
          {problem.intro}
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-8 sm:gap-10">
          {problem.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                {stat.value}
              </span>
              <span className="ml-1 text-base text-text-secondary sm:text-lg">
                {stat.unit}
              </span>
              <p className="mt-1 text-xs text-text-secondary sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {problem.issues.map((issue) => (
            <Card key={issue.title}>
              <div className="mb-3 text-3xl">{issue.icon}</div>
              <h3 className="mb-2 text-base font-bold text-text-primary sm:text-lg">
                {issue.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">{issue.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-white p-5 ring-1 ring-emerald-100 sm:p-6">
          <p className="mb-3 text-center text-sm font-bold text-accent-green-dark">
            子ども食堂は食事の場だけではありません
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {problem.necessity.map((item) => (
              <span
                key={item}
                className="press-scale rounded-full bg-white px-3 py-1.5 text-xs font-medium text-text-primary shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md sm:px-4 sm:py-2 sm:text-sm"
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
