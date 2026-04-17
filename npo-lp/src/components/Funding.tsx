import { funding } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export default function Funding() {
  return (
    <section id="funding" className="bg-white/70 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={funding.sectionTitle} />

        {/* Grants badge */}
        <div className="mb-10 text-center">
          <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            {funding.grantsCount}
          </span>
          <p className="text-sm text-text-secondary sm:text-base">
            {funding.grantsSubtitle}
          </p>
        </div>

        {/* Top grants */}
        <div className="mb-10 grid gap-3 sm:grid-cols-2">
          {funding.topGrants.map((grant) => (
            <Card key={grant.name}>
              <h4 className="text-sm font-bold leading-snug text-text-primary">
                {grant.name}
              </h4>
              <p className="mt-1 text-base font-bold text-accent-green-dark sm:text-lg">
                {grant.amount}
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                {grant.target}
              </p>
            </Card>
          ))}
        </div>

        {/* Furusato CF */}
        <div className="mb-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-white p-5 ring-1 ring-emerald-100 sm:p-6">
          <h4 className="mb-3 text-sm font-bold text-accent-green-dark sm:text-base">
            {funding.furusatoCF.title}
          </h4>
          <p className="mb-4 text-sm leading-relaxed text-text-secondary">
            {funding.furusatoCF.description}
          </p>
          <ul className="space-y-2">
            {funding.furusatoCF.advantages.map((adv) => (
              <li
                key={adv}
                className="flex items-start gap-2 text-sm leading-relaxed text-text-primary"
              >
                <span className="mt-0.5 flex-shrink-0 text-accent-green">●</span>
                {adv}
              </li>
            ))}
          </ul>
        </div>

        {/* Strategy roadmap */}
        <div className="flex flex-col gap-4 md:flex-row">
          {funding.strategy.map((step, i) => (
            <div key={step.step} className="flex flex-1 items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-lg font-bold text-white shadow-md">
                {step.step}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-text-primary">
                  {step.title}
                </p>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
              {i < funding.strategy.length - 1 && (
                <div className="hidden text-2xl text-emerald-300 md:block" aria-hidden="true">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
