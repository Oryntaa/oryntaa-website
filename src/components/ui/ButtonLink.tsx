'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

import { cn } from '@/lib/utils/cn';

import { buttonMotion, buttonVariants, type ButtonVariantProps } from '@/components/ui/Button';

const MotionLink = motion.create(Link);

interface ButtonLinkProps extends ButtonVariantProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

/** A link styled as a button — the button variants + shared hover/press motion on next/link. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonLinkProps): React.JSX.Element {
  return (
    <MotionLink
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...buttonMotion}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
