import Link from "next/link";
import type { Article } from "@/lib/types";
import { getArea } from "@/lib/areas";
import { getTag } from "@/lib/tags";
import { getAuthor } from "@/lib/authors";

export function AuthorByline({ article }: { article: Article }) {
  const a = getAuthor(article.author);
  if (a) {
    return (
      <Link
        href={`/author/${a.slug}/`}
        className="hover:text-[#F97316] hover:underline"
      >
        著者: {a.name}
      </Link>
    );
  }
  return <span>著者: {article.author}</span>;
}

export function TagChips({ article }: { article: Article }) {
  const areas = (article.areaTags ?? [])
    .map((slug) => ({ slug, area: getArea(slug) }))
    .flatMap((x) => (x.area ? [{ slug: x.slug, area: x.area }] : []));

  const tags = [
    ...(article.ageTags ?? []),
    ...(article.themeTags ?? []),
  ]
    .map((slug) => ({ slug, tag: getTag(slug) }))
    .flatMap((x) => (x.tag ? [{ slug: x.slug, tag: x.tag }] : []));

  if (areas.length === 0 && tags.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-2 text-xs">
      {areas.map(({ slug, area }) => (
        <Link
          key={`area-${slug}`}
          href={`/area/${slug}/`}
          className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-orange-700 hover:bg-orange-100"
        >
          📍 {area.label}
        </Link>
      ))}
      {tags.map(({ slug, tag }) => (
        <Link
          key={`tag-${slug}`}
          href={`/tag/${slug}/`}
          className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-stone-700 hover:bg-orange-50"
        >
          #{tag.label}
        </Link>
      ))}
    </div>
  );
}
