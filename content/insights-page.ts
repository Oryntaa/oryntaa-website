// Insights list page copy (PAGE_SPECIFICATIONS §9). Hero verbatim from the spec.
export const insightsPage = {
  seo: {
    title: 'Insights',
    description:
      "Ideas, perspectives, and what we're learning — on AI, engineering, product, and design, written by the Oryntaa founders who actually do the work.",
  },
  hero: {
    eyebrow: 'Insights',
    title: "Ideas, perspectives, and what we're learning.",
  },
  categories: [
    { label: 'All', value: null },
    { label: 'AI', value: 'ai' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Product', value: 'product' },
    { label: 'Design', value: 'design' },
    { label: 'Oryntaa', value: 'oryntaa' },
  ],
} as const;
