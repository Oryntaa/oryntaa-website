import { cache } from 'react';

import { projectMetaSchema, type ProjectMeta } from '@/lib/content/schemas';

import { projects } from '@/content/projects';

interface GetProjectsOptions {
  type?: ProjectMeta['type'];
  publishedOnly?: boolean;
}

/** A project is publicly renderable only when published AND not pending clearance (§5). */
function isPublished(project: ProjectMeta): boolean {
  return project.status === 'published' && project.permission !== 'pending';
}

const allProjects = cache((): ProjectMeta[] => projectMetaSchema.array().parse(projects));

/** Projects, optionally filtered by type and to publicly-renderable ones (CONTENT_ARCHITECTURE §3). */
export function getProjects(options: GetProjectsOptions = {}): ProjectMeta[] {
  let result = allProjects();
  if (options.publishedOnly === true) result = result.filter(isPublished);
  if (options.type !== undefined)
    result = result.filter((project) => project.type === options.type);
  return result;
}

/** The featured projects (up to three), ordered by their `featured` position. */
export function getFeaturedProjects(): ProjectMeta[] {
  return getProjects({ publishedOnly: true })
    .filter(
      (project): project is ProjectMeta & { featured: number } => project.featured !== undefined,
    )
    .sort((a, b) => a.featured - b.featured);
}
