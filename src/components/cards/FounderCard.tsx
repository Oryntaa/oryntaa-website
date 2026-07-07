import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import type { Founder } from '@/lib/content/schemas';
import { initials } from '@/lib/utils/format';

interface FounderCardProps {
  founder: Founder;
  /** Show the founder's intro paragraph (used on the Leadership page). */
  showIntro?: boolean;
}

/** Founder card (COMPONENT_LIBRARY §5). A compact avatar — a real photo once one lands, otherwise a
 *  brand monogram — with name, role, focus areas, and profile links. Placeholder photos render as
 *  the monogram so the section reads cleanly before real photography arrives. */
export function FounderCard({ founder, showIntro = false }: FounderCardProps): React.JSX.Element {
  const hasPhoto = !founder.photo.includes('placeholder');

  return (
    <div className="group border-line flex flex-col gap-5 border-t pt-6">
      {hasPhoto ? (
        <div className="border-line relative size-16 overflow-hidden rounded-full border">
          <Image
            src={founder.photo}
            alt={founder.name}
            fill
            sizes="64px"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div
          aria-hidden
          className="border-line bg-brand-100 text-accent-text font-display flex size-16 items-center justify-center rounded-full border text-xl"
        >
          {initials(founder.name)}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="font-display text-ink text-lg">{founder.name}</h3>
        <p className="text-body-sm text-ink-muted">{founder.role}</p>
      </div>

      {showIntro ? <p className="text-body text-ink-muted">{founder.intro}</p> : null}

      <p className="text-body-sm text-ink-muted font-mono">{founder.focusAreas.join(' · ')}</p>

      <div className="text-body-sm text-accent-text mt-auto flex gap-4 font-mono uppercase">
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
