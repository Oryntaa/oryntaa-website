'use client';

import { useState } from 'react';

import { track } from '@/lib/analytics';
import { clientEnv } from '@/lib/env';

import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';

interface BookingEmbedProps {
  title: string;
  description: string;
}

/** Booking facade (ROADMAP 10.3) — click-to-load so the third-party embed never blocks render or
 *  ships on first paint. Renders nothing when NEXT_PUBLIC_BOOKING_URL is absent (gate off). */
export function BookingEmbed({ title, description }: BookingEmbedProps): React.JSX.Element | null {
  const url = clientEnv.NEXT_PUBLIC_BOOKING_URL;
  const [loaded, setLoaded] = useState(false);

  if (url === undefined) return null;

  return (
    <section id="book" className="section-y bg-surface scroll-mt-24">
      <Container>
        <Eyebrow>Book a call</Eyebrow>
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Heading level={2} size="display-sm">
              {title}
            </Heading>
            <p className="text-body-lg text-ink-muted">{description}</p>
          </div>

          {loaded ? (
            <div className="border-line overflow-hidden rounded-xl border">
              <iframe
                src={url}
                title="Book a call"
                className="w-full"
                style={{ height: '640px' }}
                loading="lazy"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setLoaded(true);
                track('booking_open', { location: 'contact' });
              }}
              className="bg-accent text-accent-contrast focus-visible:outline-accent duration-fast w-fit rounded-md px-6 py-3 font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Load the booking calendar
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
