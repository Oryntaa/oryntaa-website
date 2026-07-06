import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getLegalDoc } from '@/lib/content/legal';

import { LegalDocument } from '@/components/sections/legal/LegalDocument';

export const metadata: Metadata = {
  title: 'Code of Conduct | Oryntaa',
  description: 'The standards Oryntaa holds itself and its collaborators to.',
};

export default function CodeOfConductPage(): React.JSX.Element {
  const doc = getLegalDoc('code-of-conduct');
  if (doc === undefined) notFound();
  return <LegalDocument doc={doc} />;
}
