import { MDXRemote } from 'next-mdx-remote/rsc';

import { mdxComponents } from '@/lib/content/mdx';
import { slugify } from '@/lib/utils/slugify';

/** Flatten heading children to plain text for anchor-id generation. */
function textOf(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  return '';
}

/** Styled element map for long-form MDX (case studies, articles, legal). Custom components
 *  (Callout, …) come from the shared map; standard elements get the reading typography; h2/h3 get
 *  slug ids so a table of contents can deep-link to them. */
const proseComponents = {
  h2: ({ children, ...rest }: React.ComponentProps<'h2'>) => (
    <h2
      id={slugify(textOf(children))}
      className="font-display text-display-sm text-ink mt-14 mb-4 scroll-mt-24 first:mt-0"
      {...rest}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...rest }: React.ComponentProps<'h3'>) => (
    <h3
      id={slugify(textOf(children))}
      className="font-display text-ink mt-10 mb-3 scroll-mt-24 text-xl"
      {...rest}
    >
      {children}
    </h3>
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="text-body-lg text-ink-muted mb-5 leading-relaxed" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul
      className="text-body-lg text-ink-muted mb-5 flex list-disc flex-col gap-2 pl-6"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol
      className="text-body-lg text-ink-muted mb-5 flex list-decimal flex-col gap-2 pl-6"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<'li'>) => <li className="pl-1" {...props} />,
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-accent-text underline underline-offset-4" {...props} />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="text-ink font-semibold" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote className="border-accent text-ink my-6 border-l-2 pl-5 text-xl italic" {...props} />
  ),
  ...mdxComponents,
};

/** Renders a raw MDX string as styled long-form content (server component). */
export function Mdx({ source }: { source: string }): React.JSX.Element {
  return <MDXRemote source={source} components={proseComponents} />;
}
