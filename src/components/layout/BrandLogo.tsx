import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/config/routes';

import { cn } from '@/lib/utils/cn';

interface BrandLogoProps {
  /** 'dark' = dark wordmark for light backgrounds (nav, default); 'light' = light wordmark for the
   *  dark footer. Both point at the horizontal lockup in /public/brand. */
  tone?: 'dark' | 'light';
  /** Eager-load the above-the-fold nav instance; leave off for the footer/mobile-drawer instances. */
  priority?: boolean;
  className?: string;
}

const LOCKUP: Record<'dark' | 'light', string> = {
  dark: '/brand/oryntaa-logo.png',
  light: '/brand/oryntaa-logo-light.png',
};

/** The Oryntaa wordmark lockup, linking home. One component so the nav, mobile drawer, and footer
 *  stay identical; `tone` swaps the asset so it reads on light and dark backgrounds alike. The
 *  image is decorative (alt="") because the link already carries the "Oryntaa home" label. */
export function BrandLogo({
  tone = 'dark',
  priority = false,
  className,
}: BrandLogoProps): React.JSX.Element {
  return (
    <Link
      href={routes.home}
      aria-label="Oryntaa home"
      className={cn(
        'focus-visible:outline-accent inline-flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
    >
      <Image
        src={LOCKUP[tone]}
        alt=""
        width={176}
        height={56}
        priority={priority}
        className="h-10 w-auto lg:h-11"
      />
    </Link>
  );
}
