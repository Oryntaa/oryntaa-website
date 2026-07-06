import { routes } from '@/config/routes';

import { ButtonLink } from '@/components/ui/ButtonLink';

/** 404 (PAGE_SPECIFICATIONS §12) — minimal, on-canvas, no Horizon. */
export default function NotFound(): React.JSX.Element {
  return (
    <main
      id="content"
      className="bg-canvas max-w-content mx-auto flex min-h-screen flex-col items-start justify-center gap-5 px-5 sm:px-8 lg:px-10"
    >
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
    </main>
  );
}
