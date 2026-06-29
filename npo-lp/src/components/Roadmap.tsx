import { roadmap } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Roadmap() {
  return (
    <section id="roadmap" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={roadmap.sectionTitle} />
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-text-secondary sm:text-base">
          {roadmap.description}
        </p>

        <div className="relative">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-5 top-2 hidden h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-green-200 via-green-300 to-green-200 md:left-1/2 md:-translate-x-1/2 md:block"
          />

          <ol className="space-y-6 md:space-y-12">
            {roadmap.phases.map((p, i) => {
              const isRight = i % 2 === 1;
              return (
                <ScrollReveal key={p.year} delay={i * 80}>
                  <li
                    className={`relative md:grid md:grid-cols-2 md:items-center md:gap-8`}
                  >
                    {/* Year + icon node */}
                    <div
                      className={`relative ${
                        isRight ? "md:order-2 md:text-left" : "md:text-right"
                      }`}
                    >
                      <div className="inline-flex items-center gap-3 rounded-2xl border-2 border-green-100 bg-white px-5 py-3 shadow-sm">
                        <span aria-hidden className="text-2xl">
                          {p.icon}
                        </span>
                        <div className="text-left">
                          <p className="text-xs font-semibold tracking-widest text-accent-orange">
                            {p.label}
                          </p>
                          <p className="text-lg font-bold text-text-primary">
                            {p.year}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dot on spine (desktop) */}
                    <span
                      aria-hidden
                      className="absolute left-3 top-7 hidden h-4 w-4 rounded-full border-4 border-white bg-accent-orange shadow md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:block"
                    />

                    <div
                      className={`mt-3 rounded-2xl bg-white p-5 shadow-sm md:mt-0 ${
                        isRight ? "md:order-1" : ""
                      }`}
                    >
                      <ul className="space-y-1.5 text-sm text-text-primary">
                        {p.goals.map((g) => (
                          <li key={g} className="flex items-start gap-2">
                            <span
                              aria-hidden
                              className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-orange"
                            />
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
