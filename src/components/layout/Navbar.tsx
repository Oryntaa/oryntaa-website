import { getVisibleNav, primaryCta, primaryNav } from '@/config/navigation';
import { routes } from '@/config/routes';

import { getServices } from '@/lib/content/services';

import { NavbarClient } from './NavbarClient';

/**
 * Server shell (COMPONENT_LIBRARY §4): resolves the gated nav at build time, prepends the live
 * per-service links into the Services dropdown (NAVIGATION_ARCHITECTURE §2 — kept off the client),
 * and hands the serializable result to the client island.
 */
export function Navbar(): React.JSX.Element {
  const serviceLinks = getServices().map((service) => ({
    label: service.navLabel,
    href: routes.service(service.slug),
  }));

  const items = getVisibleNav(primaryNav).map((item) =>
    item.label === 'Services'
      ? { ...item, children: [...serviceLinks, ...(item.children ?? [])] }
      : item,
  );

  return <NavbarClient items={items} cta={primaryCta} />;
}
