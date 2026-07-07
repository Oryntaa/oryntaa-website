'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect } from 'react';

import { captureUtm } from '@/lib/utils/utm';

/** Site analytics (ANALYTICS_ARCHITECTURE §4): Vercel Web Analytics + Speed Insights (both cookie-
 *  free, production-only self-gated) plus first-view UTM capture. Mounted once in the root layout. */
export function Analytics(): React.JSX.Element {
  useEffect(() => {
    captureUtm();
  }, []);

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
