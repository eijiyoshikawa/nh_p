import Link from "next/link";
import Logo from "@/components/Logo";
import { nav, org } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink px-4 pb-10 pt-14 text-sm text-white/70 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/60">
            {org.purpose}
          </p>
          <p className="mt-4 text-xs text-white/50">
            {org.status} ／ {org.area}
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-white/50">MENU</p>
          <ul className="space-y-2">
            {nav.items.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="hover:text-white">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-white/50">CONNECT</p>
          <ul className="space-y-2">
            <li>
              <a href={org.lineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LINE公式アカウント
              </a>
            </li>
            <li>
              <a href={`mailto:${org.email}`} className="hover:text-white">
                {org.email}
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                プライバシーポリシー
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {org.name}</p>
        <p>{org.operator}</p>
      </div>
    </footer>
  );
}
