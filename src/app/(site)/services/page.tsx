import type { Metadata } from 'next';

import { features } from '@/config/features';
import { routes } from '@/config/routes';

import { getFeaturedProjects } from '@/lib/content/projects';
import { getServices } from '@/lib/content/services';
import { buildMetadata } from '@/lib/seo/metadata';

import { ServiceCard } from '@/components/cards/ServiceCard';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { SelectedWork } from '@/components/sections/home/SelectedWork';
import { CtaSection } from '@/components/sections/shared/CtaSection';
import { ProcessSteps } from '@/components/sections/shared/ProcessSteps';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';

import { home } from '@/content/home';
import { servicesPage } from '@/content/services-page';

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Custom software development, from strategy to scale — AI, web, mobile, SaaS/MVP, UI/UX, and cloud, delivered by a founding team that stays accountable end to end.',
  path: routes.services,
});

/** Services overview (PAGE_SPECIFICATIONS §3): hero, service grid, how-services-connect, engagement
 *  models, process, gated Selected Work, CTA. */
export default function ServicesOverviewPage(): React.JSX.Element {
  const { hero, grid, connect, engagementModels } = servicesPage;

  const services = getServices().map((service) => ({
    slug: service.slug,
    name: service.name,
    oneLiner: service.oneLiner,
    tags: service.capabilities.slice(0, 3).map((capability) => capability.title),
  }));

  const featuredProjects = getFeaturedProjects().map((project) => ({
    slug: project.slug,
    name: project.name,
    type: project.type,
    summary: project.summary,
    liveUrl: project.liveUrl,
    cover: project.cover,
  }));

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(55% 55% at 20% 0%, color-mix(in oklab, var(--color-brand-200) 40%, transparent), transparent 60%)',
          }}
        />
        <Container className="relative flex flex-col items-start gap-6 pt-16 pb-20 lg:pt-24 lg:pb-24">
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading level={1} size="display-lg" className="max-w-3xl">
              {hero.title}
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-ink-muted max-w-2xl">{hero.description}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ButtonLink href={hero.cta.href} size="lg">
              {hero.cta.label}
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* Services grid */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={grid.eyebrow} title={grid.title} />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </Stagger>
        </Container>
      </section>

      {/* How services connect */}
      <section className="section-y bg-canvas">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeader eyebrow={connect.eyebrow} title={connect.title} />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-lg text-ink-muted lg:pt-8">{connect.body}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Engagement models */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={engagementModels.eyebrow} title={engagementModels.title} />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {engagementModels.items.map((model, index) => (
              <div
                key={model.title}
                className="border-line bg-canvas flex h-full flex-col gap-4 rounded-xl border p-8"
              >
                <span className="text-body-sm text-accent-text font-mono tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-display-sm text-ink">{model.title}</h3>
                <p className="text-body text-ink-muted">{model.body}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Process */}
      <ProcessSteps
        eyebrow={home.process.eyebrow}
        title={home.process.title}
        steps={home.process.steps}
      />

      {/* Selected work (gated) */}
      {features.work.enabled ? (
        <SelectedWork
          eyebrow={home.selectedWork.eyebrow}
          title={home.selectedWork.title}
          viewAll={home.selectedWork.viewAll}
          projects={featuredProjects}
        />
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
