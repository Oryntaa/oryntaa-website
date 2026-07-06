interface IndustriesStripProps {
  label: string;
  tags: string[];
}

/** Static, unlinked industry tags (COMPONENT_LIBRARY §6). */
export function IndustriesStrip({ label, tags }: IndustriesStripProps): React.JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-body-sm text-ink-muted">{label}</span>
      {tags.map((tag) => (
        <span
          key={tag}
          className="border-line bg-surface text-body-sm text-ink-muted rounded-full border px-3 py-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
