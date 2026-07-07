'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils/cn';

/**
 * The canonical variant contract (COMPONENT_LIBRARY §2). Every button-shaped element — the
 * <Button> here and the <ButtonLink> next-link wrapper — composes these classes. Primary is
 * orange-with-ink-text (never white-on-orange at body sizes) per DESIGN_SYSTEM §2/§6. The
 * hover-lift / tap-scale micro-interaction is motion-driven and drops movement under reduced-motion
 * (ANIMATION_ARCHITECTURE §2), while the CSS bg change persists.
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-body font-medium ' +
    'transition duration-fast ease-out-quart ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
    'disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-contrast hover:bg-brand-500',
        secondary: 'border border-ink text-ink hover:bg-ink hover:text-canvas',
        // Solid-dark secondary from the homepage design ("Book a Call") — not in DESIGN_SYSTEM §6.
        ink: 'bg-ink text-canvas hover:bg-neutral-800',
        ghost: 'text-accent-text underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-10 px-4 text-body-sm',
        md: 'h-11 px-5 text-body',
        lg: 'h-12 px-6 text-body',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

/** Shared hover/press micro-interaction for both Button and ButtonLink. */
export const buttonMotion = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
};

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'>, ButtonVariantProps {
  children: React.ReactNode;
}

export function Button({
  variant,
  size,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size }), className)}
      type={type}
      {...buttonMotion}
      {...props}
    >
      {children}
    </motion.button>
  );
}
