import type { Metadata } from 'next';

import { routes } from '@/config/routes';

import { getFounders } from '@/lib/content/founders';
import { buildMetadata } from '@/lib/seo/metadata';

import { FounderCard } from '@/components/cards/FounderCard';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { Stagger } from '@/components/motion/Stagger';
import { CtaSection } from '@/components/sections/shared/CtaSection';

import { home } from '@/content/home';
import { leadershipPage } from '@/content/leadership-page';

export const metadata: Metadata = buildMetadata({
  title: 'Leadership',
  description: 'The four founders building Oryntaa — equal partners, senior engineers, hands on.',
  path: routes.leadership,
});

export default function LeadershipPage(): React.JSX.Element {
  const { hero, cta } = leadershipPage;
  const founders = getFounders();

  return (
    <>
      <PageHero
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home },
            { label: 'About', href: routes.about },
          ],
          current: 'Leadership',
        }}
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
      />

      <section className="section-y bg-canvas pt-0">
        <Container>
          <Stagger className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {founders.map((founder) => (
              <FounderCard key={founder.slug} founder={founder} showIntro />
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaSection
        title={cta.title}
        description={cta.description}
        primary={home.cta.primary}
        secondary={home.cta.secondary}
      />
    </>
  );
}
