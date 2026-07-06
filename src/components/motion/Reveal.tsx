'use client';

import { motion } from 'motion/react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * The sanctioned entrance (ANIMATION_ARCHITECTURE §2/§3): opacity 0→1 + 12px rise, duration-slow,
 * ease-out-quart, once at 20% viewport intersection. Renders inert under reduced-motion — content
 * is never load-bearing on motion.
 */
export function Reveal({ children, delay = 0, className }: RevealProps): React.JSX.Element {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
