'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_SCROLL_THRESHOLD } from '@/config/constants';
import type { NavGroup, NavLink } from '@/config/navigation';

import { useScrolled } from '@/lib/hooks/useScrolled';
import { cn } from '@/lib/utils/cn';

import { ButtonLink } from '@/components/ui/ButtonLink';

import { BrandLogo } from './BrandLogo';
import { MobileMenu } from './MobileMenu';

interface NavbarClientProps {
  items: NavGroup[];
  cta: NavLink;
}

function isSectionActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** The 2px accent underline that marks the active trail segment (NAVIGATION_ARCHITECTURE §2). */
function ActiveUnderline(): React.JSX.Element {
  return (
    <span aria-hidden className="bg-accent absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full" />
  );
}

function NavItemLink({ href, label, active }: NavLink & { active: boolean }): React.JSX.Element {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className="font-body text-body text-ink focus-visible:outline-accent relative px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {label}
      {active ? <ActiveUnderline /> : null}
    </Link>
  );
}

function NavDropdown({ item, active }: { item: NavGroup; active: boolean }): React.JSX.Element {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="group font-body text-body text-ink focus-visible:outline-accent relative inline-flex items-center gap-1 px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2">
        {item.label}
        <ChevronDown
          size={16}
          aria-hidden
          className="duration-base ease-out-quart transition group-data-[state=open]:rotate-180"
        />
        {active ? <ActiveUnderline /> : null}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className="border-line bg-surface shadow-card z-40 flex min-w-48 flex-col rounded-md border p-1"
        >
          {(item.children ?? []).map((child) => (
            <DropdownMenu.Item key={child.href} asChild>
              <Link
                href={child.href}
                className="font-body text-body-sm text-ink data-[highlighted]:bg-canvas rounded-sm px-3 py-2 outline-none"
              >
                {child.label}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/** Client island for the navbar: scroll-driven compact state, dropdowns, active route, CTA. */
export function NavbarClient({ items, cta }: NavbarClientProps): React.JSX.Element {
  const scrolled = useScrolled(NAV_SCROLL_THRESHOLD);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'site-header duration-base ease-out-quart sticky top-0 z-30 w-full transition-all',
        scrolled ? 'border-line bg-surface h-15 border-b' : 'h-18 bg-transparent',
      )}
    >
      <div className="max-w-content mx-auto flex h-full items-center justify-between px-5 sm:px-8 lg:px-10">
        <BrandLogo priority />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const active = isSectionActive(pathname, item.href);
            return item.children && item.children.length > 0 ? (
              <NavDropdown key={item.label} item={item} active={active} />
            ) : (
              <NavItemLink key={item.href} href={item.href} label={item.label} active={active} />
            );
          })}
          <ButtonLink href={cta.href} size="sm" className="ml-2">
            {cta.label}
          </ButtonLink>
        </nav>

        <MobileMenu items={items} cta={cta} />
      </div>
    </header>
  );
}
