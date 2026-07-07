import { cache } from 'react';

import { siteSchema, type Site } from '@/lib/content/schemas';

import { site } from '@/content/site';

/** The validated site identity (CONTENT_ARCHITECTURE §3). */
export const getSite = cache((): Site => siteSchema.parse(site));
