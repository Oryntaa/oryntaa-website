import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { NotFoundContent } from '@/components/layout/NotFoundContent';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { SkipLink } from '@/components/ui/SkipLink';

/** Root 404 — renders for unmatched top-level URLs (outside the (site) group), so it wraps its own
 *  site chrome. In-site notFound() calls hit (site)/not-found.tsx instead, which reuses the layout's
 *  chrome (avoiding a double navbar). */
export default function NotFound(): React.JSX.Element {
  return (
    <MotionProvider>
      <SkipLink />
      <Navbar />
      <main id="content">
        <NotFoundContent />
      </main>
      <Footer />
    </MotionProvider>
  );
}
