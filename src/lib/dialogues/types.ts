import { LocalizedText } from '../investigationTypes';
import { PassengerId } from '../passengers';

export const dialogueTopics = ['feature', 'contents', 'location'] as const;
export type DialogueTopic = (typeof dialogueTopics)[number];

export type DialogueReactionEffect =
  | 'tap'
  | 'joke'
  | 'tense'
  | 'slam'
  | 'nervous'
  | 'hit';

export interface DialogueReaction {
  annoyanceThreshold: 1 | 2 | 3;
  effect: DialogueReactionEffect;
  text: LocalizedText;
}

export interface DialogueChoice {
  id: DialogueTopic;
  text: LocalizedText;
  response: LocalizedText;
}

export type DialogueStoryBeats = readonly [LocalizedText, LocalizedText, LocalizedText];

export interface PassengerDialogue {
  passengerId: PassengerId;
  opening: LocalizedText;
  choices: readonly [DialogueChoice, DialogueChoice, DialogueChoice];
  storyBeats: DialogueStoryBeats;
  specialReaction: DialogueReaction;
}

export interface DialogueBranchChoice {
  id: string;
  text: LocalizedText;
  response: LocalizedText;
  annoyance?: 1;
}

export type DialogueBranchChoices = readonly [
  DialogueBranchChoice,
  DialogueBranchChoice,
  DialogueBranchChoice,
];

export interface DialogueBranch {
  clarify: DialogueBranchChoices;
  search: DialogueBranchChoices;
  result: DialogueBranchChoices;
}
