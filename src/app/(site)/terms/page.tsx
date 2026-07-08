import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';

import { getLegalDoc } from '@/lib/content/legal';
import { buildMetadata } from '@/lib/seo/metadata';

import { LegalDocument } from '@/components/sections/legal/LegalDocument';

/** Copy lives in the MDX frontmatter, not here (SEO_ARCHITECTURE §2). */
export function generateMetadata(): Metadata {
  const doc = getLegalDoc('terms');
  if (doc === undefined) return {};
  return buildMetadata({ ...doc.frontmatter.seo, path: routes.terms });
}

export default function TermsPage(): React.JSX.Element {
  const doc = getLegalDoc('terms');
  if (doc === undefined) notFound();
  return <LegalDocument doc={doc} />;
}
