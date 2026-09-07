type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  tone?: "brand" | "sun" | "coral" | "mint";
};

const toneClass: Record<NonNullable<Props["tone"]>, string> = {
  brand: "text-brand",
  sun: "text-sun-dark",
  coral: "text-coral",
  mint: "text-mint",
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "brand",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`mb-10 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className={`mb-2 text-xs font-bold tracking-[0.25em] ${toneClass[tone]}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="whitespace-pre-line text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-sm leading-relaxed text-ink-2 sm:text-base">{lead}</p>
      )}
    </div>
  );
}
