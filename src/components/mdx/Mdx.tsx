import { MDXRemote } from 'next-mdx-remote/rsc';

import { mdxComponents } from '@/lib/content/mdx';

/** Styled element map for long-form MDX (case studies, articles). Custom components (Callout, …)
 *  come from the shared map; standard elements get the reading typography. */
const proseComponents = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="font-display text-display-sm text-ink mt-14 mb-4 first:mt-0" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="font-display text-ink mt-10 mb-3 text-xl" {...props} />
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
