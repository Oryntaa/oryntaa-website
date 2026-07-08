import { ArrowUpRight, Star } from 'lucide-react';

import { features } from '@/config/features';

import { Container } from '@/components/layout/Container';
import { AmbientDrift } from '@/components/motion/AmbientDrift';
import { Reveal } from '@/components/motion/Reveal';
import { WaveText } from '@/components/motion/WaveText';
import { ButtonLink } from '@/components/ui/ButtonLink';

import { home } from '@/content/home';

const STARS = ['s1', 's2', 's3', 's4', 's5'];

/** Homepage hero (PAGE_SPECIFICATIONS §2). H1 is the LCP (never inside a Reveal) — it waves on
 *  load and hover; the surrounding block reveals in sequence. The Horizon glow (with a gentle
 *  ambient drift) sits behind it.
 *  Visual decision (ROADMAP 13, final): still + ambient glow only — the 3D object layer is dropped
 *  for v1; the text hero is the LCP and stays that way. */
export function HeroSection(): React.JSX.Element {
  const { hero } = home;

  return (
    <section className="bg-canvas relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'var(--gradient-horizon)' }}
      />
      <AmbientDrift />
      <Container>
        <div className="relative flex flex-col items-center gap-8 py-24 text-center md:py-32">
          <Reveal>
            <span className="border-line bg-surface shadow-card inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <span aria-hidden className="flex gap-0.5">
                {STARS.map((key) => (
                  <Star key={key} size={12} className="fill-accent text-accent" />
                ))}
              </span>
              <span className="text-eyebrow text-ink-muted font-mono uppercase">
                {hero.eyebrow}
              </span>
            </span>
          </Reveal>

          <h1 className="font-display text-display-xl text-ink max-w-4xl">
            <WaveText text={hero.titleLead} />
            <br />
            <WaveText text={hero.titleAccent} className="text-accent" />
          </h1>

          <Reveal delay={0.1}>
            <p className="text-body-lg text-ink-muted max-w-xl">{hero.description}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <ButtonLink href={hero.primary.href} size="lg">
                {hero.primary.label}
                <ArrowUpRight size={18} aria-hidden />
              </ButtonLink>
              {features.booking.enabled ? (
                <ButtonLink href={hero.secondary.href} variant="ink" size="lg">
                  {hero.secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-eyebrow text-ink-muted font-mono uppercase">
              {hero.capabilities.join(' · ')}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
