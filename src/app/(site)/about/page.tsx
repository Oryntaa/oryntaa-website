import type { Metadata } from 'next';

import { routes } from '@/config/routes';

import { getFounders } from '@/lib/content/founders';
import { buildMetadata } from '@/lib/seo/metadata';

import { FounderCard } from '@/components/cards/FounderCard';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { CtaSection } from '@/components/sections/shared/CtaSection';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';

import { aboutPage } from '@/content/about-page';
import { home } from '@/content/home';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'Oryntaa is an AI-first software engineering company — founder-led, quality without compromise, built for long-term growth.',
  path: routes.about,
});

export default function AboutPage(): React.JSX.Element {
  const { hero, story, missionVision, principles, howWeBuild, leadership, careers } = aboutPage;
  const founders = getFounders();

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} />

      {/* Our story */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={story.eyebrow} title={story.title} />
          </Reveal>
          <div className="mt-10 flex max-w-3xl flex-col gap-6">
            {story.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.05}>
                <p className="text-body-lg text-ink-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & vision */}
      <section className="section-y bg-canvas">
        <Container>
          <Reveal>
            <Eyebrow>{missionVision.eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            {[missionVision.mission, missionVision.vision].map((block) => (
              <Reveal key={block.label}>
                <div className="border-line flex flex-col gap-4 border-t pt-6">
                  <span className="text-body-sm text-accent-text font-mono uppercase">
                    {block.label}
                  </span>
                  <p className="font-display text-display-sm text-ink">{block.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={principles.eyebrow} title={principles.title} />
          </Reveal>
          <Stagger className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {principles.items.map((principle) => (
              <div key={principle.title} className="flex flex-col gap-3">
                <h3 className="font-display text-display-sm text-ink">{principle.title}</h3>
                <p className="text-body text-ink-muted max-w-md">{principle.body}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* How we build */}
      <section className="section-y bg-canvas">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={howWeBuild.eyebrow}
              title={howWeBuild.title}
              lede={howWeBuild.intro}
              action={
                <ArrowLink href={howWeBuild.articleLink.href}>
                  {howWeBuild.articleLink.label}
                </ArrowLink>
              }
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {howWeBuild.items.map((item, index) => (
              <div key={item.title} className="border-line flex flex-col gap-3 border-t pt-5">
                <span className="text-body-sm text-accent-text font-mono tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-ink text-lg">{item.title}</h3>
                <p className="text-body-sm text-ink-muted">{item.body}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Leadership preview */}
      <section className="section-y bg-surface">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={leadership.eyebrow}
              title={leadership.title}
              action={
                <ArrowLink href={leadership.viewAll.href}>{leadership.viewAll.label}</ArrowLink>
              }
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {founders.map((founder) => (
              <FounderCard key={founder.slug} founder={founder} />
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Careers strip */}
      <section className="bg-canvas py-16">
        <Container>
          <Reveal>
            <div className="border-line flex flex-col items-start justify-between gap-6 rounded-xl border p-8 md:flex-row md:items-center md:p-10">
              <div className="flex flex-col gap-2">
                <span className="text-body-sm text-accent-text font-mono uppercase">
                  {careers.eyebrow}
                </span>
                <h2 className="font-display text-display-sm text-ink">{careers.title}</h2>
                <p className="text-body text-ink-muted max-w-xl">{careers.body}</p>
              </div>
              <ButtonLink href={careers.cta.href} variant="secondary" size="lg">
                {careers.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
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
