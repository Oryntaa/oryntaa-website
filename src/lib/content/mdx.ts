import type { ComponentType } from 'react';

/**
 * Shared MDX component map (CONTENT_ARCHITECTURE §3, COMPONENT_LIBRARY §9). The real components
 * (Callout, Figure, CodeBlock, Table, …) land in Phase 4; until then each is registered as a
 * placeholder that throws descriptively, so an article using one before it exists fails loudly.
 */
function notImplemented(name: string): ComponentType {
  return function MissingMdxComponent(): never {
    throw new Error(
      `MDX component "${name}" is not implemented yet — the component map lands in Phase 4 (COMPONENT_LIBRARY §9).`,
    );
  };
}

export const mdxComponents = {
  Callout: notImplemented('Callout'),
  Figure: notImplemented('Figure'),
  CodeBlock: notImplemented('CodeBlock'),
  Table: notImplemented('Table'),
} satisfies Record<string, ComponentType>;
