import { getArticles } from '@/lib/content/insights';
import { getProjects } from '@/lib/content/projects';

/**
 * Content-derived counts consumed by config/features.ts to compute gate flags
 * (CONTENT_ARCHITECTURE §6). Evaluated at build; a flag flip is a deploy.
 */
export const derived = {
  publishedProjects: getProjects({ publishedOnly: true }).length,
  publishedArticles: getArticles().filter((article) => article.status === 'published').length,
};
