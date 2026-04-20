import { housingFeasibility } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export default function HousingFeasibility() {
  const { stats, rent, renovation, subsidies, scenario, sources } =
    housingFeasibility;

  return (
    <section
      id="housing"
      className="px-4 py-14 sm:px-6 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={housingFeasibility.sectionTitle} />

        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-text-secondary sm:text-base">
          {housingFeasibility.intro}
        </p>

        {/* Top-line housing stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3 lg:gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="hover-lift rounded-2xl border border-emerald-50 bg-white p-5 shadow-sm"
            >
              <p className="text-xs text-text-secondary">{s.label}</p>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                  {s.value}
                </span>
                <span className="text-sm font-medium text-text-secondary">
                  {s.unit}
                </span>
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
                {s.note}
              </p>
            </div>
          ))}
        </div>

        {/* Rent + Renovation, side by side on desktop */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:gap-5">
          <Card>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">🏠</span>
              <h3 className="text-sm font-bold text-text-primary sm:text-base">
                {rent.title}
              </h3>
            </div>
            <ul className="divide-y divide-emerald-50 text-sm text-text-primary">
              {rent.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-3 py-2"
                >
                  <span className="text-xs text-text-secondary sm:text-sm">
                    {item.label}
                  </span>
                  <span className="whitespace-nowrap font-bold text-accent-green-dark">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-text-secondary">
              {rent.note}
            </p>
          </Card>

          <Card>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">🛠️</span>
              <h3 className="text-sm font-bold text-text-primary sm:text-base">
                {renovation.title}
              </h3>
            </div>
            <ul className="divide-y divide-emerald-50 text-sm text-text-primary">
              {renovation.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-3 py-2"
                >
                  <span className="text-xs text-text-secondary sm:text-sm">
                    {item.label}
                  </span>
                  <span className="whitespace-nowrap font-bold text-accent-green-dark">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-text-secondary">
              {renovation.note}
            </p>
          </Card>
        </div>

        {/* Subsidies */}
        <Card className="mb-6 bg-gradient-to-br from-emerald-50 to-white">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h3 className="text-sm font-bold text-text-primary sm:text-base">
              {subsidies.title}
            </h3>
          </div>
          <ul className="grid gap-2 text-sm text-text-primary sm:grid-cols-3">
            {subsidies.items.map((item) => (
              <li
                key={item.label}
                className="rounded-xl bg-white p-3 ring-1 ring-emerald-100"
              >
                <p className="text-[11px] text-text-secondary">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-accent-green-dark">
                  {item.value}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-text-secondary">
            {subsidies.note}
          </p>
        </Card>

        {/* Scenario calc */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 p-6 text-white shadow-[0_18px_40px_-20px_rgba(5,150,105,0.55)] sm:p-7">
          <p className="text-[11px] font-bold tracking-[0.18em] text-emerald-200 uppercase">
            Feasibility Scenario
          </p>
          <h3 className="mt-1 text-base font-bold sm:text-lg">
            {scenario.title}
          </h3>

          <ul className="mt-4 divide-y divide-white/15 text-sm">
            {scenario.rows.map((row) => (
              <li
                key={row.label}
                className={`flex items-center justify-between gap-3 py-2.5 ${
                  row.highlight ? "pt-3" : ""
                }`}
              >
                <span
                  className={`text-xs sm:text-sm ${
                    row.highlight
                      ? "font-bold text-white"
                      : "text-emerald-100"
                  }`}
                >
                  {row.label}
                </span>
                <span
                  className={`whitespace-nowrap font-bold ${
                    row.highlight
                      ? "text-base text-lime-200 sm:text-lg"
                      : "text-white"
                  }`}
                >
                  {row.value}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 rounded-lg bg-white/10 p-3 text-xs leading-relaxed text-emerald-50 ring-1 ring-white/15">
            {scenario.note}
          </p>
        </div>

        {/* Sources */}
        <details className="group mt-6 text-xs text-text-secondary">
          <summary className="cursor-pointer select-none font-medium text-accent-green-dark transition-colors hover:text-accent-green">
            データ出典・注記を見る
          </summary>
          <ul className="mt-3 space-y-1.5 pl-4">
            {sources.map((src) => (
              <li key={src} className="list-disc leading-relaxed">
                {src}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
