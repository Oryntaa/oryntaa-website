'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

/** FAQ accordion (COMPONENT_LIBRARY §6). Radix single-collapsible for correct keyboard + aria; the
 *  open/close height animation is CSS (globals.css), inert under reduced-motion. JSON-LD is emitted
 *  by the page, not here, so the structured data stays server-rendered. */
export function FaqAccordion({ items }: FaqAccordionProps): React.JSX.Element {
  return (
    <Accordion.Root type="single" collapsible className="border-line flex flex-col border-t">
      {items.map((item, index) => (
        <Accordion.Item
          key={item.q}
          value={`faq-${String(index)}`}
          className="border-line border-b"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group focus-visible:outline-accent flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-2">
              <span className="font-display text-display-sm text-ink">{item.q}</span>
              <Plus
                size={22}
                aria-hidden
                className="text-accent duration-base shrink-0 transition-transform group-data-[state=open]:rotate-45"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="accordion-content">
            <p className="text-body-lg text-ink-muted max-w-2xl pb-6">{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
