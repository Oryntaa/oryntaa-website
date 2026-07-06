import { ArticleCard, type ArticleCardItem } from '@/components/cards/ArticleCard';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { ArrowLink } from '@/components/ui/ArrowLink';

interface InsightsPreviewProps {
  eyebrow: string;
  title: string;
  viewAll: { label: string; href: string };
  articles: ArticleCardItem[];
}

/** "Insights" — a preview of the three newest articles (PAGE_SPECIFICATIONS §2). Editorial columns,
 *  staggered in on scroll. Gated by features.insights; the page only renders it when the gate is on. */
export function InsightsPreview({
  eyebrow,
  title,
  viewAll,
  articles,
}: InsightsPreviewProps): React.JSX.Element {
  return (
    <section className="section-y bg-canvas">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            action={<ArrowLink href={viewAll.href}>{viewAll.label}</ArrowLink>}
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
