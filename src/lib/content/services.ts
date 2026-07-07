import { cache } from 'react';

import { serviceSchema, type Service } from '@/lib/content/schemas';

import { services } from '@/content/services';

/** All services, validated and ordered (CONTENT_ARCHITECTURE §3). */
export const getServices = cache((): Service[] =>
  serviceSchema
    .array()
    .parse(services)
    .sort((a, b) => a.order - b.order),
);

/** A single service by slug, or undefined if it does not exist. */
export const getService = cache((slug: string): Service | undefined =>
  getServices().find((service) => service.slug === slug),
);
