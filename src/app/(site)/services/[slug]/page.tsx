import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { features } from '@/config/features';
import { routes } from '@/config/routes';

import { getProjects } from '@/lib/content/projects';
import { getService, getServices } from '@/lib/content/services';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

import { ProjectCard } from '@/components/cards/ProjectCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Container } from '@/components/layout/Container';
import { HorizonBackdrop } from '@/components/layout/HorizonBackdrop';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { FaqAccordion } from '@/components/sections/shared/FaqAccordion';
import { SiteCta } from '@/components/sections/shared/SiteCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { TagList } from '@/components/ui/TagList';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every service at build time (ROADMAP 6.3). */
export function generateStaticParams(): { slug: string }[] {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (service === undefined) return {};
  return buildMetadata({
    title: service.name,
    description: service.seo.description,
    path: routes.service(slug),
    ogType: 'service',
  });
}

/** Service detail template (PAGE_SPECIFICATIONS §4) — every section fed from the service content
 *  module. Related Work is hidden when the service has no published projects tagged to it. */
export default async function ServiceDetailPage({
  params,
}: ServicePageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const service = getService(slug);
  if (service === undefined) notFound();

  const relatedWork = getProjects({ publishedOnly: true }).filter((project) =>
    project.services.includes(slug),
  );
  const relatedServices = service.relatedServices
    .map((related) => getService(related))
    .filter((related): related is NonNullable<typeof related> => related !== undefined)
    .slice(0, 3);

  const structuredData = [
    serviceJsonLd({
      name: service.name,
      description: service.seo.description,
      path: routes.service(slug),
    }),
    faqJsonLd(service.faq),
    breadcrumbJsonLd([
      { name: 'Home', path: routes.home },
      { name: 'Services', path: routes.services },
      { name: service.name, path: routes.service(slug) },
    ]),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      {/* Hero */}
      <section className="bg-canvas relative overflow-hidden">
        <HorizonBackdrop />
        <Container className="relative grid items-center gap-12 pt-16 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-24 lg:pb-20">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Eyebrow>{service.name}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading level={1} size="display-lg">
                {service.heroTitle}
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-lg text-ink-muted max-w-xl">{service.heroDescription}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={routes.contact({ intent: 'project' })} size="lg">
                  Start a Project
                </ButtonLink>
                {features.booking.enabled ? (
                  <ButtonLink href={routes.book} variant="secondary" size="lg">
                    Book a Call
                  </ButtonLink>
                ) : null}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div
              className="border-line bg-brand-50 shadow-raised relative overflow-hidden rounded-xl border"
              style={{ aspectRatio: '4 / 3' }}
            >
              <Image
                src={`/images/sections/services/${service.slug}.jpg`}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-60 mix-blend-multiply"
                style={{
                  backgroundImage:
                    'linear-gradient(150deg, color-mix(in oklab, var(--color-brand-500) 30%, transparent), transparent 70%)',
                }}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Overview */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <Eyebrow>Overview</Eyebrow>
          </Reveal>
          <div className="mt-8 flex max-w-3xl flex-col gap-6">
            {service.overview.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.05}>
                <p className="text-body-lg text-ink-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Problems we solve */}
      <section className="section-y bg-canvas">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="What we fix" title="Problems we solve." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {service.problems.map((problem) => (
              <div
                key={problem.title}
                className="border-line bg-surface flex flex-col gap-3 rounded-xl border p-8"
              >
                <span aria-hidden className="bg-accent h-1 w-8 rounded-full" />
                <h3 className="font-display text-display-sm text-ink">{problem.title}</h3>
                <p className="text-body text-ink-muted">{problem.body}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Capabilities" title="What this service covers." />
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((capability) => (
              <div
                key={capability.title}
                className="border-line bg-canvas flex items-start gap-4 rounded-xl border p-6"
              >
                <span className="bg-accent/10 text-accent flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Check size={18} aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-ink text-base">{capability.title}</h3>
                  {capability.body !== undefined ? (
                    <p className="text-body-sm text-ink-muted">{capability.body}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Our approach */}
      <section className="section-y bg-canvas">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="How we work" title="Our approach." />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.approach.map((step, index) => (
              <div
                key={step.step}
                className="border-line bg-surface flex flex-col gap-3 rounded-xl border p-6"
              >
                <span
                  aria-hidden
                  className="font-display text-display-md text-accent/30 leading-none tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-ink text-lg">{step.step}</h3>
                <p className="text-body-sm text-ink-muted">{step.body}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Technologies */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Technologies" title="The stack behind it." />
          </Reveal>
          <Reveal delay={0.1}>
            <TagList items={service.technologies} className="mt-10" />
          </Reveal>
        </Container>
      </section>

      {/* Related work (hidden if none) */}
      {relatedWork.length > 0 ? (
        <section className="section-y bg-canvas">
          <Container>
            <Reveal>
              <SectionHeader
                eyebrow="Proof"
                title="Related work."
                action={<ArrowLink href={routes.work}>View all work</ArrowLink>}
              />
            </Reveal>
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedWork.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={{
                    slug: project.slug,
                    name: project.name,
                    type: project.type,
                    oneLiner: project.oneLiner,
                    industry: project.industry,
                    cover: project.cover,
                  }}
                />
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      {/* Related services */}
      {relatedServices.length > 0 ? (
        <section className="section-y bg-surface">
          <Container>
            <Reveal>
              <SectionHeader
                eyebrow="Keep exploring"
                title="Related services."
                action={<ArrowLink href={routes.services}>All services</ArrowLink>}
              />
            </Reveal>
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <ServiceCard
                  key={related.slug}
                  service={{
                    slug: related.slug,
                    name: related.name,
                    oneLiner: related.oneLiner,
                    tags: related.capabilities.slice(0, 3).map((capability) => capability.title),
                  }}
                />
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="section-y bg-canvas">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="FAQ" title="Questions, answered." />
          </Reveal>
          <div className="mt-12 max-w-3xl">
            <FaqAccordion items={service.faq} />
          </div>
        </Container>
      </section>

      <SiteCta />
    </>
  );
}
