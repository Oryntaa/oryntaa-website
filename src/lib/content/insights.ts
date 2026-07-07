import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';
import { cache } from 'react';
import readingTime from 'reading-time';

import { articleFrontmatterSchema, type ArticleFrontmatter } from '@/lib/content/schemas';

const INSIGHTS_DIR = join(process.cwd(), 'content', 'insights');

export interface ArticleMeta extends ArticleFrontmatter {
  readingTimeMinutes: number;
}

export interface Article {
  meta: ArticleMeta;
  body: string;
}

function readArticleFiles(): { slug: string; raw: string }[] {
  let files: string[];
  try {
    files = readdirSync(INSIGHTS_DIR).filter((file) => file.endsWith('.mdx'));
  } catch {
    return []; // directory absent or empty
  }
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
    raw: readFileSync(join(INSIGHTS_DIR, file), 'utf8'),
  }));
}

function toMeta(raw: string): ArticleMeta {
  const { data, content } = matter(raw);
  return {
    ...articleFrontmatterSchema.parse(data),
    readingTimeMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

/** All article metadata, newest first (CONTENT_ARCHITECTURE §3). Bodies are compiled by getArticle. */
export const getArticles = cache((): ArticleMeta[] =>
  readArticleFiles()
    .map(({ raw }) => toMeta(raw))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()),
);

/** A single article — metadata plus its raw MDX body — or undefined if it does not exist. */
export const getArticle = cache((slug: string): Article | undefined => {
  const file = readArticleFiles().find((entry) => entry.slug === slug);
  if (file === undefined) return undefined;
  return { meta: toMeta(file.raw), body: matter(file.raw).content };
});

/** Up to three other articles in the same category (CONTENT_ARCHITECTURE §3). */
export const getRelatedArticles = cache((slug: string): ArticleMeta[] => {
  const current = getArticles().find((article) => article.slug === slug);
  if (current === undefined) return [];
  return getArticles()
    .filter((article) => article.slug !== slug && article.category === current.category)
    .slice(0, 3);
});
