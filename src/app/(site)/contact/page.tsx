import type { Metadata } from 'next';

import { getSite } from '@/lib/content/site';

import { BookingEmbed } from '@/features/contact/components/BookingEmbed';
import { ContactForm } from '@/features/contact/components/ContactForm';

import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { FaqAccordion } from '@/components/sections/shared/FaqAccordion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';

import { contactPage } from '@/content/contact-page';

export const metadata: Metadata = {
  title: 'Contact | Oryntaa',
  description:
    'Tell us about your product idea, business challenge, or question — we reply within one business day.',
};

interface ContactPageProps {
  searchParams: Promise<{ intent?: string }>;
}

type RouteValue = (typeof contactPage.routes)[number]['value'];

const ROUTE_VALUES = new Set<string>(contactPage.routes.map((route) => route.value));

/** Map the `?intent=` param to a route + (for modernization) a preset project stage. */
function resolveIntent(intent: string | undefined): {
  route: RouteValue;
  stage: string | undefined;
  intent: string | undefined;
} {
  if (intent === 'modernization') {
    return { route: 'project', stage: 'We are carrying a legacy system', intent };
  }
  if (intent !== undefined && ROUTE_VALUES.has(intent)) {
    return { route: intent as RouteValue, stage: undefined, intent };
  }
  return { route: 'project', stage: undefined, intent };
}

export default async function ContactPage({
  searchParams,
}: ContactPageProps): Promise<React.JSX.Element> {
  const { intent } = await searchParams;
  const preset = resolveIntent(intent);
  const email = getSite().email;
  const sourcePath = intent !== undefined ? `/contact?intent=${intent}` : '/contact';

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(55% 55% at 20% 0%, color-mix(in oklab, var(--color-brand-200) 40%, transparent), transparent 60%)',
          }}
        />
        <Container className="relative flex flex-col items-start gap-5 pt-16 pb-12 lg:pt-24 lg:pb-14">
          <Reveal>
            <Eyebrow>{contactPage.hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading level={1} size="display-lg" className="max-w-3xl">
              {contactPage.hero.title}
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-ink-muted max-w-2xl">{contactPage.hero.description}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-body-sm text-accent-text font-mono">{contactPage.hero.promise}</p>
          </Reveal>
        </Container>
      </section>

      {/* Form */}
      <section className="section-y bg-canvas pt-4">
        <Container>
          <div className="max-w-3xl">
            <ContactForm
              presetRoute={preset.route}
              presetStage={preset.stage}
              intent={preset.intent}
              sourcePath={sourcePath}
              email={email}
            />
          </div>
        </Container>
      </section>

      {/* Booking (gated on NEXT_PUBLIC_BOOKING_URL) */}
      <BookingEmbed
        title={contactPage.booking.title}
        description={contactPage.booking.description}
      />

      {/* FAQ */}
      <section className="section-y bg-canvas">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={contactPage.faq.eyebrow} title={contactPage.faq.title} />
          </Reveal>
          <div className="mt-12 max-w-3xl">
            <FaqAccordion items={contactPage.faq.items} />
          </div>
          <p className="text-body-sm text-ink-muted mt-10">
            Prefer email? Reach us at{' '}
            <a href={`mailto:${email}`} className="text-accent-text underline underline-offset-4">
              {email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
