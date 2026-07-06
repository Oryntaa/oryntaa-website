import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/config/routes';

export interface ProjectCardItem {
  slug: string;
  name: string;
  type: 'web' | 'mobile' | 'ai' | 'saas';
  oneLiner: string;
  industry: string;
  cover: string;
}

interface ProjectCardProps {
  project: ProjectCardItem;
}

const TYPE_LABEL: Record<ProjectCardItem['type'], string> = {
  web: 'Web',
  mobile: 'Mobile',
  ai: 'AI',
  saas: 'SaaS',
};

/** Work grid card (PAGE_SPECIFICATIONS §5) — cover, type badge, industry, name, one-liner. The whole
 *  card links to the case study. */
export function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  return (
    <Link
      href={routes.project(project.slug)}
      className="group border-line bg-surface hover:border-accent/40 focus-visible:outline-accent duration-base flex flex-col overflow-hidden rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="bg-brand-50 relative aspect-video overflow-hidden">
        <Image
          src={project.cover}
          alt={`${project.name} product screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="duration-slow object-cover object-top transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="text-body-sm text-ink-muted flex items-center gap-3 font-mono">
          <span className="text-accent-text border-line rounded-full border px-2.5 py-0.5">
            {TYPE_LABEL[project.type]}
          </span>
          <span>{project.industry}</span>
        </div>
        <h3 className="font-display text-display-sm text-ink">{project.name}</h3>
        <p className="text-body text-ink-muted flex-1">{project.oneLiner}</p>
        <span className="text-body-sm text-accent-text inline-flex items-center gap-1 font-medium">
          View case study
          <ArrowUpRight
            size={16}
            aria-hidden
            className="duration-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
