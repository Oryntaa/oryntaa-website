import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';

import { home } from '@/content/home';

/** "Why Oryntaa" — four differentiator principles (PAGE_SPECIFICATIONS §2). Editorial layout: the
 *  header holds on the left while the principles reveal down the right as a divided list with large
 *  index numbers — no card chrome. */
export function WhyOryntaa(): React.JSX.Element {
  const { why } = home;

  return (
    <section className="section-y bg-canvas">
      <Container>
        <div className="grid gap-12 lg:grid-cols-3 lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeader eyebrow={why.eyebrow} title={why.title} />
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Stagger className="flex flex-col">
              {why.principles.map((principle, index) => (
                <div
                  key={principle.title}
                  className="border-line flex flex-col gap-3 border-t py-8 first:border-t-0 first:pt-0 sm:flex-row sm:gap-8"
                >
                  <span className="font-display text-display-md text-accent/25 leading-none tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-display-sm text-ink">{principle.title}</h3>
                    <p className="text-body-lg text-ink-muted max-w-xl">{principle.body}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
