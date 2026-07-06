import type { MetadataRoute } from 'next';

import { clientEnv } from '@/lib/env';

const SITE_URL = clientEnv.NEXT_PUBLIC_SITE_URL;
const IS_PRODUCTION = process.env.VERCEL_ENV === 'production';

/** robots (API_DOCUMENTATION §3) — allow all in production; preview deployments disallow everything
 *  so they're never indexed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: IS_PRODUCTION ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
  };
}
