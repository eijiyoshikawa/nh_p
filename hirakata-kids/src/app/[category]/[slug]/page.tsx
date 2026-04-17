import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getAllArticles,
  getArticleBySlug,
} from "@/lib/content";
import { getCategory, isCategorySlug } from "@/lib/categories";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Faq } from "@/components/article/Faq";
import { Sources } from "@/components/article/Sources";
import { Cta } from "@/components/cta/Cta";
import { site } from "@/lib/site";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildArticleBreadcrumb,
  faqJsonLd,
} from "@/lib/seo";

type Params = { category: string; slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getAllArticles();
  return all.map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.category !== category) return {};
  const url = `${site.url}/${category}/${slug}/`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, slug } = await params;
  if (!isCategorySlug(category)) notFound();
  const article = await getArticleBySlug(slug);
  if (!article || article.category !== category) notFound();

  const cat = getCategory(article.category);
  const url = `${site.url}/${article.category}/${article.slug}/`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          ...(cat ? [{ label: cat.label, href: `/${cat.slug}/` }] : []),
          { label: article.title },
        ]}
      />
      <header className="mt-4">
        <h1 className="text-2xl font-bold leading-tight text-stone-900 md:text-3xl">
          {article.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-stone-500">
          <time dateTime={article.publishedAt}>公開: {article.publishedAt}</time>
          {article.updatedAt && (
            <time dateTime={article.updatedAt}>更新: {article.updatedAt}</time>
          )}
          <span>著者: {article.author}</span>
        </div>
        {article.description && (
          <p className="mt-4 rounded-lg bg-orange-50 p-4 text-sm text-stone-700">
            {article.description}
          </p>
        )}
      </header>

      <div className="prose-article mt-8">
        <MDXRemote
          source={article.body}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      {article.faq && article.faq.length > 0 && <Faq items={article.faq} />}
      {article.sources && article.sources.length > 0 && (
        <Sources items={article.sources} />
      )}

      <Cta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(article, url)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(buildArticleBreadcrumb(article))
          ),
        }}
      />
      {article.faq && article.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(article.faq)),
          }}
        />
      )}
    </article>
  );
}
