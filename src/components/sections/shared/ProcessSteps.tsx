import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';

interface ProcessStep {
  title: string;
  body: string;
}

interface ProcessStepsProps {
  eyebrow: string;
  title: string;
  steps: ProcessStep[];
}

/** Numbered process steps — the sequence is real information (COMPONENT_LIBRARY §6). */
export function ProcessSteps({ eyebrow, title, steps }: ProcessStepsProps): React.JSX.Element {
  return (
    <section className="section-y bg-canvas">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>

        <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.title} className="border-line flex flex-col gap-3 border-t pt-5">
              <span className="text-body-sm text-accent-text font-mono">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-display-sm text-ink">{step.title}</h3>
              <p className="text-body-sm text-ink-muted">{step.body}</p>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
