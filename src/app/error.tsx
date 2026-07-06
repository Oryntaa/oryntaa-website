'use client';

import { Button } from '@/components/ui/Button';

// TODO(content): final error copy + design land in Phase 11. Shell only; component-level failures
// (e.g. the hero visual) degrade to their own fallbacks per SYSTEM_ARCHITECTURE §8.
export default function Error({ reset }: { error: Error; reset: () => void }): React.JSX.Element {
  return (
    <main className="max-w-content mx-auto flex min-h-screen flex-col items-start justify-center gap-4 px-5 sm:px-8 lg:px-10">
      <span className="text-eyebrow text-accent-text font-mono uppercase">Error</span>
      <h1 className="font-display text-display-lg text-ink">Something went wrong</h1>
      <p className="text-body-lg text-ink-muted max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
