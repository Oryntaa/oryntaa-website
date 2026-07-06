import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';

import { getLegalDoc } from '@/lib/content/legal';
import { buildMetadata } from '@/lib/seo/metadata';

import { LegalDocument } from '@/components/sections/legal/LegalDocument';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Oryntaa handles personal information collected through this website.',
  path: routes.privacy,
});

export default function PrivacyPage(): React.JSX.Element {
  const doc = getLegalDoc('privacy');
  if (doc === undefined) notFound();
  return <LegalDocument doc={doc} />;
}
