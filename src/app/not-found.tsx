import Link from 'next/link';

import { routes } from '@/config/routes';

import { ButtonLink } from '@/components/ui/ButtonLink';

// TODO(content): final 404 copy + design land in Phase 11 (PAGE_SPECIFICATIONS §12). Shell only.
export default function NotFound(): React.JSX.Element {
  return (
    <main
      id="content"
      className="max-w-content mx-auto flex min-h-screen flex-col items-start justify-center gap-4 px-5 sm:px-8 lg:px-10"
    >
      <span className="text-eyebrow text-accent-text font-mono uppercase">404</span>
      <h1 className="font-display text-display-lg text-ink">Page not found</h1>
      <p className="text-body-lg text-ink-muted max-w-md">
        The page you are looking for does not exist or has moved.
      </p>
      <ButtonLink href={routes.home}>Back to home</ButtonLink>
      <Link
        href={routes.contact()}
        className="font-body text-body-sm text-accent-text underline-offset-4 hover:underline"
      >
        Contact us
      </Link>
    </main>
  );
}
