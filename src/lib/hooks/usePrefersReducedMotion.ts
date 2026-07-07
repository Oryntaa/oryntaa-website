import { useEffect, useState } from 'react';

/**
 * Tracks the OS reduced-motion preference (SSR-safe: false until hydration confirms). Gates all
 * three motion classes (ANIMATION_ARCHITECTURE §4). SYSTEM_ARCHITECTURE §4.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    // Sync with the OS reduced-motion setting (external system: the media query).
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(query.matches);
    const onChange = (event: MediaQueryListEvent): void => {
      setPrefersReduced(event.matches);
    };
    query.addEventListener('change', onChange);
    return () => {
      query.removeEventListener('change', onChange);
    };
  }, []);

  return prefersReduced;
}
