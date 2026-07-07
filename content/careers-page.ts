// Careers page copy (PAGE_SPECIFICATIONS §8). Hero + empty-state verbatim from the spec; why-list
// titles from the spec, bodies drafted in brand voice.
export const careersPage = {
  hero: {
    eyebrow: 'Careers',
    title: 'Build meaningful technology with us.',
    description:
      'A small, senior team building real products for real organizations — and growing the same way we build: for the long term.',
  },
  why: {
    eyebrow: 'Why Oryntaa',
    title: 'What working here means.',
    items: [
      {
        title: 'Meaningful work',
        body: 'Real products for real organizations — the kind that ship and stay shipped.',
      },
      {
        title: 'Continuous learning',
        body: 'Senior engineers to learn from, modern tools, and problems worth solving.',
      },
      {
        title: 'Ownership',
        body: 'You own what you build, from the decision to production.',
      },
      {
        title: 'Collaboration',
        body: 'A small team and direct communication — no layers between you and the work.',
      },
      {
        title: 'Long-term thinking',
        body: 'We build for years, not sprints — and we grow people the same way.',
      },
    ],
  },
  openings: {
    eyebrow: 'Open roles',
    title: 'Open positions.',
  },
  emptyState: {
    title: 'No open positions right now.',
    body: "We're always interested in meeting thoughtful, ambitious engineers. Follow Oryntaa on LinkedIn for future roles.",
    ctaLabel: 'Follow on LinkedIn',
  },
} as const;
