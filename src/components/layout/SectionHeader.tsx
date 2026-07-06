import { cn } from '@/lib/utils/cn';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lede?: string;
  action?: React.ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

/**
 * Eyebrow + heading (+ optional lede and right-aligned action) for a section's opening
 * (COMPONENT_LIBRARY §4). The mono uppercase eyebrow with its accent rule is a house signature
 * (DESIGN_SYSTEM §6); source text stays sentence-case so screen readers do not spell it out.
 * Adopts the Eyebrow/Heading primitives once they land in Phase 4.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  action,
  align = 'start',
  className,
}: SectionHeaderProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-3', align === 'center' && 'items-center')}>
        <span className="text-eyebrow text-accent-text flex items-center gap-3 font-mono uppercase">
          <span aria-hidden className="bg-accent h-px w-4" />
          {eyebrow}
        </span>
        <h2 className="font-display text-display-md text-ink">{title}</h2>
        {lede ? <p className="text-body-lg text-ink-muted max-w-2xl">{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
