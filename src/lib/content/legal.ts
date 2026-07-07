import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';
import { cache } from 'react';

import { legalFrontmatterSchema, type LegalFrontmatter } from '@/lib/content/schemas';
import { slugify } from '@/lib/utils/slugify';

const LEGAL_DIR = join(process.cwd(), 'content', 'legal');

export interface TocEntry {
  text: string;
  id: string;
  level: 2 | 3;
}

export interface LegalDoc {
  frontmatter: LegalFrontmatter;
  body: string;
  toc: TocEntry[];
}

/** A legal document (frontmatter + MDX body + generated TOC), or undefined if absent (§11). */
export const getLegalDoc = cache((slug: string): LegalDoc | undefined => {
  let raw: string;
  try {
    raw = readFileSync(join(LEGAL_DIR, `${slug}.mdx`), 'utf8');
  } catch {
    return undefined;
  }
  const { data, content } = matter(raw);
  const frontmatter = legalFrontmatterSchema.parse(data);

  const toc: TocEntry[] = [];
  for (const line of content.split('\n')) {
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h2?.[1] !== undefined) toc.push({ text: h2[1].trim(), id: slugify(h2[1]), level: 2 });
    else if (h3?.[1] !== undefined) toc.push({ text: h3[1].trim(), id: slugify(h3[1]), level: 3 });
  }

  return { frontmatter, body: content, toc };
});
