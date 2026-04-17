import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Article, ArticleFrontmatter } from "./types";
import { isCategorySlug } from "./categories";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

async function listMdxFiles(): Promise<string[]> {
  try {
    const entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
      .map((e) => e.name);
  } catch {
    return [];
  }
}

function parseArticle(fileName: string, raw: string): Article | null {
  const { data, content } = matter(raw);
  const fm = data as Partial<ArticleFrontmatter>;

  if (!fm.title || !fm.category || !fm.publishedAt || !fm.author) {
    console.warn(`[content] Skipping ${fileName}: missing required frontmatter`);
    return null;
  }
  if (!isCategorySlug(fm.category)) {
    console.warn(`[content] Skipping ${fileName}: unknown category "${fm.category}"`);
    return null;
  }
  if (fm.draft) return null;

  const slug = fileName.replace(/\.mdx$/, "");

  return {
    slug,
    title: fm.title,
    description: fm.description ?? "",
    category: fm.category,
    subcategory: fm.subcategory,
    areaTags: fm.areaTags ?? [],
    ageTags: fm.ageTags ?? [],
    themeTags: fm.themeTags ?? [],
    author: fm.author,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    heroImage: fm.heroImage,
    faq: fm.faq,
    spots: fm.spots,
    sources: fm.sources,
    body: content,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const files = await listMdxFiles();
  const articles = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(ARTICLES_DIR, file), "utf8");
      return parseArticle(file, raw);
    })
  );
  return articles
    .filter((a): a is Article => a !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const files = await listMdxFiles();
  const match = files.find((f) => f.replace(/\.mdx$/, "") === slug);
  if (!match) return null;
  const raw = await readFile(path.join(ARTICLES_DIR, match), "utf8");
  return parseArticle(match, raw);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.category === category);
}

export async function getArticlesBySubcategory(
  category: string,
  subcategory: string
): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter(
    (a) => a.category === category && a.subcategory === subcategory
  );
}

export async function getArticlesByArea(area: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.areaTags?.includes(area as never));
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter(
    (a) =>
      a.themeTags?.includes(tag as never) || a.ageTags?.includes(tag as never)
  );
}

export function getArticleUrl(article: Pick<Article, "category" | "subcategory" | "slug">): string {
  return article.subcategory
    ? `/${article.category}/${article.subcategory}/${article.slug}/`
    : `/${article.category}/${article.slug}/`;
}
