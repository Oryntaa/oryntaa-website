import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getLegalDoc } from '@/lib/content/legal';

import { LegalDocument } from '@/components/sections/legal/LegalDocument';

export const metadata: Metadata = {
  title: 'Terms of Service | Oryntaa',
  description: "The terms governing use of Oryntaa's website.",
};

export default function TermsPage(): React.JSX.Element {
  const doc = getLegalDoc('terms');
  if (doc === undefined) notFound();
  return <LegalDocument doc={doc} />;
}
