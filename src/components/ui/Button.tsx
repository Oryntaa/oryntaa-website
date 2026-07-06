import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

/**
 * The canonical variant contract (COMPONENT_LIBRARY §2). Every button-shaped element — the
 * <Button> here and the <ButtonLink> next-link wrapper — composes these classes. Primary is
 * orange-with-ink-text (never white-on-orange at body sizes) per DESIGN_SYSTEM §2/§6.
 */
export const buttonVariants = cva(
  // `transition` (non-bracketed) already animates background-color + transform; the bracketed
  // form in COMPONENT_LIBRARY §2 would trip the arbitrary-value guard (CODING_STANDARDS §7).
  'inline-flex items-center justify-center gap-2 rounded-md font-body font-medium ' +
    'transition duration-fast ease-out-quart ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
    'disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-contrast hover:bg-brand-500 active:translate-y-px',
        secondary: 'border border-ink text-ink hover:bg-ink hover:text-canvas',
        // Solid-dark secondary from the homepage design ("Book a Call") — not in DESIGN_SYSTEM §6.
        ink: 'bg-ink text-canvas hover:bg-neutral-800 active:translate-y-px',
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
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
    <button className={cn(buttonVariants({ variant, size }), className)} type={type} {...props}>
      {children}
    </button>
  );
}
