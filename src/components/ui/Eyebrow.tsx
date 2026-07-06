import { cn } from '@/lib/utils/cn';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The house signature: a mono, uppercase label preceded by a short accent rule (DESIGN_SYSTEM §6).
 * Source text stays sentence-case; the uppercase is CSS so screen readers do not spell it out
 * (ACCESSIBILITY_GUIDELINES §6). The rule is decorative.
 */
export function Eyebrow({ children, className }: EyebrowProps): React.JSX.Element {
  return (
    <span
      className={cn(
        'text-eyebrow text-accent-text flex items-center gap-3 font-mono uppercase',
        className,
      )}
    >
      <span aria-hidden className="bg-accent h-px w-6" />
      {children}
    </span>
  );
}
