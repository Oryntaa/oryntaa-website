import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import type { Founder } from '@/lib/content/schemas';

interface FounderCardProps {
  founder: Founder;
}

/** Founder portrait card — circular accent-framed photo, name, role, focus, profile links (§5). */
export function FounderCard({ founder }: FounderCardProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-accent relative aspect-square overflow-hidden rounded-full">
        <Image
          src={founder.photo}
          alt={founder.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-display-sm text-ink">{founder.name}</h3>
        <p className="text-body-sm text-ink-muted">{founder.role}</p>
        <p className="text-body-sm text-ink-muted mt-1 font-mono">
          {founder.focusAreas.join(' · ')}
        </p>
      </div>
      <div className="text-body-sm text-accent-text flex gap-4 font-mono uppercase">
        {founder.linkedin !== undefined ? (
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-accent inline-flex items-center gap-1 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            LinkedIn
            <ArrowUpRight size={12} aria-hidden />
          </a>
        ) : null}
        {founder.github !== undefined ? (
          <a
            href={founder.github}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-accent inline-flex items-center gap-1 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            GitHub
            <ArrowUpRight size={12} aria-hidden />
          </a>
        ) : null}
      </div>
    </div>
  );
}
