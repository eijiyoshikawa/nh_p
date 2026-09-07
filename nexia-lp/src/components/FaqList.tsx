import { faq } from "@/lib/site";

export default function FaqList({ items = faq }: { items?: typeof faq }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details
          key={f.q}
          className="group rounded-2xl border-2 border-ink/5 bg-white open:border-brand/30"
        >
          <summary className="flex cursor-pointer list-none items-start gap-3 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
            <span className="mt-0.5 shrink-0 text-sm font-extrabold text-brand">Q.</span>
            <span className="flex-1 text-sm font-bold text-ink sm:text-base">{f.q}</span>
            <span className="ml-2 shrink-0 text-ink-3 transition group-open:rotate-45" aria-hidden>
              ＋
            </span>
          </summary>
          <div className="flex gap-3 px-5 pb-5">
            <span className="shrink-0 text-sm font-extrabold text-coral">A.</span>
            <p className="text-sm leading-relaxed text-ink-2">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
