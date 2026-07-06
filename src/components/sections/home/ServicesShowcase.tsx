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
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils/cn';

import { Container } from '@/components/layout/Container';
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
 * Interactive services selector (PAGE_SPECIFICATIONS §2). Auto-advances (paused on interaction and
 * under reduced-motion); clicking a service on the right updates the featured panel on the left.
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
    // Sync the featured panel with a timer (external system: the auto-advance clock).
    const timer = window.setTimeout(() => {
      setActive((index) => (index + 1) % services.length);
    }, ADVANCE_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [active, paused, services.length]);

  const current = services.at(active) ?? services.at(0);
  if (current === undefined) return null;
  const CurrentIcon = ICONS[current.slug] ?? Rocket;

  return (
    <section className="bg-canvas">
      <Container>
        <div className="border-line bg-brand-50 rounded-xl border p-8 md:p-12">
          <Eyebrow>{eyebrow}</Eyebrow>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <span className="bg-accent/10 text-accent flex h-14 w-14 items-center justify-center rounded-lg">
                  <CurrentIcon size={28} aria-hidden />
                </span>
                <span
                  aria-hidden
                  className="font-display text-brand-200 leading-none"
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

              <div className="bg-line mt-2 h-1 w-full overflow-hidden rounded-full">
                <div
                  key={active}
                  className="bg-accent h-full"
                  style={{ animation: `showcase-progress ${String(ADVANCE_MS)}ms linear` }}
                />
              </div>
            </div>

            <ul className="flex flex-col">
              {services.map((service, index) => {
                const Icon = ICONS[service.slug] ?? Rocket;
                const isActive = index === active;
                return (
                  <li key={service.slug}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(index);
                        setPaused(true);
                      }}
                      className={cn(
                        'duration-fast focus-visible:outline-accent flex w-full items-center gap-4 rounded-md px-4 py-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2',
                        isActive ? 'bg-surface shadow-card' : 'hover:bg-surface',
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
      </Container>
    </section>
  );
}
