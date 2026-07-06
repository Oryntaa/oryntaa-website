import { Breadcrumbs, type Crumb } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/layout/Container';
import { HorizonBackdrop } from '@/components/layout/HorizonBackdrop';
import { Reveal } from '@/components/motion/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Breadcrumb trail rendered above the eyebrow (detail/sub pages). */
  breadcrumbs?: { items: Crumb[]; current: string };
  /** Buttons or links rendered below the description. */
  actions?: React.ReactNode;
}

/** The shared page hero (COMPONENT_LIBRARY §4) — eyebrow, H1, optional description/breadcrumbs/
 *  actions over the Horizon glow. Every top-level page uses this so heroes stay identical; detail
 *  pages with imagery compose HorizonBackdrop directly instead. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
}: PageHeroProps): React.JSX.Element {
  return (
    <section className="bg-canvas relative overflow-hidden">
      <HorizonBackdrop />
      <Container className="relative flex flex-col items-start gap-6 pt-16 pb-16 lg:pt-24 lg:pb-20">
        {breadcrumbs !== undefined ? (
          <Breadcrumbs items={breadcrumbs.items} current={breadcrumbs.current} />
        ) : null}
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <Heading level={1} size="display-lg" className="max-w-4xl">
            {title}
          </Heading>
        </Reveal>
        {description !== undefined ? (
          <Reveal delay={0.1}>
            <p className="text-body-lg text-ink-muted max-w-2xl">{description}</p>
          </Reveal>
        ) : null}
        {actions !== undefined ? <Reveal delay={0.15}>{actions}</Reveal> : null}
      </Container>
    </section>
  );
}
