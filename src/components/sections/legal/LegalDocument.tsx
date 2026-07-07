import { routes } from '@/config/routes';

import type { LegalDoc } from '@/lib/content/legal';
import { getSite } from '@/lib/content/site';
import { cn } from '@/lib/utils/cn';
import { formatDateLong } from '@/lib/utils/format';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/layout/Container';
import { Mdx } from '@/components/mdx/Mdx';
import { Heading } from '@/components/ui/Heading';

interface LegalDocumentProps {
  doc: LegalDoc;
}

/** Legal document template (PAGE_SPECIFICATIONS §11): H1, last-updated, auto TOC, prose body, and a
 *  contact block. Shared by all four legal routes. */
export function LegalDocument({ doc }: LegalDocumentProps): React.JSX.Element {
  const email = getSite().email;

  return (
    <section className="bg-canvas">
      <Container className="py-16 lg:py-24">
        <Breadcrumbs
          items={[{ label: 'Home', href: routes.home }]}
          current={doc.frontmatter.title}
        />

        <div className="mt-8 flex flex-col gap-3">
          <Heading level={1} size="display-lg">
            {doc.frontmatter.title}
          </Heading>
          <p className="text-body-sm text-ink-muted font-mono">
            Last updated {formatDateLong(doc.frontmatter.updatedAt)}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-16">
          {doc.toc.length > 0 ? (
            <aside className="lg:sticky lg:top-24 lg:w-56 lg:shrink-0 lg:self-start">
              <nav aria-label="On this page">
                <p className="text-body-sm text-ink-muted mb-3 font-mono uppercase">On this page</p>
                <ul className="border-line flex flex-col border-l">
                  {doc.toc.map((entry) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className={cn(
                          'text-body-sm text-ink-muted hover:text-accent-text hover:border-accent -ml-px block border-l border-transparent py-1.5',
                          entry.level === 3 ? 'pl-8' : 'pl-4',
                        )}
                      >
                        {entry.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          ) : null}

          <div className="max-w-2xl flex-1">
            <Mdx source={doc.body} />
            <div className="border-line mt-12 border-t pt-6">
              <p className="text-body-sm text-ink-muted">
                Questions about this document? Email{' '}
                <a
                  href={`mailto:${email}`}
                  className="text-accent-text underline underline-offset-4"
                >
                  {email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
