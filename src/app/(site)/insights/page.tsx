import type { Metadata } from 'next';
import Link from 'next/link';

import { routes } from '@/config/routes';

import { getFounders } from '@/lib/content/founders';
import { getArticles } from '@/lib/content/insights';
import { ARTICLE_CATEGORY_LABEL } from '@/lib/content/labels';
import { buildMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils/cn';
import { formatDate } from '@/lib/utils/format';

import { ArticleCard, type ArticleCardItem } from '@/components/cards/ArticleCard';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { SiteCta } from '@/components/sections/shared/SiteCta';
import { Heading } from '@/components/ui/Heading';

import { insightsPage } from '@/content/insights-page';

export const metadata: Metadata = buildMetadata({
  title: 'Insights',
  description:
    "Ideas, perspectives, and what we're learning — on AI, engineering, product, and how Oryntaa builds.",
  path: routes.insights,
});

interface InsightsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function InsightsListPage({
  searchParams,
}: InsightsPageProps): Promise<React.JSX.Element> {
  const { category } = await searchParams;
  const founderNames = new Map(getFounders().map((founder) => [founder.slug, founder.name]));

  const toItem = (article: ReturnType<typeof getArticles>[number]): ArticleCardItem => ({
    slug: article.slug,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    author: founderNames.get(article.author) ?? article.author,
    publishedAt: article.publishedAt,
    readingTimeMinutes: article.readingTimeMinutes,
  });

  const published = getArticles().filter((article) => article.status === 'published');
  const activeCategory =
    insightsPage.categories.find((entry) => entry.value === category)?.value ?? null;
  const filtered = published.filter(
    (article) => activeCategory === null || article.category === activeCategory,
  );

  const [featured, ...rest] = filtered;

  return (
    <>
      <PageHero eyebrow={insightsPage.hero.eyebrow} title={insightsPage.hero.title} />

      <section className="section-y bg-canvas pt-0">
        <Container>
          {/* Category filter */}
          <Reveal>
            <div className="border-line flex flex-wrap gap-2 border-b pb-6">
              {insightsPage.categories.map((entry) => {
                const active = entry.value === activeCategory;
                const href =
                  entry.value === null
                    ? routes.insights
                    : `${routes.insights}?category=${entry.value}`;
                return (
                  <Link
                    key={entry.label}
                    href={href}
                    scroll={false}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'duration-base focus-visible:outline-accent text-body-sm rounded-full border px-4 py-2 font-mono transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                      active
                        ? 'border-accent bg-accent text-accent-contrast'
                        : 'border-line text-ink-muted hover:border-ink-muted hover:text-ink',
                    )}
                  >
                    {entry.label}
                  </Link>
                );
              })}
            </div>
          </Reveal>

          {featured !== undefined ? (
            <Reveal delay={0.05}>
              <Link
                href={routes.article(featured.slug)}
                className="group border-line mt-10 flex flex-col gap-4 border-b pb-10"
              >
                <div className="text-body-sm text-ink-muted flex items-center gap-3 font-mono">
                  <span className="text-accent-text uppercase">
                    {ARTICLE_CATEGORY_LABEL[featured.category]}
                  </span>
                  <span>{featured.readingTimeMinutes} min read</span>
                </div>
                <Heading
                  level={2}
                  size="display-md"
                  className="group-hover:text-accent-text max-w-3xl transition-colors"
                >
                  {featured.title}
                </Heading>
                <p className="text-body-lg text-ink-muted max-w-2xl">{featured.excerpt}</p>
                <p className="text-body-sm text-ink-muted font-mono">
                  {founderNames.get(featured.author) ?? featured.author} ·{' '}
                  {formatDate(featured.publishedAt)}
                </p>
              </Link>
            </Reveal>
          ) : (
            <p className="text-body-lg text-ink-muted mt-10">No articles in this category yet.</p>
          )}

          {rest.length > 0 ? (
            <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.slug} article={toItem(article)} />
              ))}
            </Stagger>
          ) : null}
        </Container>
      </section>

      <SiteCta />
    </>
  );
}
