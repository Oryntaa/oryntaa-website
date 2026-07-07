import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';

import { getProject, getProjectCaseStudy, getProjects } from '@/lib/content/projects';
import { getService } from '@/lib/content/services';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/layout/Container';
import { HorizonBackdrop } from '@/components/layout/HorizonBackdrop';
import { Mdx } from '@/components/mdx/Mdx';
import { Reveal } from '@/components/motion/Reveal';
import { SiteCta } from '@/components/sections/shared/SiteCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { TagList } from '@/components/ui/TagList';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const TYPE_LABEL: Record<string, string> = { web: 'Web', mobile: 'Mobile', ai: 'AI', saas: 'SaaS' };

export function generateStaticParams(): { slug: string }[] {
  return getProjects({ publishedOnly: true }).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (project === undefined) return {};
  return buildMetadata({
    title: project.name,
    description: project.seo.description,
    path: routes.project(slug),
    ogType: 'work',
  });
}

/** Case-study detail (PAGE_SPECIFICATIONS §5): hero → Snapshot → narrative (MDX) → Technology →
 *  Next project → CTA. Only published + granted projects resolve. */
export default async function ProjectDetailPage({
  params,
}: ProjectPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const project = getProject(slug);
  if (project === undefined) notFound();

  const body = getProjectCaseStudy(slug);
  const serviceNames = project.services
    .map((serviceSlug) => getService(serviceSlug)?.name ?? serviceSlug)
    .join(', ');

  const published = getProjects({ publishedOnly: true });
  const currentIndex = published.findIndex((entry) => entry.slug === slug);
  const nextProject = published[(currentIndex + 1) % published.length];

  const snapshot: { label: string; value: React.ReactNode }[] = [
    { label: 'Product', value: project.name },
    { label: 'Industry', value: project.industry },
    { label: 'Services', value: serviceNames },
    { label: 'Platform', value: project.platform },
    {
      label: 'Year',
      value: typeof project.year === 'number' ? String(project.year) : 'In production',
    },
    {
      label: 'Status',
      value:
        project.liveUrl !== undefined ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text hover:underline"
          >
            Live
          </a>
        ) : (
          'Delivered'
        ),
    },
    { label: 'Engagement', value: project.engagement },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: routes.home },
          { name: 'Work', path: routes.work },
          { name: project.name, path: routes.project(slug) },
        ])}
      />
      {/* Hero */}
      <section className="bg-canvas relative overflow-hidden">
        <HorizonBackdrop />
        <Container className="relative flex flex-col gap-8 pt-10 pb-16 lg:pt-14 lg:pb-20">
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Work', href: routes.work },
            ]}
            current={project.name}
          />

          <div className="flex flex-col gap-5">
            <Reveal>
              <Eyebrow>{TYPE_LABEL[project.type] ?? project.type}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading level={1} size="display-lg" className="max-w-3xl">
                {project.name}
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-lg text-ink-muted max-w-2xl">{project.oneLiner}</p>
            </Reveal>
            {project.liveUrl !== undefined ? (
              <Reveal delay={0.15}>
                <ArrowLink href={project.liveUrl} external>
                  Visit live site
                </ArrowLink>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.1}>
            <div
              className="border-line bg-brand-50 shadow-raised relative overflow-hidden rounded-xl border"
              style={{ aspectRatio: '16 / 9' }}
            >
              <Image
                src={project.cover}
                alt={`${project.name} product screenshot`}
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover object-top"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Snapshot */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <Eyebrow>Snapshot</Eyebrow>
          </Reveal>
          <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {snapshot.map((row) => (
              <div key={row.label} className="border-line flex flex-col gap-1 border-t pt-4">
                <dt className="text-body-sm text-ink-muted font-mono uppercase">{row.label}</dt>
                <dd className="text-body text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Narrative */}
      {body !== undefined ? (
        <section className="section-y bg-canvas">
          <Container>
            <div className="max-w-3xl">
              <Mdx source={body} />
            </div>
          </Container>
        </section>
      ) : null}

      {/* Technology */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <Eyebrow>Technology</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <TagList items={project.technologies} className="mt-8" />
          </Reveal>
        </Container>
      </section>

      {/* Next project */}
      {nextProject !== undefined && nextProject.slug !== slug ? (
        <section className="section-y bg-canvas">
          <Container>
            <Reveal>
              <div className="border-line flex flex-col gap-3 border-t pt-8">
                <span className="text-body-sm text-ink-muted font-mono uppercase">
                  Next project
                </span>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <Heading level={2} size="display-md">
                    {nextProject.name}
                  </Heading>
                  <ArrowLink href={routes.project(nextProject.slug)}>View case study</ArrowLink>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <SiteCta />
    </>
  );
}
