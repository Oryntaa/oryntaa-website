import { cn } from '@/lib/utils/cn';

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingSize = 'display-xl' | 'display-lg' | 'display-md' | 'display-sm';

interface HeadingProps {
  level: HeadingLevel;
  size?: HeadingSize;
  children: React.ReactNode;
  className?: string;
}

const SIZE_CLASS: Record<HeadingSize, string> = {
  'display-xl': 'text-display-xl',
  'display-lg': 'text-display-lg',
  'display-md': 'text-display-md',
  'display-sm': 'text-display-sm',
};

/** Display heading with the visual size decoupled from the semantic level (COMPONENT_LIBRARY §3). */
export function Heading({
  level,
  size = 'display-md',
  children,
  className,
}: HeadingProps): React.JSX.Element {
  const Tag = `h${String(level)}` as 'h1' | 'h2' | 'h3' | 'h4';
  return <Tag className={cn('font-display text-ink', SIZE_CLASS[size], className)}>{children}</Tag>;
}
