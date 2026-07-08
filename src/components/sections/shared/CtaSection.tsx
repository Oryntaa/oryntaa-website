import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Heading } from '@/components/ui/Heading';

interface CtaSectionProps {
  title: string;
  description: string;
  primary: { label: string; href: string };
  /** Omitted when the target it links to is gated off — a CTA must never point at nothing.
   *  Explicitly `| undefined` because `exactOptionalPropertyTypes` is on (CODING_STANDARDS §2). */
  secondary?: { label: string; href: string } | undefined;
}

/**
 * The recurring no-dead-ends CTA (COMPONENT_LIBRARY §6, NAVIGATION_ARCHITECTURE §6). Dark section,
 * one of the two homes of the Horizon gradient (DESIGN_SYSTEM §2).
 */
export function CtaSection({
  title,
  description,
  primary,
  secondary,
}: CtaSectionProps): React.JSX.Element {
  return (
    <section data-theme="dark" className="section-y bg-canvas relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'var(--gradient-horizon)' }}
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Heading level={2}>{title}</Heading>
            <p className="text-body-lg text-ink-muted">{description}</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <ButtonLink href={primary.href} size="lg">
                {primary.label}
              </ButtonLink>
              {secondary === undefined ? null : (
                <ButtonLink href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
