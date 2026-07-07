import type { ArticleFrontmatter, ProjectMeta } from '@/lib/content/schemas';

/** Display labels for content enums — one definition so a badge reads identically everywhere. */
export const PROJECT_TYPE_LABEL: Record<ProjectMeta['type'], string> = {
  web: 'Web',
  mobile: 'Mobile',
  ai: 'AI',
  saas: 'SaaS',
};

export const ARTICLE_CATEGORY_LABEL: Record<ArticleFrontmatter['category'], string> = {
  ai: 'AI',
  engineering: 'Engineering',
  product: 'Product',
  design: 'Design',
  oryntaa: 'Oryntaa',
};
