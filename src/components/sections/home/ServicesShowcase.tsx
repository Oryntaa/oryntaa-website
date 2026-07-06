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
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
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

const EASE = [0.25, 1, 0.5, 1] as const;

/** How many viewport-heights of scroll each card gets before the stack advances. */
const SCROLL_PER_CARD = 0.72;

function iconFor(slug: string): LucideIcon {
  return ICONS[slug] ?? Rocket;
}

/** The large service card that sits at the front of the stack. The visual is a placeholder until
 *  real per-service imagery lands (TODO(content): public/images/sections/services/<slug>). */
function ServiceCard({
  service,
  isActive,
}: {
  service: ShowcaseService;
  isActive: boolean;
}): React.JSX.Element {
  const Icon = iconFor(service.slug);
  return (
    <div className="border-line bg-surface shadow-raised grid gap-8 rounded-xl border p-6 md:grid-cols-2 md:p-8">
      <div
        className="bg-brand-50 relative flex min-h-56 items-center justify-center overflow-hidden rounded-lg md:min-h-72"
        style={{ backgroundImage: 'var(--gradient-horizon)' }}
      >
        {/* TODO(content): swap for <Image src={`/images/sections/services/${service.slug}.png`} …> */}
        <span className="bg-accent/10 text-accent relative flex size-20 items-center justify-center rounded-2xl">
          <Icon size={40} aria-hidden strokeWidth={1.75} />
        </span>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <h3 className="font-display text-display-md text-ink">{service.name}</h3>
        <motion.p
          className="text-body-lg text-ink-muted"
          animate={{ opacity: isActive ? 1 : 0.55 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {service.oneLiner}
        </motion.p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="border-line bg-canvas text-body-sm text-ink-muted rounded-full border px-3 py-1 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** "What we do" — a scroll-pinned stack of service cards. As the reader scrolls into the section it
 *  pins; each card advances to the front (large, with its description) one after another, then the
 *  section releases. Reduced-motion readers get a plain stacked list instead (ANIMATION §4). */
export function ServicesShowcase({ eyebrow, services }: ServicesShowcaseProps): React.JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = services.length;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (count === 0) return;
    const next = Math.min(count - 1, Math.max(0, Math.floor(value * count)));
    setActive((prev) => (prev === next ? prev : next));
  });

  // Reduced motion (or SSR / empty): a static, fully-visible stack — no pinning, no scroll hijack.
  if (prefersReducedMotion || count === 0) {
    return (
      <section className="section-y bg-canvas">
        <Container>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-12 flex flex-col gap-6">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <ServiceCard service={service} isActive />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={wrapperRef}
      className="bg-canvas relative"
      style={{ height: `${String(Math.round(count * SCROLL_PER_CARD * 100))}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Container className="flex h-full flex-col justify-center py-16">
          <Eyebrow>{eyebrow}</Eyebrow>

          <div className="relative mt-8 flex-1">
            {services.map((service, index) => {
              const offset = index - active;
              const behind = Math.min(Math.max(offset, 0), 3);
              return (
                <motion.div
                  key={service.slug}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    zIndex: count - Math.abs(offset),
                    pointerEvents: offset === 0 ? 'auto' : 'none',
                  }}
                  initial={false}
                  animate={{
                    y: offset < 0 ? -64 : behind * 22,
                    scale: offset < 0 ? 0.94 : 1 - behind * 0.05,
                    opacity: offset < 0 || offset > 2 ? 0 : 1,
                  }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <div className="w-full max-w-4xl">
                    <ServiceCard service={service} isActive={offset === 0} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="relative mt-10 flex items-center justify-center gap-2">
            {services.map((service, index) => (
              <span
                key={service.slug}
                aria-hidden
                className={cn(
                  'duration-base h-1.5 rounded-full transition-all',
                  index === active ? 'bg-accent w-8' : 'bg-line w-1.5',
                )}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
