import type { MemberSns } from "@/lib/members";

const defs: Array<{
  key: keyof MemberSns;
  label: string;
  emoji: string;
  cls: string;
}> = [
  { key: "facebook", label: "Facebook", emoji: "📘", cls: "border-blue-200 bg-blue-50 text-blue-700" },
  { key: "instagram", label: "Instagram", emoji: "📷", cls: "border-pink-200 bg-pink-50 text-pink-700" },
  { key: "x", label: "X", emoji: "✖️", cls: "border-stone-300 bg-stone-50 text-stone-700" },
  { key: "line", label: "LINE", emoji: "💬", cls: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { key: "website", label: "Web", emoji: "🔗", cls: "border-green-200 bg-green-50 text-green-700" },
];

export function MemberSnsLinks({
  sns,
  className = "",
}: {
  sns?: MemberSns;
  className?: string;
}) {
  if (!sns) return null;
  const present = defs.filter((d) => {
    const v = sns[d.key];
    return typeof v === "string" && v.trim().length > 0;
  });
  if (present.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {present.map((d) => (
        <a
          key={d.key}
          href={sns[d.key]}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition hover:opacity-80 ${d.cls}`}
        >
          <span aria-hidden>{d.emoji}</span>
          {d.label}
        </a>
      ))}
    </div>
  );
}
