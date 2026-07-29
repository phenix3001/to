import { gameDayNumbers, GameDayNumber } from './gameDays';
import { CaseId } from './investigationTypes';

const caseIds: readonly CaseId[] = ['elderly', 'punk', 'business'];

export function dailyClueKey(day: GameDayNumber, clueId: string) {
  return `day-${day}:clue:${clueId}`;
}

export function dailyCaseKey(day: GameDayNumber, caseId: CaseId) {
  return `day-${day}:case:${caseId}`;
}

export function clueIdsForDay(keys: string[], day: GameDayNumber) {
  const prefix = `day-${day}:clue:`;
  return keys
    .filter((key) => key.startsWith(prefix))
    .map((key) => key.slice(prefix.length));
}

export function caseIdsForDay(keys: string[], day: GameDayNumber) {
  const prefix = `day-${day}:case:`;
  return keys
    .filter((key) => key.startsWith(prefix))
    .map((key) => key.slice(prefix.length))
    .filter((id): id is CaseId => caseIds.includes(id as CaseId));
}

export function isDayComplete(keys: string[], day: GameDayNumber) {
  return caseIdsForDay(keys, day).length === caseIds.length;
}

export function firstIncompleteDay(keys: string[]): GameDayNumber {
  return gameDayNumbers.find((day) => !isDayComplete(keys, day)) ?? 7;
}
