interface PrincipleCardProps {
  title: string;
  body: string;
}

/** Borderless title + body used for the "Why Oryntaa" principles (COMPONENT_LIBRARY §5). */
export function PrincipleCard({ title, body }: PrincipleCardProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display text-display-sm text-ink">{title}</h3>
      <p className="text-body text-ink-muted max-w-sm">{body}</p>
    </div>
  );
}
