'use client';

import { Check } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils/cn';

import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';

export interface ShowcaseService {
  slug: string;
  name: string;
  oneLiner: string;
  capabilities: string[];
  technologies: string[];
  order: number;
}

interface ServicesShowcaseProps {
  eyebrow: string;
  services: ShowcaseService[];
}

const EASE = [0.25, 1, 0.5, 1] as const;

/** How many viewport-heights of scroll each service gets before the stage advances. */
const SCROLL_PER_CARD = 0.8;

/** Brand duotone dye (multiply) — backdrop photography reads as an Oryntaa-orange wash. */
const STAGE_TINT = 'linear-gradient(120deg, var(--color-brand-900), var(--color-brand-500))';

/** Heavy scrims that keep the blurred backdrop quiet behind the floating card. */
const STAGE_OVERLAY =
  'radial-gradient(85% 75% at 50% 45%, color-mix(in oklab, var(--color-neutral-950) 35%, transparent) 0%, color-mix(in oklab, var(--color-neutral-950) 72%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--color-neutral-950) 72%, transparent) 0%, color-mix(in oklab, var(--color-neutral-950) 38%, transparent) 30%, color-mix(in oklab, var(--color-neutral-950) 38%, transparent) 70%, color-mix(in oklab, var(--color-neutral-950) 72%, transparent) 100%)';

/** Soft warm wash over the card's own photo so it sits in the brand palette. */
const CARD_WASH =
  'linear-gradient(160deg, color-mix(in oklab, var(--color-brand-500) 20%, transparent) 0%, color-mix(in oklab, var(--color-neutral-900) 25%, transparent) 100%)';

/** The two wash layers between the backdrop photo and the stage content. */
function StageWash(): React.JSX.Element {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 opacity-80 mix-blend-multiply"
        style={{ backgroundImage: STAGE_TINT }}
      />
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: STAGE_OVERLAY }} />
    </>
  );
}

/** Card slide choreography: enter from the reader's scroll direction, settle centered at full
 *  scale, exit the opposite way — the "comes from the right, zooms into place" beat. */
const cardVariants: Variants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 480 : -480,
    opacity: 0,
    scale: 0.86,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -480 : 480,
    opacity: 0,
    scale: 0.86,
    transition: { duration: 0.4, ease: 'easeIn' },
  }),
};

/** The floating service card — sharp photo on the left, the service's copy on the right.
 *  Rendered inside the `data-theme="dark"` stage, so surface/ink tokens resolve dark. */
function ServiceCard({ service }: { service: ShowcaseService }): React.JSX.Element {
  return (
    <div className="border-line bg-surface/90 shadow-raised grid overflow-hidden rounded-xl border backdrop-blur-xl md:grid-cols-2">
      <div className="relative min-h-56 md:min-h-96">
        <Image
          src={`/images/sections/services/${service.slug}.jpg`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: CARD_WASH }} />
      </div>

      <div className="flex flex-col justify-center gap-6 p-8 md:p-10">
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-display-md text-ink">{service.name}</h3>
          <p className="text-body-lg text-ink-muted">{service.oneLiner}</p>
        </div>

        <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {service.capabilities.map((capability) => (
            <li key={capability} className="flex items-start gap-2.5">
              <Check size={16} aria-hidden className="text-accent mt-1 shrink-0" />
              <span className="text-body-sm text-ink">{capability}</span>
            </li>
          ))}
        </ul>

        <p className="border-line/60 text-body-sm text-ink-muted border-t pt-5 font-mono">
          {service.technologies.join(' · ')}
        </p>
      </div>
    </div>
  );
}

/** One full-bleed panel of the reduced-motion fallback — same imagery and copy, no pinning. */
function StaticPanel({ service }: { service: ShowcaseService }): React.JSX.Element {
  return (
    <div
      data-theme="dark"
      className="relative flex min-h-96 flex-col justify-center overflow-hidden rounded-xl p-8 md:p-12"
    >
      <Image
        src={`/images/sections/services/${service.slug}.jpg`}
        alt=""
        fill
        sizes="(max-width: 1280px) 100vw, 1200px"
        className="object-cover"
      />
      <StageWash />
      <div className="relative flex max-w-xl flex-col gap-5">
        <h3 className="font-display text-display-md text-ink">{service.name}</h3>
        <p className="text-body-lg text-ink-muted">{service.oneLiner}</p>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {service.capabilities.map((capability) => (
            <li key={capability} className="flex items-start gap-2.5">
              <Check size={16} aria-hidden className="text-accent mt-1 shrink-0" />
              <span className="text-body-sm text-ink">{capability}</span>
            </li>
          ))}
        </ul>
        <p className="border-line/60 text-body-sm text-ink-muted border-t pt-5 font-mono">
          {service.technologies.join(' · ')}
        </p>
      </div>
    </div>
  );
}

/** "What we do" — an immersive, scroll-pinned stage (PAGE_SPECIFICATIONS §2, approved design v4).
 *  Each service is a floating card that slides in from the right, zooms into the center of the
 *  stage, and hands off to the next as the reader scrolls; the service's own photography fills
 *  the backdrop behind a heavy brand wash. The navbar hides while the stage is pinned. Reduced-
 *  motion readers get static full-bleed panels instead (ANIMATION_ARCHITECTURE §4). */
export function ServicesShowcase({
  eyebrow,
  services,
}: ServicesShowcaseProps): React.JSX.Element | null {
  const prefersReducedMotion = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [[active, direction], setActiveState] = useState<[number, number]>([0, 1]);
  const count = services.length;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (count === 0) return;
    const next = Math.min(count - 1, Math.max(0, Math.floor(value * count)));
    setActiveState((state) => (state[0] === next ? state : [next, next > state[0] ? 1 : -1]));
    // While the stage is pinned it owns the full screen — the navbar slides away (globals.css).
    document.documentElement.toggleAttribute('data-stage-pinned', value > 0.001 && value < 0.999);
  });

  useEffect(
    () => () => {
      document.documentElement.removeAttribute('data-stage-pinned');
    },
    [],
  );

  /** Scroll to the wrapper position whose progress maps to service `index`. */
  function jumpTo(index: number): void {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const range = wrapper.offsetHeight - window.innerHeight;
    const top = wrapper.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((index + 0.5) / count) * range, behavior: 'smooth' });
  }

  // Reduced motion (or SSR / empty): static full-bleed panels — no pinning, no scroll hijack.
  if (prefersReducedMotion || count === 0) {
    return (
      <section className="bg-canvas section-y">
        <Container>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-12 flex flex-col gap-6">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <StaticPanel service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  const current = services.at(active) ?? services.at(0);
  if (current === undefined) return null;

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: `${String(Math.round(count * SCROLL_PER_CARD * 100))}vh` }}
    >
      <div data-theme="dark" className="bg-canvas sticky top-0 h-screen overflow-hidden">
        {/* Blurred backdrop photography, crossfading with the active service. */}
        {services.map((service, index) => (
          <motion.div
            key={service.slug}
            aria-hidden
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: index === active ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Image
              src={`/images/sections/services/${service.slug}.jpg`}
              alt=""
              fill
              sizes="100vw"
              className="scale-110 object-cover blur-lg"
            />
          </motion.div>
        ))}
        <StageWash />

        <Container className="relative flex h-full flex-col items-center pt-20 pb-10">
          <Eyebrow>{eyebrow}</Eyebrow>

          {/* The stage floor: one floating card at a time, sliding through. */}
          <div className="relative w-full flex-1">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current.slug}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="w-full max-w-5xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ServiceCard service={current} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex items-center justify-center gap-2">
            {services.map((service, index) => (
              <button
                key={service.slug}
                type="button"
                aria-label={service.name}
                aria-current={index === active}
                onClick={() => {
                  jumpTo(index);
                }}
                className={cn(
                  'duration-base focus-visible:outline-accent h-1.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-4',
                  index === active ? 'bg-accent w-8' : 'bg-line hover:bg-ink-muted w-4',
                )}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
