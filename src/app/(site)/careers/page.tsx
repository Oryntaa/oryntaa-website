import type { Metadata } from 'next';

import { routes } from '@/config/routes';

import { getOpenings } from '@/lib/content/careers';
import { getSite } from '@/lib/content/site';
import { buildMetadata } from '@/lib/seo/metadata';

import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { SiteCta } from '@/components/sections/shared/SiteCta';
import { ButtonLink } from '@/components/ui/ButtonLink';

import { careersPage } from '@/content/careers-page';

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
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

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

      <SiteCta />
    </>
  );
}
