import { dayOneDialogues } from './dialogues/day-1';
import { dayTwoDialogues } from './dialogues/day-2';
import { dayThreeDialogues } from './dialogues/day-3';
import { dayFourDialogues } from './dialogues/day-4';
import { dayFiveDialogues } from './dialogues/day-5';
import { returningNightmareDialogues } from './dialogues/nightmare-19';
import { PassengerDialogue } from './dialogues/types';
import { PassengerId } from './passengers';

export type { DialogueChoice, PassengerDialogue } from './dialogues/types';

export const passengerDialogues: readonly PassengerDialogue[] = [
  ...dayOneDialogues,
  ...dayTwoDialogues,
  ...dayThreeDialogues,
  ...dayFourDialogues,
  ...dayFiveDialogues,
];

const dialoguesByPassenger = new Map(
  passengerDialogues.map((dialogue) => [dialogue.passengerId, dialogue]),
);

export function getPassengerDialogue(passengerId: PassengerId, encounterNumber = 1) {
  if (passengerId === 'passenger-19' && encounterNumber > 1) {
    const nightmareDialogue = returningNightmareDialogues[Math.min(encounterNumber, 3) - 2];
    if (nightmareDialogue) return nightmareDialogue;
  }
  const dialogue = dialoguesByPassenger.get(passengerId);
  if (!dialogue) throw new Error(`Missing dialogue for ${passengerId}`);
  return dialogue;
}
