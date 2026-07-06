'use client';

import Link from 'next/link';

import { routes } from '@/config/routes';

import { Button } from '@/components/ui/Button';

/** Root error boundary (PAGE_SPECIFICATIONS §12) — minimal, on-canvas, no Horizon. Component-level
 *  failures degrade to their own fallbacks per SYSTEM_ARCHITECTURE §8. */
export default function Error({ reset }: { error: Error; reset: () => void }): React.JSX.Element {
  return (
    <main className="bg-canvas max-w-content mx-auto flex min-h-screen flex-col items-start justify-center gap-5 px-5 sm:px-8 lg:px-10">
      <span className="text-eyebrow text-accent-text font-mono uppercase">Error</span>
      <h1 className="font-display text-display-lg text-ink">Something went wrong.</h1>
      <p className="text-body-lg text-ink-muted max-w-md">Reload, or head back home.</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>Reload</Button>
        <Link
          href={routes.home}
          className="border-line text-body-sm text-ink hover:border-ink-muted focus-visible:outline-accent inline-flex items-center rounded-md border px-5 py-2.5 font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
