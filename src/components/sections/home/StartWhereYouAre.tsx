import { StageCard } from '@/components/cards/StageCard';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { IndustriesStrip } from '@/components/sections/shared/IndustriesStrip';

import { home } from '@/content/home';

/** "Start where you are" — the four stage cards + the industries strip (PAGE_SPECIFICATIONS §2). */
export function StartWhereYouAre(): React.JSX.Element {
  const { stages } = home;

  return (
    <section className="section-y bg-canvas">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={stages.eyebrow} title={stages.title} lede={stages.description} />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {stages.items.map((item) => (
            <StageCard key={item.quote} quote={item.quote} body={item.body} link={item.link} />
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="border-line mt-12 border-t pt-8">
            <IndustriesStrip label={stages.industries.label} tags={stages.industries.tags} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
