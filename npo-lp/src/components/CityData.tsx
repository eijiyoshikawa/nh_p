import { cityData } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";

export default function CityData() {
  return (
    <section id="citydata" className="bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title={cityData.sectionTitle}
          subtitle={cityData.subtitle}
        />
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-text-secondary sm:text-base">
          {cityData.description}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {cityData.items.map((item) => (
            <StatCard
              key={item.label}
              value={item.value}
              unit={item.unit}
              label={item.label}
            />
          ))}
        </div>
        <p className="mt-8 rounded-2xl bg-green-50 p-4 text-center text-sm font-medium leading-relaxed text-accent-orange-dark sm:p-5 sm:text-base">
          {cityData.insight}
        </p>
      </div>
    </section>
  );
}
