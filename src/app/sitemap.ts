import type { MetadataRoute } from 'next';

import { features } from '@/config/features';
import { routes } from '@/config/routes';

import { getArticles } from '@/lib/content/insights';
import { getLegalDoc } from '@/lib/content/legal';
import { getProjects } from '@/lib/content/projects';
import { getServices } from '@/lib/content/services';
import { clientEnv } from '@/lib/env';

const SITE_URL = clientEnv.NEXT_PUBLIC_SITE_URL;

/** Legal pages stay indexed but rank below the commercial routes (SEO_ARCHITECTURE §3). Entries
 *  without an explicit priority fall back to the sitemap protocol's 0.5 default. */
const LEGAL_PRIORITY = 0.3;

const LEGAL_PAGES = [
  { path: routes.privacy, slug: 'privacy' },
  { path: routes.terms, slug: 'terms' },
  { path: routes.cookies, slug: 'cookies' },
  { path: routes.codeOfConduct, slug: 'code-of-conduct' },
] as const;

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Sitemap (API_DOCUMENTATION §3) — static routes + content slugs, filtered by the same feature
 *  gates and publication rules as the nav, so a gated section is absent everywhere consistently. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    routes.home,
    routes.services,
    routes.about,
    routes.leadership,
    routes.careers,
    routes.contact(),
  ].map((path) => ({ url: absolute(path) }));

  // `lastModified` from the MDX frontmatter, so a legal edit re-announces itself (API_DOC §3).
  for (const legal of LEGAL_PAGES) {
    const doc = getLegalDoc(legal.slug);
    entries.push({
      url: absolute(legal.path),
      ...(doc === undefined ? {} : { lastModified: doc.frontmatter.updatedAt }),
      priority: LEGAL_PRIORITY,
    });
  }

  for (const service of getServices()) {
    entries.push({ url: absolute(routes.service(service.slug)) });
  }

  if (features.work.enabled) {
    entries.push({ url: absolute(routes.work) });
    for (const project of getProjects({ publishedOnly: true })) {
      entries.push({ url: absolute(routes.project(project.slug)) });
    }
  }

  if (features.insights.enabled) {
    entries.push({ url: absolute(routes.insights) });
    for (const article of getArticles().filter((entry) => entry.status === 'published')) {
      entries.push({
        url: absolute(routes.article(article.slug)),
        lastModified: article.publishedAt,
      });
    }
  }

  return entries;
}
