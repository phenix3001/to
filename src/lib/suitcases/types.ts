export const suitcaseIds = [
  'suitcase-01', 'suitcase-02', 'suitcase-03', 'suitcase-04', 'suitcase-05',
  'suitcase-06', 'suitcase-07', 'suitcase-08', 'suitcase-09', 'suitcase-10',
  'suitcase-11', 'suitcase-12', 'suitcase-13', 'suitcase-14', 'suitcase-15',
  'suitcase-16', 'suitcase-17', 'suitcase-18', 'suitcase-19', 'suitcase-20',
  'suitcase-21', 'suitcase-22', 'suitcase-23', 'suitcase-24', 'suitcase-25',
  'suitcase-26', 'suitcase-27', 'suitcase-28', 'suitcase-29', 'suitcase-30',
  'suitcase-31', 'suitcase-32', 'suitcase-33', 'suitcase-34', 'suitcase-35',
  'suitcase-36', 'suitcase-37', 'suitcase-38', 'suitcase-39', 'suitcase-40',
  'suitcase-41', 'suitcase-42', 'suitcase-43', 'suitcase-44', 'suitcase-45',
  'suitcase-46', 'suitcase-47', 'suitcase-48', 'suitcase-49', 'suitcase-50',
] as const;

export const suitcaseFaceNames = [
  'front',
  'right',
  'back',
  'left',
  'top',
  'bottom',
] as const;

export type SuitcaseId = (typeof suitcaseIds)[number];
export type SuitcaseFaceName = (typeof suitcaseFaceNames)[number];
export type SuitcaseFaceIndex = 0 | 1 | 2 | 3 | 4 | 5;

export type SuitcasePattern =
  | 'plain'
  | 'vertical-ribs'
  | 'horizontal-ribs'
  | 'fine-grid'
  | 'diagonal'
  | 'chevron'
  | 'bands'
  | 'speckle'
  | 'weave'
  | 'diamond';

export type SuitcaseDetail =
  | 'panel'
  | 'front-pocket'
  | 'cross-straps'
  | 'double-buckle'
  | 'rivet-frame'
  | 'side-handle'
  | 'side-feet'
  | 'rear-seam'
  | 'rear-panel'
  | 'top-handle'
  | 'wheel-base';

export type SuitcaseTrim = 'rounded' | 'square' | 'reinforced';
export type SuitcaseTone = 'shell' | 'shade' | 'accent';

export interface SuitcaseFaceConfig {
  name: SuitcaseFaceName;
  pattern: SuitcasePattern;
  detail: SuitcaseDetail;
  tone: SuitcaseTone;
}

export type SuitcaseFaces = readonly [
  SuitcaseFaceConfig,
  SuitcaseFaceConfig,
  SuitcaseFaceConfig,
  SuitcaseFaceConfig,
  SuitcaseFaceConfig,
  SuitcaseFaceConfig,
];

export interface SuitcaseConfig {
  id: SuitcaseId;
  label: { ru: string; en: string };
  visualThemePassengerId: `passenger-${string}` | null;
  dimensions: { width: number; height: number; depth: number };
  colors: {
    shell: string;
    shade: string;
    accent: string;
    edge: string;
    hardware: string;
  };
  trim: SuitcaseTrim;
  faces: SuitcaseFaces;
}
