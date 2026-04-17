type StatCardProps = {
  value: string;
  unit: string;
  label: string;
};

export default function StatCard({ value, unit, label }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-emerald-50 bg-white p-4 text-center shadow-sm sm:p-6">
      <div className="flex items-baseline justify-center gap-1">
        <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-2xl font-bold text-transparent sm:text-4xl">
          {value}
        </span>
        <span className="text-sm font-medium text-text-secondary sm:text-lg">{unit}</span>
      </div>
      <p className="mt-2 text-xs text-text-secondary sm:text-sm">{label}</p>
    </div>
  );
}
