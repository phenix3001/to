import { contentsBranch } from './branches/contents';
import { featureBranch } from './branches/feature';
import { locationBranch } from './branches/location';
import { dialogueTopics } from './types';
import type { DialogueBranch, DialogueBranchChoice, DialogueTopic } from './types';

export type DialogueBranchStage = 'clarify' | 'search' | 'result';

export interface MixedDialogueChoice {
  topic: DialogueTopic;
  choice: DialogueBranchChoice;
}

const branches: Record<DialogueTopic, DialogueBranch> = {
  feature: featureBranch,
  contents: contentsBranch,
  location: locationBranch,
};

const stageIndexes: Record<DialogueBranchStage, number> = {
  clarify: 0,
  search: 1,
  result: 2,
};

export function getMixedDialogueChoices(
  rootTopic: DialogueTopic,
  stage: DialogueBranchStage,
): MixedDialogueChoice[] {
  const rootTopicIndex = dialogueTopics.indexOf(rootTopic);
  if (rootTopicIndex < 0) throw new Error(`Unknown dialogue topic: ${rootTopic}`);

  return dialogueTopics.map((topic, topicIndex) => {
    const choiceIndex = (rootTopicIndex + stageIndexes[stage] + topicIndex) % 3;
    const choice = branches[topic][stage][choiceIndex];
    if (!choice) throw new Error(`Missing ${stage} choice for ${topic}`);
    return { topic, choice };
  });
}

export function findMixedDialogueChoice(
  rootTopic: DialogueTopic,
  stage: DialogueBranchStage,
  choiceId: string,
) {
  const match = getMixedDialogueChoices(rootTopic, stage)
    .find(({ choice }) => choice.id === choiceId);
  if (!match) throw new Error(`Missing dialogue choice: ${choiceId}`);
  return match;
}
