import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';

import { getFounders } from '@/lib/content/founders';
import { getArticle, getArticles, getRelatedArticles } from '@/lib/content/insights';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

import { ArticleCard, type ArticleCardItem } from '@/components/cards/ArticleCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Mdx } from '@/components/mdx/Mdx';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { CtaSection } from '@/components/sections/shared/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { Heading } from '@/components/ui/Heading';

import { home } from '@/content/home';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_LABEL: Record<string, string> = {
  ai: 'AI',
  engineering: 'Engineering',
  product: 'Product',
  design: 'Design',
  oryntaa: 'Oryntaa',
};

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

/** First + second initial for the author monogram. */
function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}

export function generateStaticParams(): { slug: string }[] {
  return getArticles()
    .filter((article) => article.status === 'published')
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (article === undefined) return {};
  return buildMetadata({
    title: article.meta.seo.title ?? article.meta.title,
    description: article.meta.seo.description ?? article.meta.excerpt,
    path: routes.article(slug),
    ogType: 'article',
  });
}

/** Article template (PAGE_SPECIFICATIONS §9): category → H1 → excerpt → author + date · read time →
 *  MDX body → related → CTA. Only published articles resolve. */
export default async function ArticlePage({
  params,
}: ArticlePageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (article === undefined || article.meta.status !== 'published') notFound();

  const { meta, body } = article;
  const founders = getFounders();
  const author = founders.find((founder) => founder.slug === meta.author);
  const authorName = author?.name ?? meta.author;

  const related = getRelatedArticles(slug).slice(0, 3);
  const relatedItems: ArticleCardItem[] = related.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    excerpt: entry.excerpt,
    author: founders.find((founder) => founder.slug === entry.author)?.name ?? entry.author,
    publishedAt: entry.publishedAt,
    readingTimeMinutes: entry.readingTimeMinutes,
  }));

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            headline: meta.title,
            description: meta.excerpt,
            path: routes.article(slug),
            authorName,
            publishedAt: meta.publishedAt,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: routes.home },
            { name: 'Insights', path: routes.insights },
            { name: meta.title, path: routes.article(slug) },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="bg-canvas relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(55% 55% at 20% 0%, color-mix(in oklab, var(--color-brand-200) 35%, transparent), transparent 60%)',
          }}
        />
        <Container className="relative flex flex-col gap-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Insights', href: routes.insights },
            ]}
            current={meta.title}
          />
          <div className="flex max-w-3xl flex-col gap-5">
            <div className="text-body-sm text-ink-muted flex items-center gap-3 font-mono">
              <span className="text-accent-text uppercase">
                {CATEGORY_LABEL[meta.category] ?? meta.category}
              </span>
              <span>{meta.readingTimeMinutes} min read</span>
            </div>
            <Reveal>
              <Heading level={1} size="display-lg">
                {meta.title}
              </Heading>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-body-lg text-ink-muted">{meta.excerpt}</p>
            </Reveal>
            <div className="border-line mt-2 flex items-center gap-3 border-t pt-5">
              <span
                aria-hidden
                className="border-line bg-brand-100 text-accent-text font-display flex size-10 items-center justify-center rounded-full border text-sm"
              >
                {initialsOf(authorName)}
              </span>
              <div className="flex flex-col">
                <span className="text-body-sm text-ink font-medium">{authorName}</span>
                <span className="text-body-sm text-ink-muted">
                  {author?.role ?? 'Oryntaa'} · {DATE_FORMAT.format(meta.publishedAt)}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="section-y bg-canvas pt-0">
        <Container>
          <div className="max-w-3xl">
            <Mdx source={body} />
          </div>
        </Container>
      </section>

      {/* Related */}
      {relatedItems.length > 0 ? (
        <section className="section-y bg-surface">
          <Container>
            <Reveal>
              <SectionHeader eyebrow="Keep reading" title="Related insights." />
            </Reveal>
            <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
              {relatedItems.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      <CtaSection
        title={home.cta.title}
        description={home.cta.description}
        primary={home.cta.primary}
        secondary={home.cta.secondary}
      />
    </>
  );
}
