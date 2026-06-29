import { CountUp } from "@/components/ui/CountUp";

type StatCardProps = {
  value: string;
  unit: string;
  label: string;
};

export default function StatCard({ value, unit, label }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm text-center transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-baseline justify-center gap-1">
        <CountUp
          value={value}
          className="text-2xl font-bold text-accent-orange sm:text-4xl"
        />
        <span className="text-sm font-medium text-text-secondary sm:text-lg">{unit}</span>
      </div>
      <p className="mt-2 text-xs text-text-secondary sm:text-sm">{label}</p>
    </div>
  );
}
