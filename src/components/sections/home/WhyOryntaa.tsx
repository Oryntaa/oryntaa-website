import { PrincipleCard } from '@/components/cards/PrincipleCard';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';

import { home } from '@/content/home';

/** "Why Oryntaa" — four differentiator principles (PAGE_SPECIFICATIONS §2). */
export function WhyOryntaa(): React.JSX.Element {
  const { why } = home;

  return (
    <section className="section-y bg-canvas">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={why.eyebrow} title={why.title} />
        </Reveal>

        <Stagger className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {why.principles.map((principle) => (
            <PrincipleCard key={principle.title} title={principle.title} body={principle.body} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
