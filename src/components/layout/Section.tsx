import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

const sectionVariants = cva('bg-canvas text-ink', {
  variants: {
    spacing: {
      default: 'section-y',
      tight: 'py-16 md:py-20',
    },
  },
  defaultVariants: { spacing: 'default' },
});

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  theme?: 'light' | 'dark';
  children: React.ReactNode;
}

/**
 * The page building block (DESIGN_SYSTEM §5, COMPONENT_LIBRARY §4). All vertical rhythm comes
 * from here; sections never hand-roll padding. `theme="dark"` sets `data-theme` so the semantic
 * tokens flip for that section only.
 */
export function Section({
  theme = 'light',
  spacing,
  className,
  children,
  ...props
}: SectionProps): React.JSX.Element {
  return (
    <section
      data-theme={theme === 'dark' ? 'dark' : undefined}
      className={cn(sectionVariants({ spacing }), className)}
      {...props}
    >
      {children}
    </section>
  );
}
