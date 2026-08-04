import { gameDays } from './gameDays';
import { PassengerId } from './passengers';

export type ArrivalSchedule = readonly (readonly PassengerId[])[];

const recurringPassengerId: PassengerId = 'passenger-19';
const recurringDayIndexes = new Set([0, 2, 4]);
const dailyArrivalCounts = [4, 4, 5, 4, 5] as const;

function shufflePassengerIds(
  passengerIds: readonly PassengerId[],
  random: () => number,
) {
  const shuffled = [...passengerIds];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export function createRandomArrivalSchedule(
  random: () => number = Math.random,
): ArrivalSchedule {
  const passengerIds = gameDays
    .flatMap((day) => day.passengerIds)
    .filter((passengerId) => passengerId !== recurringPassengerId);
  const shuffled = shufflePassengerIds(passengerIds, random);
  let offset = 0;

  return gameDays.map((_day, dayIndex) => {
    const hasRecurringVisit = recurringDayIndexes.has(dayIndex);
    const arrivalCount = dailyArrivalCounts[dayIndex] ?? 3;
    const regularCount = arrivalCount - (hasRecurringVisit ? 1 : 0);
    const arrivals = shuffled.slice(offset, offset + regularCount);
    offset += regularCount;
    if (hasRecurringVisit) arrivals.push(recurringPassengerId);
    return shufflePassengerIds(arrivals, random);
  });
}

export function getPassengerEncounterNumber(
  schedule: ArrivalSchedule,
  dayIndex: number,
  visitorIndex: number,
  passengerId: PassengerId,
) {
  let encounterNumber = 0;

  for (let currentDay = 0; currentDay <= dayIndex; currentDay += 1) {
    const arrivals = schedule[currentDay] ?? [];
    const finalIndex = currentDay === dayIndex ? visitorIndex : arrivals.length - 1;
    for (let index = 0; index <= finalIndex; index += 1) {
      if (arrivals[index] === passengerId) encounterNumber += 1;
    }
  }

  return Math.max(encounterNumber, 1);
}
