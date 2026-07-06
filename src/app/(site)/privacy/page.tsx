import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getLegalDoc } from '@/lib/content/legal';

import { LegalDocument } from '@/components/sections/legal/LegalDocument';

export const metadata: Metadata = {
  title: 'Privacy Policy | Oryntaa',
  description: 'How Oryntaa handles personal information collected through this website.',
};

export default function PrivacyPage(): React.JSX.Element {
  const doc = getLegalDoc('privacy');
  if (doc === undefined) notFound();
  return <LegalDocument doc={doc} />;
}
