'use client';

import { motion } from 'motion/react';

import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';

interface ProcessStep {
  title: string;
  body: string;
}

interface ProcessStepsProps {
  eyebrow: string;
  title: string;
  steps: ProcessStep[];
}

const EASE = [0.25, 1, 0.5, 1] as const;

/** "From idea to impact" — the five stages as an animated timeline (COMPONENT_LIBRARY §6). The
 *  connecting rail draws in on scroll (horizontal on desktop, vertical on mobile) and the numbered
 *  nodes reveal in sequence. The rail is inert under reduced-motion (ANIMATION_ARCHITECTURE §4). */
export function ProcessSteps({ eyebrow, title, steps }: ProcessStepsProps): React.JSX.Element {
  return (
    <section className="section-y bg-canvas">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting rail — horizontal on desktop, vertical on mobile; both draw in on scroll. */}
          <motion.span
            aria-hidden
            className="bg-line absolute top-6 right-0 left-0 hidden h-px origin-left md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: EASE }}
          />
          <motion.span
            aria-hidden
            className="bg-line absolute top-0 bottom-0 left-6 w-px origin-top md:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE }}
          />

          <Stagger className="grid gap-10 md:grid-cols-5 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="group relative flex flex-row items-start gap-5 md:flex-col md:items-center md:text-center"
              >
                <span className="bg-canvas border-line duration-base group-hover:border-accent relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors">
                  <span className="text-body-sm text-accent-text font-mono tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
                <div className="flex flex-col gap-2 md:items-center">
                  <h3 className="font-display text-display-sm text-ink">{step.title}</h3>
                  <p className="text-body-sm text-ink-muted">{step.body}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
