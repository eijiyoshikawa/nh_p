import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { features, getFeature } from "@/lib/features";
import { getArticleBySlug } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Article } from "@/lib/types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const f = getFeature(slug);
  if (!f) return {};
  const url = `${site.url}/feature/${f.slug}/`;
  return {
    title: f.title,
    description: f.description,
    alternates: { canonical: url },
    openGraph: {
      title: f.title,
      description: f.description,
      url,
      type: "website",
    },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const f = getFeature(slug);
  if (!f) notFound();

  const resolved = await Promise.all(
    f.articleSlugs.map((s) => getArticleBySlug(s))
  );
  const articles = resolved.filter((a): a is Article => a !== null);

  const url = `${site.url}/feature/${f.slug}/`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "特集", href: "/feature/" },
          { label: f.title },
        ]}
      />
      <header className="mt-4">
        <p className="text-xs font-semibold tracking-widest text-orange-600">
          FEATURE
        </p>
        <h1 className="mt-2 text-2xl font-bold text-stone-900 md:text-3xl">
          {f.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-700 md:text-base">
          {f.intro}
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-stone-900">この特集の記事</h2>
        {articles.length === 0 ? (
          <p className="mt-4 text-sm text-stone-600">
            記事を準備中です。
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: `${site.url}/` },
              { name: "特集", url: `${site.url}/feature/` },
              { name: f.title, url },
            ])
          ),
        }}
      />
    </div>
  );
}
