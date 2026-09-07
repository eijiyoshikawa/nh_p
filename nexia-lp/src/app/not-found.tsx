import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-20 text-center">
      <p className="text-6xl font-extrabold text-brand">404</p>
      <p className="mt-3 font-bold text-ink">ページが見つかりませんでした</p>
      <div className="mt-8">
        <Button href="/">トップへ戻る</Button>
      </div>
    </section>
  );
}
