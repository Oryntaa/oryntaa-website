import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

const containerVariants = cva('mx-auto w-full px-5 sm:px-8 lg:px-10', {
  variants: {
    size: {
      content: 'max-w-content',
      wide: 'max-w-wide',
    },
  },
  defaultVariants: { size: 'content' },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  children: React.ReactNode;
}

/** Centered content column with responsive gutters (DESIGN_SYSTEM §5). */
export function Container({
  size,
  className,
  children,
  ...props
}: ContainerProps): React.JSX.Element {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props}>
      {children}
    </div>
  );
}
