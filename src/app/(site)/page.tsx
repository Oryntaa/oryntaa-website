import { getServices } from '@/lib/content/services';

import { AiFirstSection } from '@/components/sections/home/AiFirstSection';
import { FoundersSection } from '@/components/sections/home/FoundersSection';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { ServicesShowcase } from '@/components/sections/home/ServicesShowcase';
import { StartWhereYouAre } from '@/components/sections/home/StartWhereYouAre';
import { WhyOryntaa } from '@/components/sections/home/WhyOryntaa';
import { CtaSection } from '@/components/sections/shared/CtaSection';
import { ProcessSteps } from '@/components/sections/shared/ProcessSteps';
import { StackStrip } from '@/components/sections/shared/StackStrip';

import { home } from '@/content/home';

// Homepage — assembled section by section per PAGE_SPECIFICATIONS §2 and the approved design.
// The (site) layout provides the <main id="content"> landmark, so this composes sections only.
// Selected Work + Insights are wired next (they need the projects published + articles seeded).
export default function HomePage(): React.JSX.Element {
  const services = getServices().map((service) => ({
    slug: service.slug,
    name: service.name,
    oneLiner: service.oneLiner,
    capabilities: service.capabilities.slice(0, 4).map((capability) => capability.title),
    technologies: service.technologies,
    order: service.order,
  }));

  return (
    <>
      <HeroSection />
      <StackStrip />
      <ServicesShowcase eyebrow={home.services.eyebrow} services={services} />
      <AiFirstSection />
      <StartWhereYouAre />
      <ProcessSteps
        eyebrow={home.process.eyebrow}
        title={home.process.title}
        steps={home.process.steps}
      />
      <WhyOryntaa />
      <FoundersSection />
      <CtaSection
        title={home.cta.title}
        description={home.cta.description}
        primary={home.cta.primary}
        secondary={home.cta.secondary}
      />
    </>
  );
}
