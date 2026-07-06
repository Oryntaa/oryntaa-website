import Link from 'next/link';

import { footerColumns, getVisibleFooterLinks, primaryCta } from '@/config/navigation';

import { ButtonLink } from '@/components/ui/ButtonLink';

import { Container } from './Container';

/**
 * Site footer (NAVIGATION_ARCHITECTURE §4) — the first real dark-section consumer. `data-theme`
 * flips the semantic tokens; the year is computed, never typed. The brand tagline and the Social
 * column move to content/site.ts in Phase 3.
 */
export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="bg-canvas text-ink">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/"
              className="font-display text-display-sm text-ink focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label="Oryntaa home"
            >
              Oryntaa
            </Link>
            {/* TODO(content): tagline + Social column come from content/site.ts in Phase 3. */}
            <p className="text-body-sm text-ink-muted max-w-xs">
              An AI-first software engineering company building intelligent digital products for
              organizations worldwide.
            </p>
            <ButtonLink href={primaryCta.href} size="sm">
              {primaryCta.label}
            </ButtonLink>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <span className="text-eyebrow text-ink-muted font-mono uppercase">{col.heading}</span>
              <ul className="flex flex-col gap-2">
                {getVisibleFooterLinks(col.links).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-ink-muted duration-fast hover:text-ink focus-visible:outline-accent transition focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-line border-t py-6">
          <p className="text-body-sm text-ink-muted">© {year} Oryntaa. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
