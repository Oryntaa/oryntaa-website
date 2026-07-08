// Mobile App Development (service 3/6). oneLiner + capabilities verbatim; problem/approach/FAQ drafted.
export const mobileAppDevelopment = {
  slug: 'mobile-app-development',
  name: 'Mobile App Development',
  navLabel: 'Mobile App Development',
  oneLiner:
    'iOS and Android from one React Native codebase — offline-ready, synced, and store-delivered.',
  heroTitle: 'One codebase. Both stores.',
  heroDescription:
    'Genuine iOS and Android apps from a single React Native codebase — offline-ready, synced, and delivered to both stores.',
  overview: [
    'One React Native codebase that ships as a real iOS and Android app — not a website in a shell, not two builds drifting out of sync.',
    "Built for the conditions phones actually meet: patchy connectivity, background sync, push at the right moment, both stores' review gauntlet. Offline is a design decision made early.",
    'For teams who need a credible app in both stores without funding two native teams.',
  ],
  problems: [
    {
      title: 'Two codebases, double the cost',
      body: 'Separate native builds mean two teams, two backlogs, and features that drift out of parity.',
    },
    {
      title: 'Breaks without signal',
      body: 'Apps that assume connectivity fall over the moment the network does — exactly when users need them.',
    },
    {
      title: 'Store rejections',
      body: 'Late attention to store guidelines turns launch week into a queue of review rejections.',
    },
    {
      title: 'Web apps pretending to be apps',
      body: 'A site wrapped in a shell feels wrong on a phone, and users can tell within seconds.',
    },
  ],
  capabilities: [
    { title: 'iOS + Android from one codebase' },
    { title: 'Offline & sync' },
    { title: 'Push & engagement' },
    { title: 'Store delivery' },
  ],
  approach: [
    {
      step: 'Scope',
      body: 'We agree the flows that matter and decide the offline and sync strategy before building.',
    },
    {
      step: 'Build',
      body: 'One React Native codebase, native where it counts, shared where it saves — no drift between platforms.',
    },
    {
      step: 'Harden',
      body: 'We test against real conditions: dropped connectivity, background sync, permissions, and push timing.',
    },
    {
      step: 'Ship & iterate',
      body: 'We take both apps through review to the stores and keep them updated as the product moves.',
    },
  ],
  technologies: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'PostgreSQL'],
  relatedServices: ['saas-mvp', 'uiux-design', 'ai-solutions'],
  faq: [
    {
      q: 'iOS and Android from one codebase — really?',
      a: 'Yes. React Native gives us one codebase that ships as two genuine apps, with native modules where a platform truly needs them.',
    },
    {
      q: 'Will it feel like a real app?',
      a: 'That is the point — native navigation, gestures, and performance, not a website in a wrapper. Users should never have to wonder.',
    },
    {
      q: 'What about offline use?',
      a: 'Offline is designed in early: local state, background sync, and clear handling of conflicts when the network returns.',
    },
    {
      q: 'App Store & Play Store submission?',
      a: 'We handle both — builds, store metadata, and the review process — so launch is a step, not a scramble.',
    },
    {
      q: 'One platform or both?',
      a: 'Both come from the same codebase, so shipping to iOS and Android together costs far less than two native teams.',
    },
  ],
  seo: {
    title: 'Mobile App Development | Oryntaa',
    description:
      'Genuine iOS and Android apps from a single React Native codebase — offline-ready, synced, and delivered to both stores by the engineers who designed them.',
  },
  order: 3,
};
