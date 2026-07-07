'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

import {
  FeaturedProjectCard,
  type FeaturedProjectItem,
} from '@/components/cards/FeaturedProjectCard';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowLink } from '@/components/ui/ArrowLink';

interface SelectedWorkProps {
  eyebrow: string;
  title: string;
  viewAll: { label: string; href: string };
  projects: FeaturedProjectItem[];
}

/** Sticky offset (rem) where the first card pins; each subsequent card pins a little lower so the
 *  card beneath keeps a visible top sliver — the "stacked deck" look. */
const BASE_TOP = 6;
const STEP = 2.5;

/** One card in the stack. It pins on scroll and scales down slightly as the cards after it rise to
 *  cover it, so the deck appears to recede (gated off under reduced-motion). */
function StackedCard({
  project,
  index,
  total,
  progress,
  reduced,
}: {
  project: FeaturedProjectItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}): React.JSX.Element {
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky" style={{ top: `${String(BASE_TOP + index * STEP)}rem` }}>
      <motion.div className="origin-top" style={{ scale: reduced ? 1 : scale }}>
        <FeaturedProjectCard project={project} index={index} />
      </motion.div>
    </div>
  );
}

/** "Selected work" — the featured projects as a scroll-stacked deck (PAGE_SPECIFICATIONS §2,
 *  approved design). Gated by features.work; the page only renders it when the work gate is on. */
export function SelectedWork({
  eyebrow,
  title,
  viewAll,
  projects,
}: SelectedWorkProps): React.JSX.Element {
  const reduced = usePrefersReducedMotion();
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="section-y bg-canvas">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            action={<ArrowLink href={viewAll.href}>{viewAll.label}</ArrowLink>}
          />
        </Reveal>

        <div ref={stackRef} className="mt-14 flex flex-col gap-8">
          {projects.map((project, index) => (
            <StackedCard
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
