'use client';

import { motion } from 'motion/react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

/** Slow-drifting brand orbs that give the Horizon glow gentle life (ANIMATION_ARCHITECTURE §2,
 *  capability-gated). Renders nothing under reduced-motion — the static Horizon gradient behind it
 *  already carries the look, so nothing is load-bearing on motion. Purely decorative. */
export function AmbientDrift(): React.JSX.Element | null {
  const prefersReducedMotion = usePrefersReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-0 -left-24 size-96 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: 'color-mix(in oklab, var(--color-brand-300) 45%, transparent)' }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/4 -right-16 size-80 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: 'color-mix(in oklab, var(--color-brand-400) 35%, transparent)' }}
        animate={{ x: [0, -50, 0], y: [0, 32, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
