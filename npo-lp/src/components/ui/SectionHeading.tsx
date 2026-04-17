type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center">
      <h2 className="whitespace-pre-line text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
    </div>
  );
}
