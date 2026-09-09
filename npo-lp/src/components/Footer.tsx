import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { publicSiteUrl } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-text-primary px-6 py-10 text-center text-xs text-stone-400">
      <nav aria-label="フッター" className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-stone-300">
        <Link href="/" className="hover:text-white">
          トップ
        </Link>
        <Link href="/grants" className="hover:text-white">
          助成金リスト
        </Link>
        <Link href="/funding-strategy" className="hover:text-white">
          資金調達戦略
        </Link>
        <Link href="/glossary" className="hover:text-white">
          用語集
        </Link>
        <Link href="/members" className="font-semibold text-green-300 hover:text-green-200">
          メンバー（限定）
        </Link>
      </nav>
      <SocialLinks variant="dark" className="mb-4 justify-center" />
      <p className="mb-4">
        <a href={publicSiteUrl} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200">
          公式サイト：mirailabo-nexia.skma.asia
        </a>
      </p>
      <p>&copy; {new Date().getFullYear()} ひらかた子ども食堂支援NPO</p>
      <p className="mt-1">運営：三慧経営顧問株式会社（NPO化までの暫定）</p>
      <p className="mt-1">大阪府枚方市</p>
    </footer>
  );
}
