'use client';

import { Children } from 'react';

import { Reveal } from './Reveal';

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  step?: number;
}

/**
 * Orchestrates child Reveals at a fixed offset (default 60ms) so grids and lists enter in sequence
 * (ANIMATION_ARCHITECTURE §2). Pass the layout classes (grid/flex) as `className`.
 */
export function Stagger({ children, className, step = 0.06 }: StaggerProps): React.JSX.Element {
  const items = Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal key={index} delay={index * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
