import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { SkipLink } from '@/components/ui/SkipLink';

/**
 * The public-site shell (FOLDER_STRUCTURE): skip link → header → main#content → footer, the
 * landmark structure required by ACCESSIBILITY_GUIDELINES §3. The root layout owns fonts + html.
 * MotionProvider makes all motion honor the reduced-motion preference app-wide.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <MotionProvider>
      <SkipLink />
      <Navbar />
      <main id="content">{children}</main>
      <Footer />
    </MotionProvider>
  );
}
