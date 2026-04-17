import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-orange-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-base font-bold text-[#F97316]">{site.name}</p>
            <p className="mt-2 text-sm text-stone-600">{site.description}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800">カテゴリ</p>
            <ul className="mt-2 space-y-1 text-sm text-stone-600">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}/`} className="hover:text-[#F97316]">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800">運営</p>
            <p className="mt-2 text-sm text-stone-600">
              運営：
              <a
                href={site.operator.url}
                className="text-[#F97316] hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {site.operator.name}
              </a>
            </p>
            <ul className="mt-4 space-y-1 text-sm text-stone-600">
              <li>
                <Link href="/about/" className="hover:text-[#F97316]">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link href="/author/" className="hover:text-[#F97316]">
                  著者一覧
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="hover:text-[#F97316]">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-[#F97316]">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs text-stone-500">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
