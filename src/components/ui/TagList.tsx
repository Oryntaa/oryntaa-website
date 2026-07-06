import { cn } from '@/lib/utils/cn';

interface TagListProps {
  items: readonly string[];
  className?: string;
  'aria-label'?: string;
}

/** A wrapping row of mono pill tags (technologies, industries, capabilities). One definition so
 *  every pill list looks identical (COMPONENT_LIBRARY §6). */
export function TagList({ items, className, ...props }: TagListProps): React.JSX.Element {
  return (
    <ul className={cn('flex flex-wrap gap-3', className)} aria-label={props['aria-label']}>
      {items.map((item) => (
        <li
          key={item}
          className="border-line bg-canvas text-body-sm text-ink-muted rounded-full border px-4 py-2 font-mono"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
