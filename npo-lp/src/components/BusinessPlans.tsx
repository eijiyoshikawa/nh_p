import { businessPlans } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export default function BusinessPlans() {
  const { bsf, warehouse, pillars } = businessPlans;

  return (
    <section id="business" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={businessPlans.sectionTitle} />

        <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-text-secondary sm:text-base">
          {businessPlans.intro}
        </p>

        {/* 4 Pillars roadmap */}
        <div className="mb-16 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6 ring-1 ring-emerald-100 sm:p-8">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-text-primary sm:text-xl">
              {pillars.title}
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
              {pillars.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.items.map((item) => (
              <div
                key={item.title}
                className={`hover-lift relative rounded-2xl bg-white p-5 shadow-sm ring-1 ${
                  item.accent === "primary"
                    ? "ring-emerald-200"
                    : "ring-emerald-100"
                }`}
              >
                <div
                  className={`absolute -top-3 left-5 rounded-full px-3 py-0.5 text-xs font-bold text-white ${
                    item.accent === "primary"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                      : "bg-gradient-to-r from-emerald-400 to-emerald-500"
                  }`}
                >
                  STEP {item.step}
                </div>
                <div className="mt-1 text-2xl">{item.icon}</div>
                <h4 className="mt-2 text-sm font-bold text-text-primary sm:text-base">
                  {item.title}
                </h4>
                <p className="mt-0.5 text-[11px] font-medium text-accent-green-dark">
                  {item.subtitle}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-white/70 p-4 text-center ring-1 ring-emerald-100">
            <p className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              {pillars.referencesTitle}
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {pillars.references.map((ref) => (
                <span
                  key={ref}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-accent-green-dark"
                >
                  {ref}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-text-secondary">
            {pillars.footnote}
          </p>
        </div>

        {/* BSF (detailed) */}
        <div className="mb-12">
          <h3 className="mb-3 text-lg font-bold text-accent-green sm:text-xl">
            ♻️ {bsf.title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-text-secondary">
            {bsf.description}
          </p>

          <div className="mb-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {bsf.revenue.map((item) => (
              <Card
                key={item.label}
                className={
                  item.highlight
                    ? "border-2 border-accent-green bg-emerald-50"
                    : ""
                }
              >
                <p className="text-xs text-text-secondary">{item.label}</p>
                <p
                  className={`text-xl font-bold sm:text-2xl ${
                    item.highlight ? "text-accent-green" : "text-text-primary"
                  }`}
                >
                  {item.value}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">{item.note}</p>
              </Card>
            ))}
          </div>

          <Card>
            <p className="mb-3 text-xs font-bold text-text-secondary uppercase">
              選定理由
            </p>
            <ul className="grid gap-2 text-sm text-text-primary md:grid-cols-2">
              {bsf.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2 leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 text-accent-green">✓</span>
                  {reason}
                </li>
              ))}
            </ul>
          </Card>

          <p className="mt-4 text-center text-sm text-text-secondary">
            初期費用: <span className="font-bold text-text-primary">{bsf.initialCost}</span>
          </p>
        </div>

        {/* Warehouse (detailed) */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-accent-green-dark sm:text-xl">
            🏭 {warehouse.title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-text-secondary">
            {warehouse.description}
          </p>

          <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {warehouse.features.map((feature) => (
              <span
                key={feature}
                className="press-scale rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-accent-green-dark transition-transform hover:-translate-y-0.5 hover:shadow-md sm:px-4 sm:py-2 sm:text-sm"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <p className="mb-3 text-xs font-bold text-text-secondary uppercase">
              主な機能
            </p>
            <ul className="grid gap-2 text-sm text-text-primary sm:grid-cols-2">
              {warehouse.functions.map((func) => (
                <li key={func} className="flex items-start gap-2 leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 text-accent-green">▸</span>
                  {func}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {warehouse.costs.map((cost) => (
              <Card key={cost.label} className="text-center">
                <p className="text-xs text-text-secondary">{cost.label}</p>
                <p className="text-lg font-bold text-text-primary sm:text-xl">
                  {cost.value}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-5 text-center shadow-[0_12px_30px_-12px_rgba(5,150,105,0.5)]">
            <p className="text-sm text-emerald-100">初期概算総費</p>
            <p className="text-2xl font-extrabold text-white sm:text-3xl">
              {warehouse.totalCost}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-emerald-100">
              補助金・助成金・ふるさと納税型CFで資金調達
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
