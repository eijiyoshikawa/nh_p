import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { authors, getAuthor } from "@/lib/authors";
import { getArticlesByAuthor } from "@/lib/content";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) return {};
  return {
    title: `${a.name} の記事`,
    description: a.bio,
    alternates: { canonical: `${site.url}/author/${a.slug}/` },
  };
}

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) notFound();

  const articles = await getArticlesByAuthor(slug);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    jobTitle: a.role,
    description: a.bio,
    url: `${site.url}/author/${a.slug}/`,
    worksFor: {
      "@type": "Organization",
      name: site.operator.name,
      url: site.operator.url,
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "著者", href: "/author/" },
          { label: a.name },
        ]}
      />
      <header className="mt-4 rounded-xl border border-orange-100 bg-white p-6">
        <p className="text-xs text-stone-500">{a.role}</p>
        <h1 className="mt-1 text-2xl font-bold text-stone-900 md:text-3xl">
          {a.name}
        </h1>
        <p className="mt-3 text-sm leading-7 text-stone-700">{a.bio}</p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-stone-900">
          {a.name} の記事 ({articles.length})
        </h2>
        {articles.length === 0 ? (
          <p className="mt-4 text-sm text-stone-600">
            記事は準備中です。
          </p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: `${site.url}/` },
              { name: "著者", url: `${site.url}/author/` },
              { name: a.name, url: `${site.url}/author/${a.slug}/` },
            ])
          ),
        }}
      />
    </div>
  );
}
