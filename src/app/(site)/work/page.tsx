import type { Metadata } from 'next';
import Link from 'next/link';

import { routes } from '@/config/routes';

import { getProjects } from '@/lib/content/projects';
import type { ProjectMeta } from '@/lib/content/schemas';
import { buildMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils/cn';

import { ProjectCard } from '@/components/cards/ProjectCard';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { SiteCta } from '@/components/sections/shared/SiteCta';

import { workPage } from '@/content/work-page';

export const metadata: Metadata = buildMetadata({
  title: 'Work',
  description:
    "Selected products delivered by Oryntaa's founding team — web, mobile, AI, and SaaS.",
  path: routes.work,
});

interface WorkPageProps {
  searchParams: Promise<{ type?: string }>;
}

const TYPES: ProjectMeta['type'][] = ['web', 'mobile', 'ai', 'saas'];

function isProjectType(value: string | undefined): value is ProjectMeta['type'] {
  return value !== undefined && (TYPES as string[]).includes(value);
}

/** Work grid (PAGE_SPECIFICATIONS §5) — hero, type filter (URL param `?type=`), published projects,
 *  CTA. Filtering is server-side; the filter bar is a set of links, so it works without JS. */
export default async function WorkPage({
  searchParams,
}: WorkPageProps): Promise<React.JSX.Element> {
  const { type } = await searchParams;
  const activeType = isProjectType(type) ? type : null;

  const projects = getProjects({ publishedOnly: true })
    .filter((project) => activeType === null || project.type === activeType)
    .map((project) => ({
      slug: project.slug,
      name: project.name,
      type: project.type,
      oneLiner: project.oneLiner,
      industry: project.industry,
      cover: project.cover,
    }));

  return (
    <>
      <PageHero
        eyebrow={workPage.hero.eyebrow}
        title={workPage.hero.title}
        description={workPage.hero.description}
      />

      <section className="section-y bg-canvas pt-0">
        <Container>
          <Reveal>
            <div className="border-line flex flex-wrap gap-2 border-b pb-6">
              {workPage.filters.map((filter) => {
                const active = filter.value === activeType;
                const href =
                  filter.value === null ? routes.work : `${routes.work}?type=${filter.value}`;
                return (
                  <Link
                    key={filter.label}
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
                    {filter.label}
                  </Link>
                );
              })}
            </div>
          </Reveal>

          {projects.length > 0 ? (
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </Stagger>
          ) : (
            <p className="text-body-lg text-ink-muted mt-10">No projects in this category yet.</p>
          )}
        </Container>
      </section>

      <SiteCta />
    </>
  );
}
