export default function Loading() {
  return (
    <div
      className="mx-auto flex max-w-6xl items-center justify-center px-4 py-24"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3 text-stone-500">
        <span
          aria-hidden
          className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-[#F97316]"
        />
        <p className="text-sm">読み込み中…</p>
      </div>
    </div>
  );
}
