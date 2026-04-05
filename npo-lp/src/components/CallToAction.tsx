import { cta } from "@/lib/content";

export default function CallToAction() {
  return (
    <section
      id="cta"
      className="bg-gradient-to-b from-orange-50 to-orange-100 px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-xl font-extrabold leading-snug text-text-primary sm:text-2xl md:text-3xl">
          {cta.sectionTitle}
        </h2>
        <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent-orange" />
        <p className="mt-6 text-sm leading-relaxed text-text-secondary sm:text-base">
          {cta.description}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {cta.roles.map((role) => (
            <span
              key={role}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-accent-orange shadow-sm sm:px-4 sm:py-2 sm:text-sm"
            >
              {role}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent-orange px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-accent-orange-dark sm:px-10 sm:py-4 sm:text-lg"
          >
            お問い合わせはこちら
            <span aria-hidden="true">&rarr;</span>
          </a>
          <p className="mt-4 text-xs text-text-secondary">
            LINE・メール・お電話でお気軽にご連絡ください
          </p>
        </div>
      </div>
    </section>
  );
}
