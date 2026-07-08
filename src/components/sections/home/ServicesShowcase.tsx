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
import { Heading } from '@/components/ui/Heading';

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

/** How many viewport-heights of scroll each service gets before the stage advances. Generous on
 *  purpose: a single wheel flick must never step past more than one service. */
const SCROLL_PER_CARD = 1.1;

/** Brand duotone dye (multiply) — the photo reads as an Oryntaa-orange wash, never raw imagery. */
const STAGE_TINT = 'linear-gradient(120deg, var(--color-brand-900), var(--color-brand-500))';

/** Heavy backdrop: center-dimming radial + top/bottom vignette + a left band under the copy. */
const STAGE_OVERLAY =
  'linear-gradient(90deg, color-mix(in oklab, var(--color-neutral-950) 80%, transparent) 0%, color-mix(in oklab, var(--color-neutral-950) 50%, transparent) 45%, color-mix(in oklab, var(--color-neutral-950) 15%, transparent) 100%), radial-gradient(85% 75% at 50% 45%, color-mix(in oklab, var(--color-neutral-950) 30%, transparent) 0%, color-mix(in oklab, var(--color-neutral-950) 65%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--color-neutral-950) 72%, transparent) 0%, color-mix(in oklab, var(--color-neutral-950) 35%, transparent) 25%, color-mix(in oklab, var(--color-neutral-950) 35%, transparent) 70%, color-mix(in oklab, var(--color-neutral-950) 72%, transparent) 100%)';

/** The two wash layers every stage/panel puts between the photo and its copy. */
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

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.16, ease: 'easeIn' } },
};

/** The service copy that slides in from the left when its image takes the stage. Rendered inside
 *  a `data-theme="dark"` stage, so ink/line tokens resolve to their dark-surface values. */
function ServiceContent({ service }: { service: ShowcaseService }): React.JSX.Element {
  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex max-w-xl flex-col gap-6"
    >
      {/* h2, not h3: the active service name is this section's heading, and the page must never
          jump h1 → h3 (SEO_ARCHITECTURE §4). Motion needs the raw tag, so no <Heading> here. */}
      <motion.h2
        variants={itemVariants}
        className="font-display text-display-md md:text-display-lg text-ink"
      >
        {service.name}
      </motion.h2>

      <motion.p variants={itemVariants} className="text-body-lg text-ink-muted">
        {service.oneLiner}
      </motion.p>

      <motion.ul variants={itemVariants} className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {service.capabilities.map((capability) => (
          <li key={capability} className="flex items-start gap-2.5">
            <Check size={16} aria-hidden className="text-accent mt-1 shrink-0" />
            <span className="text-body-sm text-ink">{capability}</span>
          </li>
        ))}
      </motion.ul>

      <motion.p
        variants={itemVariants}
        className="border-line/60 text-body-sm text-ink-muted border-t pt-5 font-mono"
      >
        {service.technologies.join(' · ')}
      </motion.p>
    </motion.div>
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
        {/* The active service name is this section's heading — h2, so the page never jumps
            h1 → h3 (SEO_ARCHITECTURE §4). The eyebrow above it is a label, not a heading. */}
        <Heading level={2} size="display-md">
          {service.name}
        </Heading>
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

/** "What we do" — an immersive, scroll-pinned stage (PAGE_SPECIFICATIONS §2, approved design v5).
 *  Each service's photography fills the entire stage behind a heavy brand wash; its copy slides
 *  in from the left; a name rail on the right tracks and jumps between services. The navbar hides
 *  while the stage is pinned. Reduced-motion readers get static panels (ANIMATION_ARCHITECTURE §4). */
export function ServicesShowcase({
  eyebrow,
  services,
}: ServicesShowcaseProps): React.JSX.Element | null {
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
        {/* Full-bleed photography, crossfading and settling as the stage advances. */}
        {services.map((service, index) => (
          <motion.div
            key={service.slug}
            aria-hidden
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: index === active ? 1 : 0, scale: index === active ? 1 : 1.06 }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeInOut' },
              scale: { duration: 1.6, ease: EASE },
            }}
          >
            <Image
              src={`/images/sections/services/${service.slug}.jpg`}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ))}
        <StageWash />

        <Container className="relative flex h-full flex-col pt-24 pb-12">
          <Eyebrow>{eyebrow}</Eyebrow>

          <div className="flex flex-1 flex-col justify-center gap-12 lg:flex-row lg:items-center lg:justify-between">
            <AnimatePresence mode="wait">
              <ServiceContent key={current.slug} service={current} />
            </AnimatePresence>

            {/* Name rail — orientation plus direct jumps; hidden where the dots take over. */}
            <ol className="hidden flex-col items-end gap-4 lg:flex">
              {services.map((service, index) => (
                <li key={service.slug}>
                  <button
                    type="button"
                    aria-current={index === active}
                    onClick={() => {
                      jumpTo(index);
                    }}
                    className={cn(
                      'duration-base focus-visible:outline-accent flex items-center gap-3 text-right transition-colors focus-visible:outline-2 focus-visible:outline-offset-4',
                      index === active ? 'text-ink' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    <span className="text-body-sm font-body font-medium">{service.name}</span>
                    <span
                      aria-hidden
                      className={cn(
                        'duration-base h-px transition-all',
                        index === active ? 'bg-accent w-8' : 'bg-line w-4',
                      )}
                    />
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Mobile progress dots. */}
          <div className="flex items-center justify-center gap-2 lg:hidden">
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
