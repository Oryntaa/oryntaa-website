import { cache } from 'react';

import { founderSchema, type Founder } from '@/lib/content/schemas';

import { founders } from '@/content/founders';

/** The four founders, validated (CONTENT_ARCHITECTURE §3). */
export const getFounders = cache((): Founder[] => founderSchema.array().parse(founders));
