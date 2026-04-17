import type { Article } from "./types";
import { site } from "./site";
import { getCategory } from "./categories";
import { getArticleUrl } from "./content";
import { getAuthor } from "./authors";

type JsonLd = Record<string, unknown>;

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
    image: article.heroImage ? [article.heroImage.src] : undefined,
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
