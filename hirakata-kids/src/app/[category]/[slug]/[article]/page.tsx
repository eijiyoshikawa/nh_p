import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/content";
import { getCategory, isCategorySlug } from "@/lib/categories";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Faq } from "@/components/article/Faq";
import { Sources } from "@/components/article/Sources";
import { TagChips } from "@/components/article/TagChips";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { Cta } from "@/components/cta/Cta";
import { site } from "@/lib/site";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildArticleBreadcrumb,
  faqJsonLd,
} from "@/lib/seo";

type Params = { category: string; slug: string; article: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getAllArticles();
  return all
    .filter((a) => !!a.subcategory)
    .map((a) => ({
      category: a.category,
      slug: a.subcategory!,
      article: a.slug,
    }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category, slug, article } = await params;
  const articleData = await getArticleBySlug(article);
  if (
    !articleData ||
    articleData.category !== category ||
    articleData.subcategory !== slug
  )
    return {};
  const url = `${site.url}/${category}/${slug}/${article}/`;
  return {
    title: articleData.title,
    description: articleData.description,
    alternates: { canonical: url },
    openGraph: {
      title: articleData.title,
      description: articleData.description,
      url,
      type: "article",
      publishedTime: articleData.publishedAt,
      modifiedTime: articleData.updatedAt ?? articleData.publishedAt,
    },
  };
}

export default async function ArticleWithSubPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, slug, article } = await params;
  if (!isCategorySlug(category)) notFound();
  const cat = getCategory(category);
  if (!cat) notFound();
  const subcat = cat.subcategories.find((s) => s.slug === slug);
  if (!subcat) notFound();

  const articleData = await getArticleBySlug(article);
  if (
    !articleData ||
    articleData.category !== category ||
    articleData.subcategory !== slug
  )
    notFound();

  const url = `${site.url}/${category}/${slug}/${article}/`;
  const related = await getRelatedArticles(articleData);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: cat.label, href: `/${cat.slug}/` },
          { label: subcat.label, href: `/${cat.slug}/${subcat.slug}/` },
          { label: articleData.title },
        ]}
      />
      <header className="mt-4">
        <h1 className="text-2xl font-bold leading-tight text-stone-900 md:text-3xl">
          {articleData.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-stone-500">
          <time dateTime={articleData.publishedAt}>
            公開: {articleData.publishedAt}
          </time>
          {articleData.updatedAt && (
            <time dateTime={articleData.updatedAt}>
              更新: {articleData.updatedAt}
            </time>
          )}
          <span>著者: {articleData.author}</span>
        </div>
        {articleData.description && (
          <p className="mt-4 rounded-lg bg-orange-50 p-4 text-sm text-stone-700">
            {articleData.description}
          </p>
        )}
        <TagChips article={articleData} />
      </header>

      <div className="prose-article mt-8">
        <MDXRemote
          source={articleData.body}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      {articleData.faq && articleData.faq.length > 0 && (
        <Faq items={articleData.faq} />
      )}
      {articleData.sources && articleData.sources.length > 0 && (
        <Sources items={articleData.sources} />
      )}

      <RelatedArticles articles={related} />

      <Cta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(articleData, url)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(buildArticleBreadcrumb(articleData))
          ),
        }}
      />
      {articleData.faq && articleData.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(articleData.faq)),
          }}
        />
      )}
    </article>
  );
}
