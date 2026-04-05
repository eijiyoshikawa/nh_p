type StatCardProps = {
  value: string;
  unit: string;
  label: string;
};

export default function StatCard({ value, unit, label }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm text-center sm:p-6">
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-2xl font-bold text-accent-orange sm:text-4xl">{value}</span>
        <span className="text-sm font-medium text-text-secondary sm:text-lg">{unit}</span>
      </div>
      <p className="mt-2 text-xs text-text-secondary sm:text-sm">{label}</p>
    </div>
  );
}
