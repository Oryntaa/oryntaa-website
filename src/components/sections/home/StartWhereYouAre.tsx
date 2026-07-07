'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils/cn';

import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { IndustriesStrip } from '@/components/sections/shared/IndustriesStrip';
import { ArrowLink } from '@/components/ui/ArrowLink';

import { home } from '@/content/home';

const EASE = [0.25, 1, 0.5, 1] as const;
const ADVANCE_MS = 5000;

/** "Start where you are" — an interactive stage selector (PAGE_SPECIFICATIONS §2). The four "where
 *  you are" quotes form a stepper on the left; picking one (or the gentle auto-advance) reveals how
 *  Oryntaa meets that stage in the panel on the right. Auto-advance pauses on hover/focus and is
 *  off under reduced-motion (ANIMATION_ARCHITECTURE §4). */
export function StartWhereYouAre(): React.JSX.Element {
  const { stages } = home;
  const items = stages.items;
  const count = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || prefersReducedMotion || count === 0) return;
    // Advance the featured stage on a fixed clock (external system: the auto-advance timer).
    const interval = window.setInterval(() => {
      setActive((index) => (index + 1) % count);
    }, ADVANCE_MS);
    return () => {
      window.clearInterval(interval);
    };
  }, [paused, prefersReducedMotion, count]);

  const current = items.at(active) ?? items.at(0);

  return (
    <section className="section-y bg-canvas">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={stages.eyebrow} title={stages.title} lede={stages.description} />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Selector — the four stages the reader might be in. */}
          <Reveal className="lg:col-span-2">
            <ul
              className="flex flex-col"
              onMouseLeave={() => {
                setPaused(false);
              }}
            >
              {items.map((item, index) => {
                const isActive = index === active;
                return (
                  <li key={item.quote} className="border-line border-b first:border-t">
                    <button
                      type="button"
                      aria-current={isActive}
                      onMouseEnter={() => {
                        setActive(index);
                        setPaused(true);
                      }}
                      onFocus={() => {
                        setActive(index);
                        setPaused(true);
                      }}
                      onClick={() => {
                        setActive(index);
                      }}
                      className="group focus-visible:outline-accent relative flex w-full items-center gap-5 py-5 pr-4 pl-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2"
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="stage-indicator"
                          aria-hidden
                          className="bg-accent absolute inset-y-2 left-0 w-0.5 rounded-full"
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      ) : null}
                      <span
                        className={cn(
                          'duration-base text-body-sm font-mono tabular-nums transition-colors',
                          isActive ? 'text-accent-text' : 'text-ink-muted',
                        )}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'duration-base font-display text-display-sm transition-colors',
                          isActive ? 'text-ink' : 'text-ink-muted group-hover:text-ink',
                        )}
                      >
                        {item.quote}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Detail — how Oryntaa meets the selected stage. Open on the canvas, no card. */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="border-line relative flex min-h-72 flex-col justify-center lg:border-l lg:pl-12">
              <span
                aria-hidden
                className="font-display text-display-xl text-accent/10 pointer-events-none absolute -top-8 right-0 select-none"
              >
                {String(active + 1).padStart(2, '0')}
              </span>
              <AnimatePresence mode="wait">
                {current ? (
                  <motion.div
                    key={current.quote}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="relative flex flex-col gap-5"
                  >
                    <h3 className="font-display text-display-md text-ink max-w-lg">
                      <span aria-hidden className="text-accent">
                        &ldquo;
                      </span>
                      {current.quote}
                      <span aria-hidden className="text-accent">
                        &rdquo;
                      </span>
                    </h3>
                    <p className="text-body-lg text-ink-muted max-w-lg">{current.body}</p>
                    <ArrowLink href={current.link.href}>{current.link.label}</ArrowLink>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="border-line mt-14 border-t pt-8">
            <IndustriesStrip label={stages.industries.label} tags={stages.industries.tags} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
