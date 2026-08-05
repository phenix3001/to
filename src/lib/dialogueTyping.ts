import type { PassengerId } from './passengers';

export const DEFAULT_DIALOGUE_CHARACTERS_PER_SECOND = 20;

const NIGHTMARE_CHARACTER_SPEEDS = [16, 12, 8] as const;

export function getDialogueCharactersPerSecond(
  passengerId: PassengerId,
  encounterNumber: number,
) {
  if (passengerId !== 'passenger-19') {
    return DEFAULT_DIALOGUE_CHARACTERS_PER_SECOND;
  }

  const speedIndex = Math.min(
    Math.max(encounterNumber - 1, 0),
    NIGHTMARE_CHARACTER_SPEEDS.length - 1,
  );
  return NIGHTMARE_CHARACTER_SPEEDS[speedIndex];
}
