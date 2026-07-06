import type { MetadataRoute } from 'next';

import { getSite } from '@/lib/content/site';

/** Web app manifest (API_DOCUMENTATION §3). Brand colors from DESIGN_SYSTEM.
 *  TODO(content): icons land with the brand mark in /public/brand (Phase 13 / asset track). */
export default function manifest(): MetadataRoute.Manifest {
  const site = getSite();
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    theme_color: '#ea580c',
    background_color: '#fafaf9',
  };
}
