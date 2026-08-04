import { CaseId } from './investigationTypes';
import { PassengerId } from './passengers';
import { SuitcaseId } from './suitcases';

export const gameDayNumbers = [1, 2, 3, 4, 5] as const;
export type GameDayNumber = (typeof gameDayNumbers)[number];
export const lastGameDay = gameDayNumbers[gameDayNumbers.length - 1];

export interface GameDay {
  number: GameDayNumber;
  passengerIds: readonly PassengerId[];
  suitcaseIds: readonly SuitcaseId[];
  caseOwners: Record<CaseId, PassengerId>;
  caseSuitcaseIds: Record<CaseId, SuitcaseId>;
}

function passengerId(number: number): PassengerId {
  return `passenger-${String(number).padStart(2, '0')}`;
}

function suitcaseId(number: number): SuitcaseId {
  return `suitcase-${String(number).padStart(2, '0')}` as SuitcaseId;
}

function pickCaseItems<T>(items: readonly T[]) {
  if (items.length < 3) {
    throw new Error('A game day needs at least three arrivals');
  }

  return [
    items[0],
    items[Math.floor(items.length / 2)],
    items[items.length - 1],
  ] as const;
}

function createDay(
  number: GameDayNumber,
  passengerNumbers: readonly number[],
  suitcaseNumbers: readonly number[],
): GameDay {
  const passengerIds = passengerNumbers.map(passengerId);
  const suitcaseIds = suitcaseNumbers.map(suitcaseId);
  const casePassengers = pickCaseItems(passengerIds);
  const caseSuitcases = pickCaseItems(suitcaseIds);

  return {
    number,
    passengerIds,
    suitcaseIds,
    caseOwners: {
      elderly: casePassengers[0],
      punk: casePassengers[1],
      business: casePassengers[2],
    },
    caseSuitcaseIds: {
      elderly: caseSuitcases[0],
      punk: caseSuitcases[1],
      business: caseSuitcases[2],
    },
  };
}

export const gameDays: readonly GameDay[] = [
  createDay(1, [1, 2, 3], [1, 2, 3, 4, 5, 6]),
  createDay(2, [4, 5, 6, 7], [7, 8, 9, 10, 11, 12]),
  createDay(3, [8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18]),
  createDay(4, [13, 14, 15], [19, 20, 21, 22, 23, 24]),
  createDay(5, [16, 17, 18, 19, 20], [25, 26, 27, 28, 29, 30]),
];

export function getGameDay(number: GameDayNumber) {
  return gameDays[number - 1];
}

export function caseForDaySuitcase(day: GameDay, id: SuitcaseId) {
  const entry = Object.entries(day.caseSuitcaseIds)
    .find(([, suitcase]) => suitcase === id);
  return entry ? entry[0] as CaseId : null;
}
