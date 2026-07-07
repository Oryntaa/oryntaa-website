import type { MetadataRoute } from 'next';

import { getSite } from '@/lib/content/site';

/** Web app manifest (API_DOCUMENTATION §3). Brand colors from DESIGN_SYSTEM.
 *  Install/PWA icon is the square Oryntaa mark in /public/brand. */
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
    icons: [{ src: '/brand/oryntaa-mark.png', sizes: 'any', type: 'image/png', purpose: 'any' }],
  };
}
