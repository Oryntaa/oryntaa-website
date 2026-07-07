import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  /** The current page — rendered as plain text, not a link. */
  current: string;
}

/** Breadcrumb trail (NAVIGATION_ARCHITECTURE §3). The last item is the current page and is not a
 *  link; separators are decorative. */
export function Breadcrumbs({ items, current }: BreadcrumbsProps): React.JSX.Element {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-body-sm text-ink-muted flex flex-wrap items-center gap-2 font-mono">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link
              href={item.href}
              className="hover:text-ink focus-visible:outline-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {item.label}
            </Link>
            <ChevronRight size={14} aria-hidden className="text-line" />
          </li>
        ))}
        <li className="text-ink" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
}
