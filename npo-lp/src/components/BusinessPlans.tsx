import { businessPlans } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export default function BusinessPlans() {
  const { kikurage, warehouse } = businessPlans;

  return (
    <section id="business" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={businessPlans.sectionTitle} />

        <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-text-secondary sm:text-base">
          {businessPlans.intro}
        </p>

        {/* Kikurage */}
        <div className="mb-12">
          <h3 className="mb-3 text-lg font-bold text-accent-green sm:text-xl">
            🍄 {kikurage.title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-text-secondary">
            {kikurage.description}
          </p>

          <div className="mb-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {kikurage.revenue.map((item) => (
              <Card
                key={item.label}
                className={
                  item.highlight
                    ? "border-2 border-accent-green bg-green-50"
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
              {kikurage.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2 leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 text-accent-green">✓</span>
                  {reason}
                </li>
              ))}
            </ul>
          </Card>

          <p className="mt-4 text-center text-sm text-text-secondary">
            初期費用: <span className="font-bold text-text-primary">{kikurage.initialCost}</span>
          </p>
        </div>

        {/* Warehouse */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-accent-orange sm:text-xl">
            🏭 {warehouse.title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-text-secondary">
            {warehouse.description}
          </p>

          <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {warehouse.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-accent-orange-dark sm:px-4 sm:py-2 sm:text-sm"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Functions */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-bold text-text-secondary uppercase">
              主な機能
            </p>
            <ul className="grid gap-2 text-sm text-text-primary sm:grid-cols-2">
              {warehouse.functions.map((func) => (
                <li key={func} className="flex items-start gap-2 leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 text-accent-orange">▸</span>
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

          <div className="mt-6 rounded-2xl bg-accent-orange p-5 text-center">
            <p className="text-sm text-orange-100">初期概算総費</p>
            <p className="text-2xl font-extrabold text-white sm:text-3xl">
              {warehouse.totalCost}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-orange-200">
              補助金・助成金・ふるさと納税型CFで資金調達
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
