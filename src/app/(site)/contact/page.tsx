import type { Metadata } from 'next';

import { routes } from '@/config/routes';

import { getSite } from '@/lib/content/site';
import { faqJsonLd } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';

import { BookingEmbed } from '@/features/contact/components/BookingEmbed';
import { ContactForm } from '@/features/contact/components/ContactForm';

import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { FaqAccordion } from '@/components/sections/shared/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { Eyebrow } from '@/components/ui/Eyebrow';

import { contactPage } from '@/content/contact-page';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Tell us about your product idea, business challenge, or question — we reply within one business day.',
  path: routes.contact(),
});

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
      {/* FAQPage node — the contact FAQ is eligible for rich results (SEO_ARCHITECTURE §5). */}
      <JsonLd data={[faqJsonLd(contactPage.faq.items)]} />
      <PageHero
        eyebrow={contactPage.hero.eyebrow}
        title={contactPage.hero.title}
        description={contactPage.hero.description}
      />

      {/* Form + aside */}
      <section className="section-y bg-canvas pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
              <Reveal>
                <div className="flex flex-col gap-3">
                  <Eyebrow>{contactPage.aside.eyebrow}</Eyebrow>
                  <p className="text-body-sm text-accent-text font-mono">
                    {contactPage.hero.promise}
                  </p>
                </div>
              </Reveal>
              <Stagger className="flex flex-col gap-6">
                {contactPage.aside.steps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="border-line text-accent-text text-body-sm flex size-8 shrink-0 items-center justify-center rounded-full border font-mono tabular-nums">
                      {index + 1}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h2 className="font-display text-ink text-lg">{step.title}</h2>
                      <p className="text-body-sm text-ink-muted">{step.body}</p>
                    </div>
                  </div>
                ))}
              </Stagger>
              <Reveal delay={0.1}>
                <div className="border-line border-t pt-6">
                  <p className="text-body-sm text-ink-muted">
                    {contactPage.aside.directLabel}{' '}
                    <a
                      href={`mailto:${email}`}
                      className="text-accent-text underline underline-offset-4"
                    >
                      {email}
                    </a>
                    .
                  </p>
                </div>
              </Reveal>
            </aside>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="border-line bg-surface shadow-card rounded-xl border p-6 md:p-8">
                  <ContactForm
                    presetRoute={preset.route}
                    presetStage={preset.stage}
                    intent={preset.intent}
                    sourcePath={sourcePath}
                    email={email}
                  />
                </div>
              </Reveal>
            </div>
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
