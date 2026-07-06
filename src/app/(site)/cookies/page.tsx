import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';

import { getLegalDoc } from '@/lib/content/legal';
import { buildMetadata } from '@/lib/seo/metadata';

import { LegalDocument } from '@/components/sections/legal/LegalDocument';

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy',
  description: "Oryntaa's cookieless-analytics posture and use of essential cookies.",
  path: routes.cookies,
});

export default function CookiesPage(): React.JSX.Element {
  const doc = getLegalDoc('cookies');
  if (doc === undefined) notFound();
  return <LegalDocument doc={doc} />;
}
