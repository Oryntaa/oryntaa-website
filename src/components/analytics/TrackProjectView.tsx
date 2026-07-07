'use client';

import { useEffect } from 'react';

import { track } from '@/lib/analytics';

/** Fires the `project_view` analytics event once when a case-study page mounts (ANALYTICS §2). */
export function TrackProjectView({ slug }: { slug: string }): null {
  useEffect(() => {
    track('project_view', { slug });
  }, [slug]);
  return null;
}
