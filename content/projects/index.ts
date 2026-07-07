import { fairsettle } from './fairsettle/meta';
import { prepnowai } from './prepnowai/meta';
import { trackrec } from './trackrec/meta';
import { trucktrader } from './trucktrader/meta';

/**
 * Project registry (CONTENT_ARCHITECTURE §1). Each project's meta is validated by getProjects()
 * against projectMetaSchema; case-study bodies live beside it as MDX. Four projects seeded as
 * draft/pending until 👤 clearance (work map / ROADMAP 7.4); Espo + MASI remain to be added.
 */
export const projects = [prepnowai, trackrec, trucktrader, fairsettle];
