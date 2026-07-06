import Link from 'next/link';

import { cn } from '@/lib/utils/cn';

import { buttonVariants, type ButtonVariantProps } from '@/components/ui/Button';

interface ButtonLinkProps extends ButtonVariantProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

/** A link styled as a button — the button variants applied to next/link (COMPONENT_LIBRARY §2). */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonLinkProps): React.JSX.Element {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </Link>
  );
}
