import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils/cn';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/** Accent text link with a trailing arrow that shifts 2px on hover (DESIGN_SYSTEM §6). Reused for
 *  every "View all / Explore →" link so they stay identical across sections. */
export function ArrowLink({ href, children, className }: ArrowLinkProps): React.JSX.Element {
  return (
    <Link
      href={href}
      className={cn(
        'group font-body text-body-sm text-accent-text focus-visible:outline-accent inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
    >
      {children}
      <ArrowRight
        size={16}
        aria-hidden
        className="duration-fast transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
