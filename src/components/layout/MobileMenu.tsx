'use client';

import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { NavGroup, NavLink } from '@/config/navigation';

import { cn } from '@/lib/utils/cn';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';

import { BrandLogo } from './BrandLogo';

interface MobileMenuProps {
  items: NavGroup[];
  cta: NavLink;
}

interface MobileLinkProps {
  link: NavLink;
  pathname: string;
  nested?: boolean;
}

function MobileLink({ link, pathname, nested = false }: MobileLinkProps): React.JSX.Element {
  const active = pathname === link.href;
  return (
    <Link
      href={link.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'font-body text-body text-ink flex items-center gap-2 rounded-md py-3',
        'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        nested ? 'text-ink-muted pl-4' : '',
      )}
    >
      {active ? <span aria-hidden className="bg-accent h-1.5 w-1.5 rounded-full" /> : null}
      {link.label}
    </Link>
  );
}

/**
 * Full-screen navigation drawer for < lg (NAVIGATION_ARCHITECTURE §3). Radix Dialog supplies the
 * focus trap, scroll lock, and ESC close; groups become accordions mirroring the desktop
 * dropdowns; the CTA is pinned to the bottom. The drawer closes on route change.
 */
export function MobileMenu({ items, cta }: MobileMenuProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Close the drawer whenever the route changes (external system: the router).
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="text-ink focus-visible:outline-accent inline-flex h-11 w-11 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
      >
        <Menu size={24} aria-hidden />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40" />
        <Dialog.Content
          aria-describedby={undefined}
          className="bg-canvas fixed inset-0 z-50 flex flex-col"
        >
          <Dialog.Title asChild>
            <VisuallyHidden>Menu</VisuallyHidden>
          </Dialog.Title>

          <div className="flex h-18 shrink-0 items-center justify-between px-5">
            <BrandLogo />
            <Dialog.Close
              aria-label="Close menu"
              className="text-ink focus-visible:outline-accent inline-flex h-11 w-11 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X size={24} aria-hidden />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-4">
            {items.map((item) =>
              item.children && item.children.length > 0 ? (
                <Accordion.Root key={item.label} type="single" collapsible>
                  <Accordion.Item value={item.label}>
                    <Accordion.Header>
                      <Accordion.Trigger className="group font-body text-body text-ink focus-visible:outline-accent flex w-full items-center justify-between py-3 focus-visible:outline-2 focus-visible:outline-offset-2">
                        {item.label}
                        <ChevronDown
                          size={18}
                          aria-hidden
                          className="duration-base ease-out-quart transition group-data-[state=open]:rotate-180"
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="flex flex-col">
                      {item.children.map((child) => (
                        <MobileLink key={child.href} link={child} pathname={pathname} nested />
                      ))}
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              ) : (
                <MobileLink key={item.href} link={item} pathname={pathname} />
              ),
            )}
          </nav>

          <div className="border-line shrink-0 border-t p-5">
            <ButtonLink href={cta.href} className="w-full">
              {cta.label}
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
