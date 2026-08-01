import { createSuitcase } from './createSuitcase';

export const suitcases01to10 = [
  createSuitcase('suitcase-01', 'ochre', 'vertical-ribs', 'rounded', [148, 198, 52], 0),
  createSuitcase('suitcase-02', 'tan', 'fine-grid', 'square', [156, 190, 48], 1),
  createSuitcase('suitcase-03', 'walnut', 'bands', 'reinforced', [142, 204, 58], 2),
  createSuitcase('suitcase-04', 'ash', 'horizontal-ribs', 'rounded', [164, 188, 46], 3),
  createSuitcase('suitcase-05', 'graphite', 'diagonal', 'square', [152, 210, 54], 4),
  createSuitcase('suitcase-06', 'sand', 'weave', 'rounded', [160, 200, 50], 0),
  createSuitcase('suitcase-07', 'cocoa', 'diamond', 'reinforced', [146, 194, 62], 1),
  createSuitcase('suitcase-08', 'smoke', 'speckle', 'square', [168, 206, 44], 2),
  createSuitcase('suitcase-09', 'bronze', 'chevron', 'rounded', [150, 186, 56], 3),
  createSuitcase('suitcase-10', 'umber', 'plain', 'reinforced', [158, 212, 60], 4),
] as const;
