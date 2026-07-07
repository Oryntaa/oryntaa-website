import { cache } from 'react';

import { openingSchema, type Opening } from '@/lib/content/schemas';

import { openings } from '@/content/careers/openings';

/** Job openings, validated (CONTENT_ARCHITECTURE §3). Empty at launch → designed empty state. */
export const getOpenings = cache((): Opening[] => openingSchema.array().parse(openings));
