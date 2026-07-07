import Image from 'next/image';

import { routes } from '@/config/routes';

import { PROJECT_TYPE_LABEL } from '@/lib/content/labels';

import { ArrowLink } from '@/components/ui/ArrowLink';

export interface FeaturedProjectItem {
  slug: string;
  name: string;
  type: 'web' | 'mobile' | 'ai' | 'saas';
  summary: string;
  liveUrl: string | undefined;
  cover: string;
}

interface FeaturedProjectCardProps {
  project: FeaturedProjectItem;
  index: number;
}

/** The URL host without protocol or leading www. — shown in the browser-frame address bar. */
function hostOf(url: string | undefined): string {
  if (url === undefined) return '';
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/** A featured project (PAGE_SPECIFICATIONS §2, approved design): number + type on the left with the
 *  summary and a "View project" link; a browser-framed product screenshot on the right. Copy comes
 *  from the project meta; the cover lives at public/images/projects/<slug>/cover.png. */
export function FeaturedProjectCard({
  project,
  index,
}: FeaturedProjectCardProps): React.JSX.Element {
  const host = hostOf(project.liveUrl);
  return (
    <article className="border-line bg-surface shadow-raised grid overflow-hidden rounded-xl border lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
        <div className="flex items-center gap-4">
          <span className="text-body-sm text-ink-muted font-mono tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span aria-hidden className="bg-line h-px w-8" />
          <span className="border-line text-body-sm text-accent-text rounded-full border px-3 py-1 font-mono">
            {PROJECT_TYPE_LABEL[project.type]}
          </span>
        </div>

        <h3 className="font-display text-display-md text-ink">{project.name}</h3>
        <p className="text-body-lg text-ink-muted max-w-md">{project.summary}</p>

        {project.liveUrl !== undefined ? (
          <ArrowLink href={project.liveUrl} external>
            View project
          </ArrowLink>
        ) : (
          <ArrowLink href={routes.project(project.slug)}>View project</ArrowLink>
        )}
      </div>

      <div className="bg-brand-50 flex items-center p-6 md:p-8">
        <div className="border-line bg-surface shadow-card w-full overflow-hidden rounded-lg border">
          <div className="border-line flex items-center gap-2 border-b px-4 py-3">
            <span aria-hidden className="bg-line size-2.5 rounded-full" />
            <span aria-hidden className="bg-line size-2.5 rounded-full" />
            <span aria-hidden className="bg-line size-2.5 rounded-full" />
            {host !== '' ? (
              <span className="border-line bg-canvas text-body-sm text-ink-muted ml-3 flex-1 truncate rounded-md border px-3 py-1 font-mono">
                {host}
              </span>
            ) : null}
          </div>
          <div className="relative aspect-video">
            <Image
              src={project.cover}
              alt={`${project.name} product screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
