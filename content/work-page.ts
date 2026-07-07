// Work grid page copy (PAGE_SPECIFICATIONS §5) — hero + attribution frame verbatim from the spec.
export const workPage = {
  hero: {
    eyebrow: 'Our work',
    title: 'Products built with purpose.',
    description: "Selected products delivered by Oryntaa's founding team.",
  },
  filters: [
    { label: 'All', value: null },
    { label: 'Web', value: 'web' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'AI', value: 'ai' },
    { label: 'SaaS', value: 'saas' },
  ],
} as const;
