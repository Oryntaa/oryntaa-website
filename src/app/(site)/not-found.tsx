import { NotFoundContent } from '@/components/layout/NotFoundContent';

/** In-site 404 — reached when a (site) route calls notFound() (e.g. a bad /work/<slug>). The (site)
 *  layout already provides the nav/main/footer chrome, so this renders only the body. */
export default function SiteNotFound(): React.JSX.Element {
  return <NotFoundContent />;
}
