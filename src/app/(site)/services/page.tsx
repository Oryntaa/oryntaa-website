import type { Metadata } from 'next';

import { features } from '@/config/features';
import { routes } from '@/config/routes';

import { getFeaturedProjects } from '@/lib/content/projects';
import { getServices } from '@/lib/content/services';
import { buildMetadata } from '@/lib/seo/metadata';

import { ServiceCard } from '@/components/cards/ServiceCard';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { SelectedWork } from '@/components/sections/home/SelectedWork';
import { ProcessSteps } from '@/components/sections/shared/ProcessSteps';
import { SiteCta } from '@/components/sections/shared/SiteCta';
import { ButtonLink } from '@/components/ui/ButtonLink';

import { home } from '@/content/home';
import { servicesPage } from '@/content/services-page';

export const metadata: Metadata = buildMetadata({
  ...servicesPage.seo,
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
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        actions={
          <ButtonLink href={hero.cta.href} size="lg">
            {hero.cta.label}
          </ButtonLink>
        }
      />

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

      <SiteCta />
    </>
  );
}
