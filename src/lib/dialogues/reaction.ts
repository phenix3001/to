import { LocalizedText } from '../investigationTypes';
import { insertDialogueDetail } from './localize';
import {
  DialogueBranchChoice,
  DialogueReactionEffect,
  PassengerDialogue,
} from './types';

export interface ResolvedDialogueReaction {
  effect: DialogueReactionEffect;
  text: LocalizedText;
}

function annoyanceScore(choices: readonly DialogueBranchChoice[]) {
  return choices.reduce((score, choice) => score + (choice.annoyance ?? 0), 0);
}

export function resolveDialogueReaction(
  dialogue: PassengerDialogue,
  detail: LocalizedText,
  selectedChoices: readonly DialogueBranchChoice[],
): ResolvedDialogueReaction | null {
  if (selectedChoices.length === 0) return null;

  const currentScore = annoyanceScore(selectedChoices);
  const previousScore = annoyanceScore(selectedChoices.slice(0, -1));
  const { annoyanceThreshold, effect, text } = dialogue.specialReaction;

  if (previousScore >= annoyanceThreshold || currentScore < annoyanceThreshold) {
    return null;
  }

  return { effect, text: insertDialogueDetail(text, detail) };
}
