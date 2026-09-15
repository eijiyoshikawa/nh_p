import { emergency, helplines } from "@/lib/content";
import Icon from "@/components/Icon";

export default function Helplines({ emphasize = false }: { emphasize?: boolean }) {
  return (
    <section
      className={`rounded-3xl border-2 p-5 ${
        emphasize ? "border-peach bg-peach-soft" : "border-sky-soft bg-white"
      }`}
    >
      <p className="text-sm font-extrabold text-ink">
        {emphasize ? "いま つらいきもちなら、ここに でんわしてみて。" : "だれかと はなしたいときは、ここに でんわできるよ。"}
      </p>
      <p className="mt-1 text-xs text-ink-2">なまえは いわなくていいよ。むりょうだよ。</p>
      <ul className="mt-4 space-y-3">
        {helplines.map((h) => (
          <li key={h.tel} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-extrabold text-ink">{h.name}</p>
            <a
              href={`tel:${h.tel.replace(/-/g, "")}`}
              className="tap mt-1 inline-flex items-center gap-2 rounded-full bg-sky px-5 text-lg font-extrabold text-white"
            >
              <Icon name="message" size={18} />
              {h.tel}
            </a>
            <p className="mt-2 text-xs text-ink-2">{h.hours}</p>
            <p className="text-xs text-ink-2">{h.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-2xl bg-danger-soft px-4 py-3 text-sm font-extrabold text-danger">{emergency}</p>
    </section>
  );
}
