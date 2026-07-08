import { clientEnv } from '@/lib/env';

const SITE_URL = clientEnv.NEXT_PUBLIC_SITE_URL;
const ORG_ID = `${SITE_URL}#organization`;

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export interface OrganizationInput {
  name: string;
  description: string;
  email: string;
  socials: string[];
  founders: { name: string }[];
}

/** Organization node (SEO_ARCHITECTURE §5) — one per site, in the root layout. */
export function organizationJsonLd(input: OrganizationInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: input.name,
    url: SITE_URL,
    description: input.description,
    email: input.email,
    logo: absolute('/brand/oryntaa-mark.png'),
    sameAs: input.socials,
    founder: input.founders.map((founder) => ({ '@type': 'Person', name: founder.name })),
  };
}

/** WebSite node (SEO_ARCHITECTURE §5) — root layout. */
export function websiteJsonLd(name: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: SITE_URL,
    publisher: { '@id': ORG_ID },
  };
}

/** Service node (SEO_ARCHITECTURE §5) — each service page. */
export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absolute(input.path),
    provider: { '@id': ORG_ID },
  };
}

/** BreadcrumbList node (SEO_ARCHITECTURE §5) — all detail pages, from the Breadcrumbs data. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/** Article node (SEO_ARCHITECTURE §5) — insights articles. */
export function articleJsonLd(input: {
  headline: string;
  description: string;
  path: string;
  authorName: string;
  publishedAt: Date;
  modifiedAt?: Date;
  /** Representative image path (the social card); absolute-ized here. */
  image?: string;
}): Record<string, unknown> {
  const url = absolute(input.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: url,
    datePublished: input.publishedAt.toISOString(),
    dateModified: (input.modifiedAt ?? input.publishedAt).toISOString(),
    ...(input.image !== undefined ? { image: absolute(input.image) } : {}),
    author: { '@type': 'Person', name: input.authorName },
    publisher: { '@id': ORG_ID },
  };
}

/** FAQPage node (SEO_ARCHITECTURE §5) — service + contact FAQs. Readonly-tolerant so `as const`
 *  content modules (contact-page) can feed it directly. */
export function faqJsonLd(items: readonly { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
