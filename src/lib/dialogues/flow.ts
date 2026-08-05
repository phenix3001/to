import { LocalizedText } from '../investigationTypes';
import { getDialogueAction } from './actions';
import { appendDialogueBeat, insertDialogueDetail } from './localize';
import {
  findMixedDialogueChoice,
  getMixedDialogueChoices,
} from './mixedChoices';
import { ResolvedDialogueReaction, resolveDialogueReaction } from './reaction';
import { getSmallTalkChoices, getSmallTalkResponse } from './smallTalk';
import {
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

function isDialogueTopic(value: string): value is DialogueTopic {
  return dialogueTopics.some((topic) => topic === value);
}

function findTopicChoice(dialogue: PassengerDialogue, topic: DialogueTopic) {
  const choice = dialogue.choices.find(({ id }) => id === topic);
  if (!choice) throw new Error(`Missing topic for ${dialogue.passengerId}: ${topic}`);
  return choice;
}

function makeChoices(choices: ReturnType<typeof getMixedDialogueChoices>) {
  return choices.map(({ choice: { id, text } }) => ({ id, text }));
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
  const topicChoice = findTopicChoice(dialogue, topicId);

  if (path.length === 1) {
    return {
      step: 2,
      action: getDialogueAction(dialogue.passengerId, path.length, encounterNumber),
      speech: getSmallTalkResponse(dialogue.passengerId, topicId, topicChoice.response),
      choices: makeChoices(getMixedDialogueChoices(topicId, 'clarify')),
      reaction: null,
      isComplete: false,
    };
  }

  const clarification = findMixedDialogueChoice(topicId, 'clarify', path[1]);
  if (path.length === 2) {
    const detail = findTopicChoice(dialogue, clarification.topic).response;
    return {
      step: 3,
      action: getDialogueAction(dialogue.passengerId, path.length, encounterNumber),
      speech: appendDialogueBeat(
        insertDialogueDetail(clarification.choice.response, detail),
        dialogue.storyBeats[0],
      ),
      choices: makeChoices(getMixedDialogueChoices(topicId, 'search')),
      reaction: resolveDialogueReaction(dialogue, detail, [clarification.choice]),
      isComplete: false,
    };
  }

  const searchChoice = findMixedDialogueChoice(topicId, 'search', path[2]);
  if (path.length === 3) {
    const detail = findTopicChoice(dialogue, searchChoice.topic).response;
    return {
      step: 4,
      action: getDialogueAction(dialogue.passengerId, path.length, encounterNumber),
      speech: appendDialogueBeat(
        insertDialogueDetail(searchChoice.choice.response, detail),
        dialogue.storyBeats[1],
      ),
      choices: makeChoices(getMixedDialogueChoices(topicId, 'result')),
      reaction: resolveDialogueReaction(
        dialogue,
        detail,
        [clarification.choice, searchChoice.choice],
      ),
      isComplete: false,
    };
  }

  if (path.length !== DIALOGUE_STEP_COUNT) {
    throw new Error(`A dialogue can only have ${DIALOGUE_STEP_COUNT} steps.`);
  }
  const resultChoice = findMixedDialogueChoice(topicId, 'result', path[3]);
  const detail = findTopicChoice(dialogue, resultChoice.topic).response;
  return {
    step: 4,
    action: getDialogueAction(dialogue.passengerId, path.length, encounterNumber),
    speech: appendDialogueBeat(
      insertDialogueDetail(resultChoice.choice.response, detail),
      dialogue.storyBeats[2],
    ),
    choices: [],
    reaction: resolveDialogueReaction(
      dialogue,
      detail,
      [clarification.choice, searchChoice.choice, resultChoice.choice],
    ),
    isComplete: true,
  };
}
