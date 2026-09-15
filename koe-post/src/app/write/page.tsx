import type { Metadata } from "next";
import KidShell from "@/components/KidShell";
import WriteForm from "./WriteForm";

export const metadata: Metadata = { title: "かく" };

export default function WritePage() {
  return (
    <KidShell back={{ href: "/", label: "もどる" }}>
      <WriteForm />
    </KidShell>
  );
}
