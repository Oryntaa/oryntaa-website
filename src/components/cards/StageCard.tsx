import { ArrowLink } from '@/components/ui/ArrowLink';

interface StageCardProps {
  quote: string;
  body: string;
  link: { label: string; href: string };
}

/** A "start where you are" stage card — the quoted stage is the section's device (COMPONENT_LIBRARY §5). */
export function StageCard({ quote, body, link }: StageCardProps): React.JSX.Element {
  return (
    <div className="border-line bg-surface flex h-full flex-col gap-4 rounded-lg border p-8">
      <h3 className="font-display text-display-sm text-ink">
        <span aria-hidden className="text-accent">
          &ldquo;
        </span>
        {quote}
        <span aria-hidden className="text-accent">
          &rdquo;
        </span>
      </h3>
      <p className="text-body text-ink-muted flex-1">{body}</p>
      <ArrowLink href={link.href}>{link.label}</ArrowLink>
    </div>
  );
}
