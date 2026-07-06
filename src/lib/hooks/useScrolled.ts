import { useEffect, useState } from 'react';

/** True once the window has scrolled past `threshold` px — drives the navbar's compact state. */
export function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Sync navbar state with the window scroll position (external system: the viewport).
    const onScroll = (): void => {
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  return scrolled;
}
