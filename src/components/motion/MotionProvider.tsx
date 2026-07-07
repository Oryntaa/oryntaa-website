'use client';

import { MotionConfig } from 'motion/react';

/**
 * App-wide motion context. `reducedMotion="user"` makes every motion component honor the OS
 * preference — transforms/movement are dropped while color and opacity are kept
 * (ANIMATION_ARCHITECTURE §4).
 */
export function MotionProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
