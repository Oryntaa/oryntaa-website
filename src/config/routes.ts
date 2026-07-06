/**
 * The single source of truth for route paths (NAVIGATION_ARCHITECTURE §1). Inline path strings
 * anywhere else fail review — link through these helpers so renames are one-line changes.
 */

export type ContactIntent = 'project' | 'modernization' | 'partnership' | 'careers' | 'general';

export const routes = {
  home: '/',
  services: '/services',
  service: (slug: string): string => `/services/${slug}`,
  work: '/work',
  project: (slug: string): string => `/work/${slug}`,
  about: '/about',
  leadership: '/about/leadership',
  careers: '/careers',
  insights: '/insights',
  article: (slug: string): string => `/insights/${slug}`,
  contact: (params?: { intent?: ContactIntent }): string =>
    params?.intent ? `/contact?intent=${params.intent}` : '/contact',
  book: '/contact#book',
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies',
  codeOfConduct: '/code-of-conduct',
} as const;
