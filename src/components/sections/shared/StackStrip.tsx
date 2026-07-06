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
} from 'lucide-react';

import { Container } from '@/components/layout/Container';

import { home } from '@/content/home';

// TODO(content): placeholder icons — swap for the real monochrome stack logos once they land in
// public/images/stack/ (StackStrip is an explicitly labeled stack, not partners — COMPONENT_LIBRARY §6).
const STACK = [
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

/** The engineering stack strip (COMPONENT_LIBRARY §6). */
export function StackStrip(): React.JSX.Element {
  return (
    <section className="border-line bg-canvas border-y">
      <Container>
        <div className="flex flex-col items-center gap-8 py-12">
          <p className="text-body-sm text-ink-muted">{home.stack.heading}</p>
          <div className="text-ink-muted flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {STACK.map(({ name, Icon }) => (
              <Icon
                key={name}
                size={28}
                aria-label={name}
                className="duration-fast hover:text-ink transition"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
