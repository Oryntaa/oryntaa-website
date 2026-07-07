import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';

import { getLegalDoc } from '@/lib/content/legal';
import { buildMetadata } from '@/lib/seo/metadata';

import { LegalDocument } from '@/components/sections/legal/LegalDocument';

export const metadata: Metadata = buildMetadata({
  title: 'Code of Conduct',
  description: 'The standards Oryntaa holds itself and its collaborators to.',
  path: routes.codeOfConduct,
});

export default function CodeOfConductPage(): React.JSX.Element {
  const doc = getLegalDoc('code-of-conduct');
  if (doc === undefined) notFound();
  return <LegalDocument doc={doc} />;
}
