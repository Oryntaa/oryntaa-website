'use client';

import {
  Briefcase,
  Cloud,
  Globe,
  LayoutGrid,
  Rocket,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils/cn';

import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';

export interface ShowcaseService {
  slug: string;
  name: string;
  oneLiner: string;
  tags: string[];
  order: number;
}

interface ServicesShowcaseProps {
  eyebrow: string;
  services: ShowcaseService[];
}

const ICONS: Record<string, LucideIcon> = {
  'ai-solutions': Briefcase,
  'web-development': Globe,
  'mobile-app-development': Smartphone,
  'saas-mvp': Rocket,
  'uiux-design': LayoutGrid,
  'cloud-devops': Cloud,
};

const ADVANCE_MS = 6000;

function pad(order: number): string {
  return String(order).padStart(2, '0');
}

/**
 * Interactive services selector (PAGE_SPECIFICATIONS §2). Auto-advances through the services on a
 * timer (a progress bar tracks it); hovering or focusing a row on the right pauses the timer and
 * makes that service the featured one on the left. Auto-advance is off under reduced-motion.
 */
export function ServicesShowcase({
  eyebrow,
  services,
}: ServicesShowcaseProps): React.JSX.Element | null {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || services.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Advance the featured service on a fixed clock (external system: the auto-advance timer).
    const interval = window.setInterval(() => {
      setActive((index) => (index + 1) % services.length);
    }, ADVANCE_MS);
    return () => {
      window.clearInterval(interval);
    };
  }, [paused, services.length]);

  const current = services.at(active) ?? services.at(0);
  if (current === undefined) return null;
  const CurrentIcon = ICONS[current.slug] ?? Rocket;

  function select(index: number): void {
    setActive(index);
    setPaused(true);
  }

  return (
    <section className="bg-canvas">
      <Container>
        <Reveal>
          <div className="bg-brand-50 shadow-card relative overflow-hidden rounded-xl p-8 md:p-12">
            <div
              aria-hidden
              className="bg-brand-300 pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
            />
            <Eyebrow>{eyebrow}</Eyebrow>

            <div className="relative mt-10 grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                <motion.div
                  key={active}
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="flex items-start justify-between">
                    <span className="bg-accent/10 text-accent flex h-14 w-14 items-center justify-center rounded-lg">
                      <CurrentIcon size={28} aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="font-display text-brand-200 leading-none font-bold"
                      style={{ fontSize: 'clamp(4.5rem, 9vw, 8rem)' }}
                    >
                      {pad(current.order)}
                    </span>
                  </div>

                  <h3 className="font-display text-display-md text-ink">{current.name}</h3>
                  <p className="text-body-lg text-ink-muted max-w-md">{current.oneLiner}</p>

                  <div className="flex flex-wrap gap-2">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-line bg-surface text-body-sm text-ink-muted rounded-full border px-3 py-1 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <div className="bg-line mt-2 h-1 w-full overflow-hidden rounded-full">
                  <div
                    key={active}
                    className="bg-accent h-full"
                    style={{
                      animation: `showcase-progress ${String(ADVANCE_MS)}ms linear`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                </div>
              </div>

              <ul
                className="flex flex-col"
                onMouseLeave={() => {
                  setPaused(false);
                }}
              >
                {services.map((service, index) => {
                  const Icon = ICONS[service.slug] ?? Rocket;
                  const isActive = index === active;
                  return (
                    <li key={service.slug}>
                      <button
                        type="button"
                        onMouseEnter={() => {
                          select(index);
                        }}
                        onFocus={() => {
                          select(index);
                        }}
                        onClick={() => {
                          select(index);
                        }}
                        className={cn(
                          'duration-fast focus-visible:outline-accent flex w-full items-center gap-4 rounded-md border-l-2 px-4 py-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2',
                          isActive
                            ? 'border-accent bg-surface shadow-card'
                            : 'hover:bg-surface border-transparent',
                        )}
                      >
                        <span className="text-body-sm text-ink-muted font-mono">
                          {pad(service.order)}
                        </span>
                        <span
                          className={cn(
                            'font-display text-display-sm flex-1',
                            isActive ? 'text-accent-text' : 'text-ink',
                          )}
                        >
                          {service.name}
                        </span>
                        <Icon
                          size={20}
                          aria-hidden
                          className={isActive ? 'text-accent' : 'text-ink-muted'}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
