import businessPassengerUrl from '../assets/level-one/passenger-business.png';
import elderlyPassengerUrl from '../assets/level-one/passenger-elderly.png';
import punkPassengerUrl from '../assets/level-one/passenger-punk.png';
import blueSuitcaseUrl from '../assets/level-one/suitcase-blue.png';
import leatherSuitcaseUrl from '../assets/level-one/suitcase-leather.png';
import stickerSuitcaseUrl from '../assets/level-one/suitcase-stickers.png';
import { Language } from './i18n';

export type CaseId = 'elderly' | 'punk' | 'business';
export type LocalizedText = Record<Language, string>;

export interface Clue {
  id: string;
  caseId: CaseId;
  face: number;
  x: number;
  y: number;
  title: LocalizedText;
  description: LocalizedText;
}

export const passengers = [
  { id: 'elderly' as const, image: elderlyPassengerUrl, name: { ru: 'Аркадий Морозов', en: 'Arkady Morozov' } },
  { id: 'punk' as const, image: punkPassengerUrl, name: { ru: 'Рита Вольт', en: 'Rita Volt' } },
  { id: 'business' as const, image: businessPassengerUrl, name: { ru: 'Виктор Браун', en: 'Victor Brown' } },
];

export const suitcases = [
  { id: 'elderly' as const, image: leatherSuitcaseUrl, name: { ru: 'Кожаный чемодан', en: 'Leather suitcase' } },
  { id: 'punk' as const, image: stickerSuitcaseUrl, name: { ru: 'Чемодан с наклейками', en: 'Sticker suitcase' } },
  { id: 'business' as const, image: blueSuitcaseUrl, name: { ru: 'Синий чемодан', en: 'Blue suitcase' } },
];

export const clues: Clue[] = [
  {
    id: 'medicine-label', caseId: 'elderly', face: 0, x: 34, y: 57,
    title: { ru: 'Аптечная бирка', en: 'Pharmacy label' },
    description: { ru: 'Рецепт выписан на имя Аркадия Морозова.', en: 'The prescription belongs to Arkady Morozov.' },
  },
  {
    id: 'rail-ticket', caseId: 'elderly', face: 4, x: 64, y: 42,
    title: { ru: 'Старый билет', en: 'Old train ticket' },
    description: { ru: 'Льготный билет лежит под потёртой ручкой.', en: 'A senior ticket is tucked beneath the worn handle.' },
  },
  {
    id: 'paint-mark', caseId: 'punk', face: 2, x: 68, y: 55,
    title: { ru: 'Красная краска', en: 'Red paint' },
    description: { ru: 'След краски совпадает с цветом ирокеза Риты.', en: 'The paint matches Rita’s bright red mohawk.' },
  },
  {
    id: 'concert-band', caseId: 'punk', face: 5, x: 38, y: 63,
    title: { ru: 'Браслет с концерта', en: 'Concert wristband' },
    description: { ru: 'На браслете продавлен тот же знак, что на куртке Риты.', en: 'Its emblem matches a patch on Rita’s jacket.' },
  },
  {
    id: 'baggage-tag', caseId: 'business', face: 1, x: 37, y: 44,
    title: { ru: 'Багажная квитанция', en: 'Baggage receipt' },
    description: { ru: 'На квитанции напечатаны инициалы Виктора Брауна.', en: 'The receipt carries Victor Brown’s initials.' },
  },
  {
    id: 'wax-seal', caseId: 'business', face: 3, x: 67, y: 66,
    title: { ru: 'Сломанная печать', en: 'Broken seal' },
    description: { ru: 'На синем воске остался оттиск делового клуба.', en: 'The blue wax bears a business-club crest.' },
  },
];

export const faceNames: Record<Language, string[]> = {
  ru: ['Передняя', 'Правая', 'Задняя', 'Левая', 'Верхняя', 'Нижняя'],
  en: ['Front', 'Right', 'Back', 'Left', 'Top', 'Bottom'],
};

const CLUES_KEY = 'airport-found-clues';
const MATCHES_KEY = 'airport-matched-cases';

function readIds(key: string) {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export const readFoundClues = () => readIds(CLUES_KEY)
  .filter((id) => clues.some((clue) => clue.id === id));

export const readMatchedCases = () => readIds(MATCHES_KEY)
  .filter((id): id is CaseId => passengers.some((passenger) => passenger.id === id));

export function saveFoundClue(id: string) {
  const next = [...new Set([...readFoundClues(), id])];
  localStorage.setItem(CLUES_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('investigation-progress'));
  return next;
}

export function saveMatchedCase(id: CaseId) {
  const next = [...new Set([...readMatchedCases(), id])];
  localStorage.setItem(MATCHES_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('investigation-progress'));
  return next;
}
