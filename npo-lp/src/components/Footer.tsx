import { brand } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 px-6 py-10 text-center text-xs text-emerald-200/80">
      <p className="text-sm font-bold text-white">{brand.name}</p>
      <p className="mt-1">{brand.project}</p>
      <p className="mt-3">&copy; {new Date().getFullYear()} {brand.name}</p>
      <p className="mt-1">大阪府枚方市</p>
    </footer>
  );
}
