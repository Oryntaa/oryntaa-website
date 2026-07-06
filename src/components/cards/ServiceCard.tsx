import {
  ArrowUpRight,
  Briefcase,
  Cloud,
  Globe,
  LayoutGrid,
  Rocket,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { routes } from '@/config/routes';

export interface ServiceCardItem {
  slug: string;
  name: string;
  oneLiner: string;
  tags: string[];
}

interface ServiceCardProps {
  service: ServiceCardItem;
}

const ICONS: Record<string, LucideIcon> = {
  'ai-solutions': Briefcase,
  'web-development': Globe,
  'mobile-app-development': Smartphone,
  'saas-mvp': Rocket,
  'uiux-design': LayoutGrid,
  'cloud-devops': Cloud,
};

/** Service grid card (PAGE_SPECIFICATIONS §3) — icon, name, one-liner, three capability tags. The
 *  whole card links to the service detail page. */
export function ServiceCard({ service }: ServiceCardProps): React.JSX.Element {
  const Icon = ICONS[service.slug] ?? Rocket;
  return (
    <Link
      href={routes.service(service.slug)}
      className="group border-line bg-surface hover:border-accent/40 focus-visible:outline-accent duration-base flex h-full flex-col gap-5 rounded-xl border p-8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="flex items-center justify-between">
        <span className="bg-accent/10 text-accent flex size-12 items-center justify-center rounded-xl">
          <Icon size={24} aria-hidden strokeWidth={1.75} />
        </span>
        <ArrowUpRight
          size={20}
          aria-hidden
          className="text-ink-muted duration-base group-hover:text-accent transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-display text-display-sm text-ink">{service.name}</h3>
        <p className="text-body text-ink-muted">{service.oneLiner}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="border-line bg-canvas text-body-sm text-ink-muted rounded-full border px-3 py-1 font-mono"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
