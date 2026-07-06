import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Eyebrow } from '@/components/ui/Eyebrow';

// Seed test — keeps the Vitest + RTL + jsdom + `@/*` alias pipeline green. (Broader test suites
// are paused per current direction.)
describe('Eyebrow', () => {
  it('renders its label', () => {
    render(<Eyebrow>What we do</Eyebrow>);
    expect(screen.getByText('What we do')).toBeInTheDocument();
  });
});
