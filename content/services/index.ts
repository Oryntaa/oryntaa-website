import { aiSolutions } from './ai-solutions';
import { cloudDevops } from './cloud-devops';
import { mobileAppDevelopment } from './mobile-app-development';
import { saasMvp } from './saas-mvp';
import { uiuxDesign } from './uiux-design';
import { webDevelopment } from './web-development';

/**
 * Service registry (CONTENT_ARCHITECTURE §1) — the six per-service modules, validated and ordered
 * by getServices() against serviceSchema. Problem/approach/FAQ bodies are drafted; ⛳ Gate 6 review.
 */
export const services = [
  aiSolutions,
  webDevelopment,
  mobileAppDevelopment,
  saasMvp,
  uiuxDesign,
  cloudDevops,
];
