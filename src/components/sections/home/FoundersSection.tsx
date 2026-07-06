import { getFounders } from '@/lib/content/founders';

import { FounderCard } from '@/components/cards/FounderCard';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { ArrowLink } from '@/components/ui/ArrowLink';

import { home } from '@/content/home';

/** Founders grid (PAGE_SPECIFICATIONS §2). Renders the four founders from the content layer. */
export function FoundersSection(): React.JSX.Element {
  const { founders } = home;
  const list = getFounders();

  return (
    <section className="section-y bg-canvas">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={founders.eyebrow}
            title={founders.title}
            lede={founders.description}
            action={<ArrowLink href={founders.viewAll.href}>{founders.viewAll.label}</ArrowLink>}
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((founder) => (
            <FounderCard key={founder.slug} founder={founder} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
