interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Renders a JSON-LD structured-data script (SEO_ARCHITECTURE §5). Server-rendered from the content
 *  layer so structured data can never drift from what's visible. */
export function JsonLd({ data }: JsonLdProps): React.JSX.Element {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
