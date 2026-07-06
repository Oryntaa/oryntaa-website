import type { Metadata } from 'next';

import { routes } from '@/config/routes';

import { getFounders } from '@/lib/content/founders';
import { buildMetadata } from '@/lib/seo/metadata';

import { FounderCard } from '@/components/cards/FounderCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { CtaSection } from '@/components/sections/shared/CtaSection';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';

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
      <section className="bg-canvas relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(55% 55% at 20% 0%, color-mix(in oklab, var(--color-brand-200) 40%, transparent), transparent 60%)',
          }}
        />
        <Container className="relative flex flex-col gap-8 pt-10 pb-14 lg:pt-14 lg:pb-16">
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'About', href: routes.about },
            ]}
            current="Leadership"
          />
          <div className="flex flex-col items-start gap-6">
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
          </div>
        </Container>
      </section>

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
