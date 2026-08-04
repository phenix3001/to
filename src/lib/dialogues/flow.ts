import { LocalizedText } from '../investigationTypes';
import { getDialogueAction } from './actions';
import { contentsBranch } from './branches/contents';
import { featureBranch } from './branches/feature';
import { locationBranch } from './branches/location';
import { appendDialogueBeat, insertDialogueDetail } from './localize';
import { ResolvedDialogueReaction, resolveDialogueReaction } from './reaction';
import { getSmallTalkChoices, getSmallTalkResponse } from './smallTalk';
import {
  DialogueBranch,
  DialogueBranchChoice,
  DialogueTopic,
  PassengerDialogue,
  dialogueTopics,
} from './types';

export type DialogueStep = 1 | 2 | 3 | 4;
export const DIALOGUE_STEP_COUNT = 4;

export interface ResolvedDialogueChoice {
  id: string;
  text: LocalizedText;
}

export interface ResolvedDialogueTurn {
  step: DialogueStep;
  action: LocalizedText | null;
  speech: LocalizedText;
  choices: readonly ResolvedDialogueChoice[];
  reaction: ResolvedDialogueReaction | null;
  isComplete: boolean;
}

const branches: Record<DialogueTopic, DialogueBranch> = {
  feature: featureBranch,
  contents: contentsBranch,
  location: locationBranch,
};

function isDialogueTopic(value: string): value is DialogueTopic {
  return dialogueTopics.some((topic) => topic === value);
}

function findBranchChoice(
  choices: readonly DialogueBranchChoice[],
  choiceId: string,
) {
  const choice = choices.find(({ id }) => id === choiceId);
  if (!choice) throw new Error(`Missing dialogue choice: ${choiceId}`);
  return choice;
}

function makeChoices(choices: readonly DialogueBranchChoice[]) {
  return choices.map(({ id, text }) => ({ id, text }));
}

export function resolveDialogueTurn(
  dialogue: PassengerDialogue,
  path: readonly string[],
  encounterNumber = 1,
): ResolvedDialogueTurn {
  if (path.length === 0) {
    return {
      step: 1,
      action: getDialogueAction(dialogue.passengerId, path.length, encounterNumber),
      speech: dialogue.opening,
      choices: getSmallTalkChoices(dialogue.passengerId),
      reaction: null,
      isComplete: false,
    };
  }

  const topicId = path[0];
  if (!isDialogueTopic(topicId)) throw new Error(`Unknown dialogue topic: ${topicId}`);
  const topicChoice = dialogue.choices.find(({ id }) => id === topicId);
  if (!topicChoice) throw new Error(`Missing topic for ${dialogue.passengerId}: ${topicId}`);
  const branch = branches[topicId];

  if (path.length === 1) {
    return {
      step: 2,
      action: getDialogueAction(dialogue.passengerId, path.length, encounterNumber),
      speech: getSmallTalkResponse(dialogue.passengerId, topicId, topicChoice.response),
      choices: makeChoices(branch.clarify),
      reaction: null,
      isComplete: false,
    };
  }

  const clarification = findBranchChoice(branch.clarify, path[1]);
  if (path.length === 2) {
    return {
      step: 3,
      action: getDialogueAction(dialogue.passengerId, path.length, encounterNumber),
      speech: appendDialogueBeat(
        insertDialogueDetail(clarification.response, topicChoice.response),
        dialogue.storyBeats[0],
      ),
      choices: makeChoices(branch.search),
      reaction: resolveDialogueReaction(dialogue, topicChoice.response, [clarification]),
      isComplete: false,
    };
  }

  const searchChoice = findBranchChoice(branch.search, path[2]);
  if (path.length === 3) {
    return {
      step: 4,
      action: getDialogueAction(dialogue.passengerId, path.length, encounterNumber),
      speech: appendDialogueBeat(
        insertDialogueDetail(searchChoice.response, topicChoice.response),
        dialogue.storyBeats[1],
      ),
      choices: makeChoices(branch.result),
      reaction: resolveDialogueReaction(
        dialogue,
        topicChoice.response,
        [clarification, searchChoice],
      ),
      isComplete: false,
    };
  }

  if (path.length !== DIALOGUE_STEP_COUNT) {
    throw new Error(`A dialogue can only have ${DIALOGUE_STEP_COUNT} steps.`);
  }
  const resultChoice = findBranchChoice(branch.result, path[3]);
  return {
    step: 4,
    action: getDialogueAction(dialogue.passengerId, path.length, encounterNumber),
    speech: appendDialogueBeat(
      insertDialogueDetail(resultChoice.response, topicChoice.response),
      dialogue.storyBeats[2],
    ),
    choices: [],
    reaction: resolveDialogueReaction(
      dialogue,
      topicChoice.response,
      [clarification, searchChoice, resultChoice],
    ),
    isComplete: true,
  };
}
