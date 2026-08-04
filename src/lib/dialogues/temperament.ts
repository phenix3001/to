import type { PassengerId } from '../passengers';

export type DialogueTemperament =
  | 'calm'
  | 'friendly'
  | 'impatient'
  | 'mysterious'
  | 'nightmare';

const impatientPassengers = new Set<PassengerId>([
  'passenger-04', 'passenger-05', 'passenger-07',
  'passenger-09', 'passenger-10', 'passenger-15',
]);
const friendlyPassengers = new Set<PassengerId>([
  'passenger-02', 'passenger-08', 'passenger-16', 'passenger-18',
]);
const mysteriousPassengers = new Set<PassengerId>([
  'passenger-03', 'passenger-17', 'passenger-20',
]);
const nightmarePassengers = new Set<PassengerId>(['passenger-19']);

export function getDialogueTemperament(passengerId: PassengerId): DialogueTemperament {
  if (nightmarePassengers.has(passengerId)) return 'nightmare';
  if (impatientPassengers.has(passengerId)) return 'impatient';
  if (friendlyPassengers.has(passengerId)) return 'friendly';
  if (mysteriousPassengers.has(passengerId)) return 'mysterious';
  return 'calm';
}

export function isNightmarePassenger(passengerId: PassengerId) {
  return nightmarePassengers.has(passengerId);
}
