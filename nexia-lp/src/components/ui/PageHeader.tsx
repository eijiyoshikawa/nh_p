export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="bg-dots bg-dots-drift border-b border-ink/5 px-4 pb-14 pt-32 sm:px-6 md:pb-20 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <p className="animate-fade-in-up mb-3 text-xs font-bold tracking-[0.25em] text-brand">{eyebrow}</p>
        <h1 className="animate-fade-in-up delay-100 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="animate-fade-in-up delay-200 mt-5 max-w-2xl text-sm leading-relaxed text-ink-2 sm:text-base">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
