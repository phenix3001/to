import {
  SuitcaseConfig,
  SuitcaseDetail,
  SuitcaseFaces,
  SuitcaseId,
  SuitcasePattern,
  SuitcaseTrim,
} from './types';

type DetailVariant = 0 | 1 | 2 | 3 | 4;
export type SuitcasePalette =
  | 'ochre' | 'tan' | 'walnut' | 'cocoa' | 'ash'
  | 'graphite' | 'smoke' | 'sand' | 'bronze' | 'umber';

const palettes: Record<SuitcasePalette, SuitcaseConfig['colors']> = {
  ochre: { shell: '#a97937', shade: '#755127', accent: '#c19a5b', edge: '#30251c', hardware: '#4b4035' },
  tan: { shell: '#a38359', shade: '#766044', accent: '#c2a77d', edge: '#352c24', hardware: '#514940' },
  walnut: { shell: '#765035', shade: '#523824', accent: '#a47a50', edge: '#29211b', hardware: '#49423b' },
  cocoa: { shell: '#68483a', shade: '#45312a', accent: '#96705c', edge: '#261f1c', hardware: '#4c4540' },
  ash: { shell: '#77716a', shade: '#55514c', accent: '#9d9488', edge: '#302e2b', hardware: '#494846' },
  graphite: { shell: '#44413e', shade: '#2d2b29', accent: '#6f6961', edge: '#1f1e1c', hardware: '#625d55' },
  smoke: { shell: '#65625e', shade: '#464440', accent: '#89837a', edge: '#292825', hardware: '#55524c' },
  sand: { shell: '#a08d6d', shade: '#72634c', accent: '#bca884', edge: '#373028', hardware: '#555047' },
  bronze: { shell: '#8a673d', shade: '#62482c', accent: '#ad8955', edge: '#30251d', hardware: '#52483d' },
  umber: { shell: '#574238', shade: '#3c302a', accent: '#806454', edge: '#211c19', hardware: '#48413c' },
};

const patterns: readonly SuitcasePattern[] = [
  'plain', 'vertical-ribs', 'horizontal-ribs', 'fine-grid', 'diagonal',
  'chevron', 'bands', 'speckle', 'weave', 'diamond',
];
const frontDetails: readonly SuitcaseDetail[] = [
  'panel', 'front-pocket', 'cross-straps', 'double-buckle', 'rivet-frame',
];
const backDetails: readonly SuitcaseDetail[] = [
  'rear-seam', 'rear-panel', 'rivet-frame', 'rear-seam', 'rear-panel',
];

function patternAfter(pattern: SuitcasePattern, step: number) {
  const index = patterns.indexOf(pattern);
  return patterns[(index + step) % patterns.length];
}

export function createSuitcase(
  id: SuitcaseId,
  palette: SuitcasePalette,
  pattern: SuitcasePattern,
  trim: SuitcaseTrim,
  dimensions: readonly [number, number, number],
  variant: DetailVariant,
): SuitcaseConfig {
  const number = id.slice(-2);
  const passengerNumber = Number(number);
  const faces: SuitcaseFaces = [
    { name: 'front', pattern, detail: frontDetails[variant], tone: 'shell' },
    { name: 'right', pattern: patternAfter(pattern, variant + 1), detail: variant % 2 ? 'side-feet' : 'side-handle', tone: 'shade' },
    { name: 'back', pattern: patternAfter(pattern, variant + 3), detail: backDetails[variant], tone: 'shell' },
    { name: 'left', pattern: patternAfter(pattern, variant + 2), detail: variant % 2 ? 'side-handle' : 'side-feet', tone: 'shade' },
    { name: 'top', pattern: patternAfter(pattern, 5), detail: 'top-handle', tone: 'accent' },
    { name: 'bottom', pattern: 'plain', detail: 'wheel-base', tone: 'shade' },
  ];

  return {
    id,
    label: { ru: `Чемодан ${number}`, en: `Suitcase ${number}` },
    visualThemePassengerId: passengerNumber <= 40
      ? `passenger-${number}`
      : null,
    dimensions: { width: dimensions[0], height: dimensions[1], depth: dimensions[2] },
    colors: palettes[palette],
    trim,
    faces,
  };
}
