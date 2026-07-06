import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '@/app/(site)/page';

// Seed test — proves the Vitest + RTL + jsdom + `@/*` alias pipeline works end to end.
describe('HomePage', () => {
  it('renders the brand heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Oryntaa' })).toBeInTheDocument();
  });
});
