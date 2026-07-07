import { routes } from '@/config/routes';

import { ARTICLE_CATEGORY_LABEL } from '@/lib/content/labels';
import { formatDate } from '@/lib/utils/format';

import { ArrowLink } from '@/components/ui/ArrowLink';

export interface ArticleCardItem {
  slug: string;
  title: string;
  category: 'ai' | 'engineering' | 'product' | 'design' | 'oryntaa';
  excerpt: string;
  author: string;
  publishedAt: Date;
  readingTimeMinutes: number;
}

interface ArticleCardProps {
  article: ArticleCardItem;
}

/** An article preview (PAGE_SPECIFICATIONS §2): editorial column with a top rule, category + read
 *  time, title, excerpt, byline, and a "Read article" link. Copy comes from the article frontmatter. */
export function ArticleCard({ article }: ArticleCardProps): React.JSX.Element {
  return (
    <article className="border-line flex h-full flex-col gap-4 border-t pt-6">
      <div className="flex items-center justify-between">
        <span className="text-body-sm text-accent-text font-mono uppercase">
          {ARTICLE_CATEGORY_LABEL[article.category]}
        </span>
        <span className="text-body-sm text-ink-muted font-mono">
          {article.readingTimeMinutes} min read
        </span>
      </div>

      <h3 className="font-display text-display-sm text-ink">{article.title}</h3>
      <p className="text-body text-ink-muted flex-1">{article.excerpt}</p>

      <p className="text-body-sm text-ink-muted flex items-center gap-2 font-mono">
        <span>{article.author}</span>
        <span aria-hidden>·</span>
        <span>{formatDate(article.publishedAt)}</span>
      </p>

      <ArrowLink href={routes.article(article.slug)}>Read article</ArrowLink>
    </article>
  );
}
