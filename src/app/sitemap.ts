import type { MetadataRoute } from 'next';

import { features } from '@/config/features';
import { routes } from '@/config/routes';

import { getArticles } from '@/lib/content/insights';
import { getProjects } from '@/lib/content/projects';
import { getServices } from '@/lib/content/services';
import { clientEnv } from '@/lib/env';

const SITE_URL = clientEnv.NEXT_PUBLIC_SITE_URL;

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
    routes.privacy,
    routes.terms,
    routes.cookies,
    routes.codeOfConduct,
  ].map((path) => ({ url: absolute(path) }));

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
