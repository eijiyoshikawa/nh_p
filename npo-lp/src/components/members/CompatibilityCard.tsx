import Link from "next/link";
import {
  BASE_ANIMALS,
  compatibilityFor,
  type Compatibility,
  type Member,
} from "@/lib/members";
import { MemberAvatar } from "@/components/members/MemberAvatar";

function CompatRow({
  title,
  sub,
  items,
  accent,
}: {
  title: string;
  sub: string;
  items: Compatibility[];
  accent: string;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className={`text-xs font-semibold ${accent}`}>{title}</p>
      <p className="text-xs text-text-secondary">{sub}</p>
      <ul className="mt-3 space-y-2">
        {items.map((c) => {
          const b = BASE_ANIMALS[c.member.character.base];
          return (
            <li key={c.member.slug}>
              <Link
                href={`/members/${c.member.slug}/`}
                className="group flex items-center gap-3 rounded-lg border border-green-100 bg-white p-3 transition hover:border-green-300 hover:shadow-sm"
              >
                <MemberAvatar
                  photoId={c.member.photoId}
                  emoji={b.emoji}
                  name={c.member.name}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-text-primary group-hover:text-accent-orange">
                    {c.member.name}
                  </p>
                  <p className="truncate text-xs text-text-secondary">
                    {c.reasons[0]}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CompatibilityCard({ member }: { member: Member }) {
  const { complements, resonances } = compatibilityFor(member);
  if (complements.length === 0 && resonances.length === 0) return null;

  return (
    <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-semibold tracking-widest text-accent-orange">
        相性診断
      </p>
      <h2 className="mt-1 text-xl font-bold text-text-primary">
        この人と組むと活きるメンバー
      </h2>
      <p className="mt-1 text-xs text-text-secondary">
        動物占いの3軸（心理・行動・思考）とグループから算出した、組織内の相性です。
      </p>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <CompatRow
          title="補完しあえる相手"
          sub="違いを持ち寄り、弱点を補える組み合わせ"
          items={complements}
          accent="text-amber-700"
        />
        <CompatRow
          title="共鳴する相手"
          sub="価値観が近く、息が合いやすい組み合わせ"
          items={resonances}
          accent="text-emerald-700"
        />
      </div>
    </section>
  );
}
