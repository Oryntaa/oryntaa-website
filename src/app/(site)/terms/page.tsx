import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';

import { getLegalDoc } from '@/lib/content/legal';
import { buildMetadata } from '@/lib/seo/metadata';

import { LegalDocument } from '@/components/sections/legal/LegalDocument';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: "The terms governing use of Oryntaa's website.",
  path: routes.terms,
});

export default function TermsPage(): React.JSX.Element {
  const doc = getLegalDoc('terms');
  if (doc === undefined) notFound();
  return <LegalDocument doc={doc} />;
}
