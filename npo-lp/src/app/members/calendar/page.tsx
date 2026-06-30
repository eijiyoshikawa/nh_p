import type { Metadata } from "next";
import { MembersSubHeader } from "@/components/members/MembersSubHeader";
import { CalendarClient } from "./CalendarClient";

export const metadata: Metadata = {
  title: "活動カレンダー — メンバー専用",
  robots: { index: false, follow: false },
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <MembersSubHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-xs font-semibold tracking-widest text-accent-orange">
          CALENDAR
        </p>
        <h1 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">
          活動カレンダー
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          子ども食堂の開催予定やイベントを登録・共有できます。
        </p>
        <CalendarClient />
      </main>
    </div>
  );
}
