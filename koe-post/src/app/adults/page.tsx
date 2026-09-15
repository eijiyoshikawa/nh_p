import type { Metadata } from "next";
import AdultShell from "@/components/AdultShell";
import Dashboard from "./Dashboard";

export const metadata: Metadata = { title: "投稿一覧" };
export const dynamic = "force-dynamic";

export default function AdultsPage() {
  return (
    <AdultShell current="list">
      <Dashboard />
    </AdultShell>
  );
}
