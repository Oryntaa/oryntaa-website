import {
  Atom,
  Box,
  Boxes,
  Cloud,
  Code2,
  Container as ContainerIcon,
  Database,
  Hexagon,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';

import { home } from '@/content/home';

// TODO(content): placeholder icons — swap for the real monochrome stack logos once they land in
// public/images/stack/ (StackStrip is an explicitly labeled stack, not partners — COMPONENT_LIBRARY §6).
const STACK: { name: string; Icon: LucideIcon }[] = [
  { name: 'React', Icon: Atom },
  { name: 'TypeScript', Icon: Code2 },
  { name: 'Node.js', Icon: Hexagon },
  { name: 'Frameworks', Icon: Boxes },
  { name: 'PostgreSQL', Icon: Database },
  { name: 'Supabase', Icon: Zap },
  { name: 'Vercel', Icon: Sparkles },
  { name: 'Cloud', Icon: Cloud },
  { name: 'Docker', Icon: ContainerIcon },
  { name: 'Tooling', Icon: Box },
];

// Doubled so the -50% translate loops seamlessly.
const MARQUEE = [...STACK, ...STACK];

/**
 * The engineering stack strip (COMPONENT_LIBRARY §6): a continuous marquee that pauses on hover,
 * each logo lifting to the accent colour on hover. Falls back to a static centered row under
 * reduced-motion.
 */
export function StackStrip(): React.JSX.Element {
  return (
    <section className="border-line bg-canvas border-y py-12">
      <Container>
        <Reveal>
          <p className="text-body-sm text-ink-muted mb-10 text-center">{home.stack.heading}</p>
        </Reveal>
        <div className="marquee">
          <div className="marquee__track items-center gap-x-16">
            {MARQUEE.map(({ name, Icon }, index) => (
              <span
                key={`${name}-${String(index)}`}
                className="text-ink-muted duration-fast hover:text-accent shrink-0 transition"
              >
                <Icon
                  size={34}
                  aria-label={index < STACK.length ? name : undefined}
                  aria-hidden={index >= STACK.length}
                />
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
