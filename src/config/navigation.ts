import { features, type FeatureName } from '@/config/features';
import { routes } from '@/config/routes';

/**
 * Typed navigation + footer maps (NAVIGATION_ARCHITECTURE §2, §4). Gated items carry a `gate`;
 * the visibility helpers drop them when their flag is off so the nav looks intentional at 3–5
 * items. The Services dropdown's per-service children and the footer Brand/Social columns come
 * from the content layer (Phase 3) — this module owns the static structure and the gating.
 */

export interface NavLink {
  label: string;
  href: string;
  gate?: FeatureName;
}

export interface NavGroup {
  label: string;
  href: string;
  gate?: FeatureName;
  children?: NavLink[];
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const primaryNav: NavGroup[] = [
  // The six per-service links are prepended from the content layer (Phase 3); the overview
  // link is the always-present "All Services" footer of the dropdown (NAVIGATION_ARCHITECTURE §2).
  {
    label: 'Services',
    href: routes.services,
    children: [{ label: 'All Services', href: routes.services }],
  },
  { label: 'Work', href: routes.work, gate: 'work' },
  {
    label: 'About',
    href: routes.about,
    children: [
      { label: 'About Oryntaa', href: routes.about },
      { label: 'Leadership', href: routes.leadership },
      { label: 'Careers', href: routes.careers },
    ],
  },
  { label: 'Insights', href: routes.insights, gate: 'insights' },
];

export const primaryCta: NavLink = {
  label: 'Start a Project',
  href: routes.contact({ intent: 'project' }),
};

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Services',
    links: [{ label: 'View All Services', href: routes.services }],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: routes.about },
      { label: 'Leadership', href: routes.leadership },
      { label: 'Careers', href: routes.careers },
      { label: 'Work', href: routes.work, gate: 'work' },
      { label: 'Insights', href: routes.insights, gate: 'insights' },
      { label: 'Contact', href: routes.contact() },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: routes.privacy },
      { label: 'Terms', href: routes.terms },
      { label: 'Cookies', href: routes.cookies },
      { label: 'Code of Conduct', href: routes.codeOfConduct },
    ],
  },
];

/** Keep only items whose gate flag is enabled (NAVIGATION_ARCHITECTURE §2). */
export function getVisibleNav(items: NavGroup[]): NavGroup[] {
  return items.filter((item) => item.gate === undefined || features[item.gate].enabled);
}

/** Keep only footer links whose gate flag is enabled. */
export function getVisibleFooterLinks(links: NavLink[]): NavLink[] {
  return links.filter((link) => link.gate === undefined || features[link.gate].enabled);
}
