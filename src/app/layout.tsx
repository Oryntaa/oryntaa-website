import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';

import { getFounders } from '@/lib/content/founders';
import { getSite } from '@/lib/content/site';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

import { Analytics } from '@/components/analytics/Analytics';
import { JsonLd } from '@/components/seo/JsonLd';

import '@/styles/globals.css';
import '@/styles/prose.css';

// Display / body / utility faces (DESIGN_SYSTEM §4). Variable fonts, self-hosted via next/font
// (zero layout shift); their CSS variables are consumed by the @theme font tokens in globals.css.
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

/** Site-wide default metadata (SEO_ARCHITECTURE §2). Pages override with their own factory call. */
export const metadata: Metadata = buildMetadata({
  description: getSite().description,
  path: '/',
  ogType: 'default',
});

/** Mobile browser-chrome tint — matches the canvas the nav sits on (DESIGN_SYSTEM §2). */
export const viewport: Viewport = {
  themeColor: '#fafaf9',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  const site = getSite();
  const socials = [site.socials.linkedin, site.socials.instagram, site.socials.facebook].filter(
    (value): value is string => value !== undefined,
  );
  const organization = organizationJsonLd({
    name: site.name,
    description: site.description,
    email: site.email,
    socials,
    founders: getFounders().map((founder) => ({ name: founder.name })),
  });

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <JsonLd data={[organization, websiteJsonLd(site.name)]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
