import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleNeighbors,
  getArticlesBySubcategory,
  getRelatedArticles,
} from "@/lib/content";
import {
  categories,
  getCategory,
  isCategorySlug,
} from "@/lib/categories";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Faq } from "@/components/article/Faq";
import { Sources } from "@/components/article/Sources";
import { TagChips, AuthorByline } from "@/components/article/TagChips";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { PrevNext } from "@/components/article/PrevNext";
import { CategorySiblings } from "@/components/article/CategorySiblings";
import { Toc } from "@/components/article/Toc";
import { SpotList } from "@/components/article/SpotList";
import { Share } from "@/components/article/Share";
import { ScrollTop } from "@/components/article/ScrollTop";
import { Callout } from "@/components/article/Callout";
import { Cta } from "@/components/cta/Cta";
import { extractToc, estimateReadingMinutes } from "@/lib/article-meta";
import { site } from "@/lib/site";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildArticleBreadcrumb,
  faqJsonLd,
  spotsJsonLd,
} from "@/lib/seo";

type Params = { category: string; slug: string };

// Pre-render ALL valid (category, slug) pairs: both subcategory pages and articles-without-sub.
export async function generateStaticParams(): Promise<Params[]> {
  const subcategoryParams: Params[] = categories.flatMap((c) =>
    c.subcategories.map((s) => ({ category: c.slug, slug: s.slug }))
  );
  const all = await getAllArticles();
  const articleParams: Params[] = all
    .filter((a) => !a.subcategory)
    .map((a) => ({ category: a.category, slug: a.slug }));
  return [...subcategoryParams, ...articleParams];
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategorySlug(category)) return {};
  const cat = getCategory(category);
  if (!cat) return {};

  const sub = cat.subcategories.find((s) => s.slug === slug);
  if (sub) {
    return {
      title: `${sub.label}の記事一覧 | ${cat.label}`,
      description: `枚方市の${sub.label}に関する記事一覧。`,
      alternates: { canonical: `${site.url}/${cat.slug}/${sub.slug}/` },
    };
  }

  const article = await getArticleBySlug(slug);
  if (!article || article.category !== category || article.subcategory) return {};
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

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, slug } = await params;
  if (!isCategorySlug(category)) notFound();
  const cat = getCategory(category);
  if (!cat) notFound();

  const sub = cat.subcategories.find((s) => s.slug === slug);
  if (sub) {
    const articles = await getArticlesBySubcategory(category, slug);
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: cat.label, href: `/${cat.slug}/` },
            { label: sub.label },
          ]}
        />
        <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
          {sub.label}
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          {cat.label} &gt; {sub.label} の記事一覧。
        </p>
        <section className="mt-8">
          {articles.length === 0 ? (
            <p className="text-sm text-stone-600">
              このサブカテゴリの記事は準備中です。
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  // Not a subcategory — treat as article (must NOT have subcategory in frontmatter)
  const article = await getArticleBySlug(slug);
  if (!article || article.category !== category || article.subcategory) notFound();

  const url = `${site.url}/${article.category}/${article.slug}/`;
  const related = await getRelatedArticles(article);
  const neighbors = await getArticleNeighbors(article);
  const toc = extractToc(article.body);
  const readingMin = estimateReadingMinutes(article.body);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-10">
      <article className="min-w-0">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: cat.label, href: `/${cat.slug}/` },
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
            <span aria-label="読了目安">読了 {readingMin}分</span>
            <AuthorByline article={article} />
          </div>
          {article.description && (
            <p className="mt-4 rounded-lg bg-orange-50 p-4 text-sm text-stone-700">
              {article.description}
            </p>
          )}
          <TagChips article={article} />
          <div className="xl:hidden">
            <Toc items={toc} />
          </div>
        </header>

        <div className="prose-article mt-8">
          <MDXRemote
            source={article.body}
            components={{ Callout }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        {article.spots && article.spots.length > 0 && (
          <SpotList items={article.spots} />
        )}
        {article.faq && article.faq.length > 0 && <Faq items={article.faq} />}
        {article.sources && article.sources.length > 0 && (
          <Sources items={article.sources} />
        )}

        <Share title={article.title} url={url} />

        <PrevNext prev={neighbors.prev} next={neighbors.next} />

        <CategorySiblings category={article.category} currentSub={article.subcategory} />

        <RelatedArticles articles={related} />

        <Cta />
        <ScrollTop />

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
        {article.spots && article.spots.length > 0 &&
          spotsJsonLd(article.spots).map((ld, i) => (
            <script
              key={`spot-${i}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
            />
          ))}
      </article>

      <aside className="hidden xl:block">
        <Toc items={toc} variant="sticky" />
      </aside>
    </div>
  );
}
