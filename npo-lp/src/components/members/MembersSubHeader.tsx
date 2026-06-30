import Link from "next/link";
import { LogoutButton } from "@/components/members/LogoutButton";

export function MembersSubHeader() {
  return (
    <header className="border-b border-green-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href="/members/"
          className="text-sm font-bold text-accent-orange hover:underline"
        >
          ← メンバーハブへ戻る
        </Link>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs font-semibold tracking-widest text-text-secondary sm:block">
            MEMBERS ONLY
          </p>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
