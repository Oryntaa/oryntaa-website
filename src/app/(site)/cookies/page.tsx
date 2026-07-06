import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getLegalDoc } from '@/lib/content/legal';

import { LegalDocument } from '@/components/sections/legal/LegalDocument';

export const metadata: Metadata = {
  title: 'Cookie Policy | Oryntaa',
  description: "Oryntaa's cookieless-analytics posture and use of essential cookies.",
};

export default function CookiesPage(): React.JSX.Element {
  const doc = getLegalDoc('cookies');
  if (doc === undefined) notFound();
  return <LegalDocument doc={doc} />;
}
