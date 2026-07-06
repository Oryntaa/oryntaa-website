import type { Metadata } from 'next';

import { routes } from '@/config/routes';

import { getOpenings } from '@/lib/content/careers';
import { getSite } from '@/lib/content/site';
import { buildMetadata } from '@/lib/seo/metadata';

import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { CtaSection } from '@/components/sections/shared/CtaSection';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';

import { careersPage } from '@/content/careers-page';
import { home } from '@/content/home';

export const metadata: Metadata = buildMetadata({
  title: 'Careers',
  description:
    'Build meaningful technology with a small, senior team. See open roles at Oryntaa, or follow us on LinkedIn for future positions.',
  path: routes.careers,
});

export default function CareersPage(): React.JSX.Element {
  const { hero, why, openings: openingsCopy, emptyState } = careersPage;
  const openings = getOpenings().filter((opening) => opening.status === 'open');
  const linkedin = getSite().socials.linkedin;

  return (
    <>
      <section className="bg-canvas relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(55% 55% at 20% 0%, color-mix(in oklab, var(--color-brand-200) 40%, transparent), transparent 60%)',
          }}
        />
        <Container className="relative flex flex-col items-start gap-6 pt-16 pb-16 lg:pt-24 lg:pb-20">
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
        </Container>
      </section>

      {/* Why Oryntaa */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={why.eyebrow} title={why.title} />
          </Reveal>
          <Stagger className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {why.items.map((item) => (
              <div key={item.title} className="border-line flex flex-col gap-3 border-t pt-5">
                <h3 className="font-display text-ink text-lg">{item.title}</h3>
                <p className="text-body-sm text-ink-muted">{item.body}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Openings */}
      <section className="section-y bg-canvas">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={openingsCopy.eyebrow} title={openingsCopy.title} />
          </Reveal>

          {openings.length > 0 ? (
            <Stagger className="mt-10 flex flex-col">
              {openings.map((opening) => (
                <div
                  key={opening.slug}
                  className="border-line flex flex-col gap-2 border-t py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-display-sm text-ink">{opening.title}</h3>
                    <p className="text-body-sm text-ink-muted">{opening.description}</p>
                  </div>
                  <p className="text-body-sm text-ink-muted shrink-0 font-mono">
                    {opening.department} · {opening.location} · {opening.type}
                  </p>
                </div>
              ))}
            </Stagger>
          ) : (
            <Reveal>
              <div className="border-line bg-surface mt-10 flex flex-col items-start gap-4 rounded-xl border p-8 md:p-12">
                <h3 className="font-display text-display-sm text-ink">{emptyState.title}</h3>
                <p className="text-body-lg text-ink-muted max-w-xl">{emptyState.body}</p>
                {linkedin !== undefined ? (
                  <ButtonLink href={linkedin} variant="secondary" size="lg">
                    {emptyState.ctaLabel}
                  </ButtonLink>
                ) : null}
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <CtaSection
        title={home.cta.title}
        description={home.cta.description}
        primary={home.cta.primary}
        secondary={home.cta.secondary}
      />
    </>
  );
}
