import { getServices } from '@/lib/content/services';

import { AiFirstSection } from '@/components/sections/home/AiFirstSection';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { ServicesShowcase } from '@/components/sections/home/ServicesShowcase';
import { StackStrip } from '@/components/sections/shared/StackStrip';

import { home } from '@/content/home';

// Homepage — assembled section by section per PAGE_SPECIFICATIONS §2 and the approved design.
// The (site) layout provides the <main id="content"> landmark, so this composes sections only.
export default function HomePage(): React.JSX.Element {
  const services = getServices().map((service) => ({
    slug: service.slug,
    name: service.name,
    oneLiner: service.oneLiner,
    tags: service.capabilities.slice(0, 3).map((capability) => capability.title),
    order: service.order,
  }));

  return (
    <>
      <HeroSection />
      <StackStrip />
      <ServicesShowcase eyebrow={home.services.eyebrow} services={services} />
      <AiFirstSection />
    </>
  );
}
