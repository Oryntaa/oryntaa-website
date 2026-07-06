import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';

import { getProject, getProjectCaseStudy, getProjects } from '@/lib/content/projects';
import { getService } from '@/lib/content/services';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/layout/Container';
import { Mdx } from '@/components/mdx/Mdx';
import { Reveal } from '@/components/motion/Reveal';
import { CtaSection } from '@/components/sections/shared/CtaSection';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';

import { home } from '@/content/home';

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
  return { title: project.seo.title, description: project.seo.description };
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
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="border-line bg-canvas text-body-sm text-ink-muted rounded-full border px-4 py-2 font-mono"
                >
                  {tech}
                </li>
              ))}
            </ul>
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

      <CtaSection
        title={home.cta.title}
        description={home.cta.description}
        primary={home.cta.primary}
        secondary={home.cta.secondary}
      />
    </>
  );
}
