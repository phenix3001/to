import type { PassengerId } from './passengers';
import { suitcaseCatalog } from './suitcases';
import type { SuitcaseConfig } from './suitcases';

function passengerSeed(passengerId: PassengerId, encounterNumber: number) {
  const passengerNumber = Number(passengerId.replace('passenger-', ''));
  return passengerNumber * 7 + encounterNumber * 11;
}

export function isCorrectLuggage(
  suitcase: SuitcaseConfig,
  passengerId: PassengerId,
) {
  return suitcase.visualThemePassengerId === passengerId;
}

export function getLuggageHandoffChoices(
  passengerId: PassengerId,
  encounterNumber: number,
) {
  const correctCases = suitcaseCatalog.filter((suitcase) =>
    isCorrectLuggage(suitcase, passengerId));
  const distractors = suitcaseCatalog.filter((suitcase) =>
    suitcase.visualThemePassengerId !== null
    && suitcase.visualThemePassengerId !== passengerId);
  const seed = passengerSeed(passengerId, encounterNumber);
  const correct = correctCases[(encounterNumber - 1) % correctCases.length];
  const firstWrong = distractors[seed % distractors.length];
  const secondWrong = distractors[(seed + 7) % distractors.length];

  if (!correct || !firstWrong || !secondWrong) {
    throw new Error(`Missing luggage choices for ${passengerId}`);
  }

  const choices = [correct, firstWrong, secondWrong];
  const rotation = seed % choices.length;
  return [...choices.slice(rotation), ...choices.slice(0, rotation)];
}
