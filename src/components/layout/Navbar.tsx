import { getVisibleNav, primaryCta, primaryNav } from '@/config/navigation';

import { NavbarClient } from './NavbarClient';

/**
 * Server shell (COMPONENT_LIBRARY §4): resolves the gated nav at build time and hands the
 * serializable result to the client island, keeping the flag/config logic off the client.
 */
export function Navbar(): React.JSX.Element {
  return <NavbarClient items={getVisibleNav(primaryNav)} cta={primaryCta} />;
}
