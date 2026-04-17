import { benefits } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export default function Benefits() {
  return (
    <section id="benefits" className="bg-white/70 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={benefits.sectionTitle} />

        <blockquote className="mb-6 border-l-4 border-accent-green pl-4 text-sm font-medium italic leading-relaxed text-text-primary sm:text-base md:text-lg">
          {benefits.quote}
        </blockquote>

        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-text-secondary sm:text-base">
          {benefits.description}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5 lg:grid-cols-3">
          {benefits.items.map((item) => (
            <Card key={item.title}>
              <div className="mb-3 text-3xl">{item.icon}</div>
              <h3 className="mb-2 text-base font-bold text-text-primary">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
