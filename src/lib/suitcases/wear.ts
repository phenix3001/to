import type { LocalizedText } from '../investigationTypes';
import type { SuitcaseWear } from './types';

const suitcaseWearOrder = [
  'mud',
  'scratches',
  'tape',
  'stickers',
  'worn-corners',
] as const satisfies readonly SuitcaseWear[];

export const suitcaseWearLabels: Record<SuitcaseWear, LocalizedText> = {
  mud: { ru: 'грязные пятна', en: 'mud stains' },
  scratches: { ru: 'длинные царапины', en: 'long scratches' },
  tape: { ru: 'полоса клейкой ленты', en: 'strip of tape' },
  stickers: { ru: 'яркие наклейки', en: 'bright stickers' },
  'worn-corners': { ru: 'потёртые углы', en: 'worn corners' },
};

export function getSuitcaseWear(suitcaseNumber: number): SuitcaseWear {
  const normalizedNumber = Math.max(1, Math.floor(suitcaseNumber));
  return suitcaseWearOrder[(normalizedNumber - 1) % suitcaseWearOrder.length];
}
