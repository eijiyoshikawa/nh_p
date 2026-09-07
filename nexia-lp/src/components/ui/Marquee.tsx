import Icon from "@/components/Icon";

// 「したい」キーワードが流れる帯。セクション間のリズムづくり。
const WORDS = [
  "子どもが行きたい",
  "親が行かせたい",
  "企業が参加したい",
  "飲食店が始めたい",
  "いろいろな人が関わりたい",
];

export default function Marquee({ dark = false }: { dark?: boolean }) {
  const items = [...WORDS, ...WORDS];
  return (
    <div
      aria-hidden
      className={`overflow-hidden border-y py-4 ${
        dark ? "border-white/10 bg-ink text-white/80" : "border-brand/10 bg-brand-soft/60 text-brand"
      }`}
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-extrabold tracking-wide sm:text-base">
            <Icon name="sprout" size={18} className={dark ? "text-sun" : "text-sun-dark"} />
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
