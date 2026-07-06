import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';

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

// TODO(content): the SEO metadata factory replaces this in Phase 12 (SEO_ARCHITECTURE).
export const metadata: Metadata = {
  title: 'Oryntaa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
