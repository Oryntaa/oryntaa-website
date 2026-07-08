import { features } from '@/config/features';

import { CtaSection } from '@/components/sections/shared/CtaSection';

import { home } from '@/content/home';

/** The recurring site-wide CTA (the no-dead-ends closer, NAVIGATION_ARCHITECTURE §6). Wraps
 *  CtaSection with the shared home.cta copy so every page closes identically. Pages that need a
 *  bespoke CTA line use CtaSection directly. The secondary CTA scrolls to the `#book` section,
 *  which only exists when the booking gate is on — so it travels with the gate. */
export function SiteCta(): React.JSX.Element {
  return (
    <CtaSection
      title={home.cta.title}
      description={home.cta.description}
      primary={home.cta.primary}
      secondary={features.booking.enabled ? home.cta.secondary : undefined}
    />
  );
}
