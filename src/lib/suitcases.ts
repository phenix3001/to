import { suitcases01to10 } from './suitcases/catalog-01-10';
import { suitcases11to20 } from './suitcases/catalog-11-20';
import { suitcases21to30 } from './suitcases/catalog-21-30';
import { suitcases31to40 } from './suitcases/catalog-31-40';
import { suitcases41to50 } from './suitcases/catalog-41-50';

export {
  suitcaseFaceNames,
  suitcaseIds,
} from './suitcases/types';
export type {
  SuitcaseConfig,
  SuitcaseDetail,
  SuitcaseFaceConfig,
  SuitcaseFaceIndex,
  SuitcaseFaceName,
  SuitcaseFaces,
  SuitcaseId,
  SuitcasePattern,
  SuitcaseTone,
  SuitcaseTrim,
  SuitcaseWear,
} from './suitcases/types';

export { getSuitcaseWear, suitcaseWearLabels } from './suitcases/wear';

export const suitcaseCatalog = [
  ...suitcases01to10,
  ...suitcases11to20,
  ...suitcases21to30,
  ...suitcases31to40,
  ...suitcases41to50,
] as const;

export const suitcasesById = new Map(
  suitcaseCatalog.map((suitcase) => [suitcase.id, suitcase]),
);
