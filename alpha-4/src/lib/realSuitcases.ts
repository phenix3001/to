import { backpackModels } from './luggage/backpackModels';
import { bagModels } from './luggage/bagModels';
import { briefcaseModels } from './luggage/briefcaseModels';
import { colorEditions } from './luggage/colorEditions';
import { suitcaseModels } from './luggage/suitcaseModels';
import type { RealSuitcase } from './luggage/types';

export type { RealSuitcase } from './luggage/types';

function roundRobin(
  groups: readonly (readonly RealSuitcase[])[],
): RealSuitcase[] {
  const longestGroup = Math.max(...groups.map((group) => group.length));
  return Array.from({ length: longestGroup }, (_, index) =>
    groups.flatMap((group) => (group[index] ? [group[index]] : [])),
  ).flat();
}

const internetModels = roundRobin([
  suitcaseModels,
  backpackModels,
  bagModels,
  briefcaseModels,
]);

export const realSuitcases: readonly RealSuitcase[] =
  internetModels.flatMap((model, index) => {
    const editionIndex = Math.floor(index / 3);
    const edition = (index + 1) % 3 === 0
      ? colorEditions[editionIndex]
      : undefined;
    return edition ? [model, edition] : [model];
  });
