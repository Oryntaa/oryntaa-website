import { ArrowRight, Code2, Sparkles, Workflow, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';

import { home } from '@/content/home';

const PILLAR_ICONS: LucideIcon[] = [Sparkles, Workflow, Code2];

/** The dark "AI-first" approach section (PAGE_SPECIFICATIONS §2). First full dark-page section. */
export function AiFirstSection(): React.JSX.Element {
  const { aiFirst } = home;

  return (
    <section data-theme="dark" className="section-y bg-canvas relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <Container>
        <Reveal>
          <div className="relative flex flex-col gap-5">
            <Eyebrow>{aiFirst.eyebrow}</Eyebrow>
            <Heading level={2} className="max-w-3xl">
              {aiFirst.title}
            </Heading>
            <p className="text-body-lg text-ink-muted max-w-2xl">{aiFirst.description}</p>
          </div>
        </Reveal>

        <Stagger className="relative mt-16 grid gap-10 md:grid-cols-3">
          {aiFirst.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index] ?? Sparkles;
            return (
              <div key={pillar.title} className="flex flex-col gap-4">
                <span className="bg-surface text-accent flex h-11 w-11 items-center justify-center rounded-lg">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="font-display text-display-sm text-ink">{pillar.title}</h3>
                <p className="text-body text-ink-muted max-w-xs">{pillar.body}</p>
              </div>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <Link
            href={aiFirst.cta.href}
            className="font-body text-body-sm text-accent-text focus-visible:outline-accent relative mt-14 inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {aiFirst.cta.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
