import {
  SuitcaseConfig,
  SuitcaseDetail,
  SuitcaseFaces,
  SuitcaseId,
  SuitcasePattern,
  SuitcaseTrim,
} from './types';
import { getSuitcaseWear } from './wear';

type DetailVariant = 0 | 1 | 2 | 3 | 4;
export type SuitcasePalette =
  | 'ochre' | 'tan' | 'walnut' | 'cocoa' | 'ash'
  | 'graphite' | 'smoke' | 'sand' | 'bronze' | 'umber';

const paletteSeeds: Record<SuitcasePalette, number> = {
  ochre: 42,
  tan: 18,
  walnut: 350,
  cocoa: 326,
  ash: 208,
  graphite: 238,
  smoke: 178,
  sand: 92,
  bronze: 26,
  umber: 286,
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

function createColors(
  palette: SuitcasePalette,
  suitcaseNumber: number,
): SuitcaseConfig['colors'] {
  const hue = (paletteSeeds[palette] + suitcaseNumber * 47) % 360;
  const saturation = 48 + (suitcaseNumber % 4) * 7;
  const lightness = 34 + (suitcaseNumber % 5) * 3;
  const accentHue = (hue + 115 + suitcaseNumber * 9) % 360;

  return {
    shell: `hsl(${hue} ${saturation}% ${lightness}%)`,
    shade: `hsl(${hue} ${Math.max(34, saturation - 14)}% ${Math.max(18, lightness - 14)}%)`,
    accent: `hsl(${accentHue} 72% 64%)`,
    edge: `hsl(${(hue + 12) % 360} 28% 13%)`,
    hardware: suitcaseNumber % 2 === 0 ? '#d8c7a2' : '#342d28',
  };
}

function varyDimensions(
  dimensions: readonly [number, number, number],
  suitcaseNumber: number,
) {
  const [width, height, depth] = dimensions;
  const variants = [
    { width: width - 18, height: height + 24, depth },
    { width: width + 28, height: height - 20, depth: depth + 8 },
    { width: width - 8, height: height - 26, depth: depth + 14 },
    { width: width + 20, height: height + 10, depth: depth - 6 },
    { width, height, depth },
  ];

  return variants[suitcaseNumber % variants.length];
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
    dimensions: varyDimensions(dimensions, passengerNumber),
    colors: createColors(palette, passengerNumber),
    trim,
    wear: getSuitcaseWear(passengerNumber),
    faces,
  };
}
