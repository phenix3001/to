import { Language } from './i18n';

export type CaseId = 'elderly' | 'punk' | 'business';
export type LocalizedText = Record<Language, string>;

export interface CharacterHitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}
