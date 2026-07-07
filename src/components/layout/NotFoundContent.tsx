import { routes } from '@/config/routes';

import { ButtonLink } from '@/components/ui/ButtonLink';

/** The 404 body (PAGE_SPECIFICATIONS §12) — minimal, on-canvas, no Horizon. Shared by the root
 *  not-found (unmatched URLs, wraps its own chrome) and the (site) not-found (gets the layout's). */
export function NotFoundContent(): React.JSX.Element {
  return (
    <section className="bg-canvas">
      <div className="max-w-content mx-auto flex flex-col items-start justify-center gap-5 px-5 py-28 sm:px-8 lg:px-10 lg:py-40">
        <span className="text-eyebrow text-accent-text font-mono uppercase">404</span>
        <h1 className="font-display text-display-lg text-ink">This page took a different route.</h1>
        <p className="text-body-lg text-ink-muted max-w-md">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={routes.home}>Return home</ButtonLink>
          <ButtonLink href={routes.services} variant="secondary">
            Explore services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
