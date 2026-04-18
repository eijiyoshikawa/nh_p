import type { Article, Spot } from "./types";
import { site } from "./site";
import { getCategory } from "./categories";
import { getArticleUrl } from "./content";
import { getAuthor } from "./authors";
import { getTag } from "./tags";
import { getArea } from "./areas";

type JsonLd = Record<string, unknown>;

function countWords(body: string): number {
  const cleaned = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[#>*_|\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return Array.from(cleaned).length;
}

function articleKeywords(article: Article): string[] {
  const out: string[] = [];
  const cat = getCategory(article.category);
  if (cat) out.push(cat.label);
  const sub = cat?.subcategories.find((s) => s.slug === article.subcategory);
  if (sub) out.push(sub.label);
  for (const a of article.areaTags ?? []) {
    const area = getArea(a);
    if (area) out.push(area.label);
  }
  for (const t of [...(article.themeTags ?? []), ...(article.ageTags ?? [])]) {
    const tag = getTag(t);
    if (tag) out.push(tag.label);
  }
  return Array.from(new Set(out));
}

export function articleJsonLd(article: Article, url: string): JsonLd {
  const authorRecord = getAuthor(article.author);
  const author: JsonLd = authorRecord
    ? {
        "@type": "Person",
        name: authorRecord.name,
        url: `${site.url}/author/${authorRecord.slug}/`,
        jobTitle: authorRecord.role,
      }
    : { "@type": "Person", name: article.author };
  const cat = getCategory(article.category);
  const sub = cat?.subcategories.find((s) => s.slug === article.subcategory);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author,
    publisher: {
      "@type": "Organization",
      name: site.operator.name,
      url: site.operator.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: sub?.label ?? cat?.label,
    keywords: articleKeywords(article).join(", ") || undefined,
    inLanguage: "ja",
    wordCount: countWords(article.body),
    image: article.heroImage ? [article.heroImage.src] : undefined,
  };
}

export function spotsJsonLd(spots: Spot[]): JsonLd[] {
  return spots.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Place",
    name: s.name,
    address: s.address
      ? { "@type": "PostalAddress", streetAddress: s.address }
      : undefined,
    telephone: s.tel,
    url: s.url,
    geo:
      s.lat !== undefined && s.lng !== undefined
        ? {
            "@type": "GeoCoordinates",
            latitude: s.lat,
            longitude: s.lng,
          }
        : undefined,
  }));
}

export function featureItemListJsonLd(
  featureUrl: string,
  articles: { title: string; url: string }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: featureUrl,
    numberOfItems: articles.length,
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: a.url,
      name: a.title,
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.shortName,
    url: `${site.url}/`,
    inLanguage: "ja",
    description: site.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    parentOrganization: {
      "@type": "Organization",
      name: site.operator.name,
      url: site.operator.url,
    },
  };
}

export function buildArticleBreadcrumb(article: Article): {
  name: string;
  url: string;
}[] {
  const cat = getCategory(article.category);
  const sub = cat?.subcategories.find((s) => s.slug === article.subcategory);
  return [
    { name: "ホーム", url: `${site.url}/` },
    ...(cat
      ? [{ name: cat.label, url: `${site.url}/${cat.slug}/` }]
      : []),
    ...(sub
      ? [
          {
            name: sub.label,
            url: `${site.url}/${cat!.slug}/${sub.slug}/`,
          },
        ]
      : []),
    { name: article.title, url: `${site.url}${getArticleUrl(article)}` },
  ];
}
