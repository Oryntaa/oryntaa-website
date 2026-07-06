interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

/**
 * The first tabbable element on every page (ACCESSIBILITY_GUIDELINES §2). Hidden until focused,
 * then revealed as a token-styled control that jumps keyboard users to <main id="content">.
 */
export function SkipLink({
  href = '#content',
  children = 'Skip to content',
}: SkipLinkProps): React.JSX.Element {
  return (
    <a
      href={href}
      className="focus:bg-surface focus:font-body focus:text-body-sm focus:text-ink focus:shadow-card focus:outline-accent sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:outline-2 focus:outline-offset-2"
    >
      {children}
    </a>
  );
}
