import type { Metadata } from 'next';

import { clientEnv } from '@/lib/env';

const SITE_URL = clientEnv.NEXT_PUBLIC_SITE_URL;
const SITE_NAME = 'Oryntaa';
const HOME_TITLE = 'Oryntaa — AI-First Software Engineering & Digital Products';

/** Preview/dev deployments must never be indexed (SEO_ARCHITECTURE §2/§3). */
const IS_PRODUCTION = process.env.VERCEL_ENV === 'production';

export type OgType = 'default' | 'service' | 'work' | 'article' | 'page';

interface BuildMetadataOptions {
  /** Page title without the site suffix. Omit for the homepage (uses the full brand title). */
  title?: string;
  description: string;
  /** Absolute path, params stripped (canonical). e.g. '/services', '/work/trackrec'. */
  path: string;
  ogType?: OgType;
  /** Article routes only: promotes og:type to 'article' with publish time + author bylines. */
  article?: { publishedTime: string; authors: string[] };
}

/** The single metadata factory every route's `generateMetadata`/`metadata` uses (SEO_ARCHITECTURE
 *  §2): canonical, OG/Twitter cards wired to /api/og, and automatic noindex off production. */
export function buildMetadata({
  title,
  description,
  path,
  ogType = 'page',
  article,
}: BuildMetadataOptions): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const fullTitle = title === undefined ? HOME_TITLE : `${title} — ${SITE_NAME}`;
  const ogTitle = title ?? SITE_NAME;
  const ogImage = `/api/og?title=${encodeURIComponent(ogTitle)}&type=${ogType}`;
  const images = [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }];
  const baseOg = { title: fullTitle, description, url: canonical, siteName: SITE_NAME, images };

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: { canonical },
    robots: IS_PRODUCTION ? undefined : { index: false, follow: false },
    openGraph: article
      ? {
          ...baseOg,
          type: 'article',
          publishedTime: article.publishedTime,
          authors: article.authors,
        }
      : { ...baseOg, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
