import { CaseId } from './investigationTypes';
import { PassengerId } from './passengers';
import { SuitcaseId } from './suitcases';

export const gameDayNumbers = [1, 2, 3, 4, 5, 6, 7] as const;
export type GameDayNumber = (typeof gameDayNumbers)[number];

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

function createDay(
  number: GameDayNumber,
  passengerNumbers: readonly number[],
  suitcaseNumbers: readonly number[],
): GameDay {
  const passengerIds = passengerNumbers.map(passengerId);
  const suitcaseIds = suitcaseNumbers.map(suitcaseId);

  return {
    number,
    passengerIds,
    suitcaseIds,
    caseOwners: {
      elderly: passengerIds[0],
      punk: passengerIds[2],
      business: passengerIds[4],
    },
    caseSuitcaseIds: {
      elderly: suitcaseIds[0],
      punk: suitcaseIds[2],
      business: suitcaseIds[4],
    },
  };
}

export const gameDays: readonly GameDay[] = [
  createDay(1, [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6]),
  createDay(2, [6, 7, 8, 9, 10], [7, 8, 9, 10, 11, 12]),
  createDay(3, [11, 12, 13, 14, 15], [13, 14, 15, 16, 17, 18]),
  createDay(4, [16, 17, 18, 19, 20], [19, 20, 21, 22, 23, 24]),
  createDay(5, [1, 6, 11, 16, 20], [25, 26, 27, 28, 29, 30]),
  createDay(6, [2, 7, 12, 17, 19], [31, 32, 33, 34, 35, 36]),
  createDay(7, [3, 8, 13, 18, 20], [37, 38, 39, 40, 41, 42]),
];

export function getGameDay(number: GameDayNumber) {
  return gameDays[number - 1];
}

export function caseForDaySuitcase(day: GameDay, id: SuitcaseId) {
  const entry = Object.entries(day.caseSuitcaseIds)
    .find(([, suitcase]) => suitcase === id);
  return entry ? entry[0] as CaseId : null;
}
