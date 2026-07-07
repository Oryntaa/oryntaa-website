import { features } from '@/config/features';

import { getFounders } from '@/lib/content/founders';
import { getArticles } from '@/lib/content/insights';
import { getFeaturedProjects } from '@/lib/content/projects';
import { getServices } from '@/lib/content/services';

import { AiFirstSection } from '@/components/sections/home/AiFirstSection';
import { FoundersSection } from '@/components/sections/home/FoundersSection';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { InsightsPreview } from '@/components/sections/home/InsightsPreview';
import { SelectedWork } from '@/components/sections/home/SelectedWork';
import { ServicesShowcase } from '@/components/sections/home/ServicesShowcase';
import { StartWhereYouAre } from '@/components/sections/home/StartWhereYouAre';
import { WhyOryntaa } from '@/components/sections/home/WhyOryntaa';
import { ProcessSteps } from '@/components/sections/shared/ProcessSteps';
import { SiteCta } from '@/components/sections/shared/SiteCta';
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

  const featuredProjects = getFeaturedProjects().map((project) => ({
    slug: project.slug,
    name: project.name,
    type: project.type,
    summary: project.summary,
    liveUrl: project.liveUrl,
    cover: project.cover,
  }));

  const founderNames = new Map(getFounders().map((founder) => [founder.slug, founder.name]));
  const latestArticles = getArticles()
    .filter((article) => article.status === 'published')
    .slice(0, 3)
    .map((article) => ({
      slug: article.slug,
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      author: founderNames.get(article.author) ?? article.author,
      publishedAt: article.publishedAt,
      readingTimeMinutes: article.readingTimeMinutes,
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
      {features.work.enabled ? (
        <SelectedWork
          eyebrow={home.selectedWork.eyebrow}
          title={home.selectedWork.title}
          viewAll={home.selectedWork.viewAll}
          projects={featuredProjects}
        />
      ) : null}
      <WhyOryntaa />
      <FoundersSection />
      {features.insights.enabled ? (
        <InsightsPreview
          eyebrow={home.insights.eyebrow}
          title={home.insights.title}
          viewAll={home.insights.viewAll}
          articles={latestArticles}
        />
      ) : null}
      <SiteCta />
    </>
  );
}
