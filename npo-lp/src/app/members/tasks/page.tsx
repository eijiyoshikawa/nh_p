import type { Metadata } from "next";
import { MembersSubHeader } from "@/components/members/MembersSubHeader";
import { TasksClient } from "./TasksClient";

export const metadata: Metadata = {
  title: "タスク・役割 — メンバー専用",
  robots: { index: false, follow: false },
};

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <MembersSubHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-xs font-semibold tracking-widest text-accent-orange">
          TASKS
        </p>
        <h1 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">
          タスク・役割分担
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          誰が何を担当しているか、進捗を可視化します。
        </p>
        <TasksClient />
      </main>
    </div>
  );
}
