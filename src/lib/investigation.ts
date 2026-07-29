import { Language } from './i18n';
import { CaseId, LocalizedText } from './investigationTypes';
import { SuitcaseId } from './suitcases';

export type { CaseId } from './investigationTypes';

export interface Clue {
  id: string;
  caseId: CaseId;
  face: number;
  x: number;
  y: number;
  title: LocalizedText;
  description: LocalizedText;
}

export const caseSuitcaseIds: Record<CaseId, SuitcaseId> = {
  elderly: 'suitcase-03',
  punk: 'suitcase-08',
  business: 'suitcase-11',
};

export function caseForSuitcase(suitcaseId: SuitcaseId): CaseId | null {
  const entry = Object.entries(caseSuitcaseIds)
    .find(([, id]) => id === suitcaseId);
  return entry ? entry[0] as CaseId : null;
}

export const clues: Clue[] = [
  {
    id: 'medicine-label', caseId: 'elderly', face: 0, x: 34, y: 57,
    title: { ru: 'Посадочный талон', en: 'Boarding pass' },
    description: { ru: 'На посадочном талоне напечатано имя Нины Соколовой.', en: 'The boarding pass bears Nina Sokolova’s name.' },
  },
  {
    id: 'rail-ticket', caseId: 'elderly', face: 4, x: 64, y: 42,
    title: { ru: 'Корешок багажной бирки', en: 'Baggage tag stub' },
    description: { ru: 'Номер на корешке совпадает с биркой чемодана Нины.', en: 'Its number matches the tag on Nina’s suitcase.' },
  },
  {
    id: 'paint-mark', caseId: 'punk', face: 2, x: 68, y: 55,
    title: { ru: 'Бирка ручной клади', en: 'Carry-on tag' },
    description: { ru: 'На бирке ручной клади указано имя Майи Волковой.', en: 'The carry-on tag bears Maya Volkova’s name.' },
  },
  {
    id: 'concert-band', caseId: 'punk', face: 5, x: 38, y: 63,
    title: { ru: 'Наклейка с номером рейса', en: 'Flight number sticker' },
    description: { ru: 'Номер рейса совпадает с наклейкой на чемодане Майи.', en: 'The flight number matches the sticker on Maya’s suitcase.' },
  },
  {
    id: 'baggage-tag', caseId: 'business', face: 1, x: 37, y: 44,
    title: { ru: 'Багажная квитанция', en: 'Baggage receipt' },
    description: { ru: 'На багажной квитанции напечатано имя Евы Крыловой.', en: 'The baggage receipt bears Eva Krylova’s name.' },
  },
  {
    id: 'wax-seal', caseId: 'business', face: 3, x: 67, y: 66,
    title: { ru: 'Лента досмотра', en: 'Security tape' },
    description: { ru: 'Такая же лента осталась на ручной клади Евы.', en: 'The same tape remains on Eva’s carry-on bag.' },
  },
];

export const faceNames: Record<Language, string[]> = {
  ru: ['Передняя', 'Правая', 'Задняя', 'Левая', 'Верхняя', 'Нижняя'],
  en: ['Front', 'Right', 'Back', 'Left', 'Top', 'Bottom'],
};
