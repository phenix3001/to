import { createSuitcase } from './createSuitcase';

export const suitcases11to20 = [
  createSuitcase('suitcase-11', 'tan', 'horizontal-ribs', 'reinforced', [154, 202, 46], 1),
  createSuitcase('suitcase-12', 'walnut', 'diagonal', 'rounded', [166, 192, 52], 2),
  createSuitcase('suitcase-13', 'ash', 'weave', 'square', [144, 208, 60], 3),
  createSuitcase('suitcase-14', 'graphite', 'diamond', 'reinforced', [158, 196, 48], 4),
  createSuitcase('suitcase-15', 'sand', 'speckle', 'rounded', [170, 204, 54], 0),
  createSuitcase('suitcase-16', 'cocoa', 'chevron', 'square', [150, 190, 64], 1),
  createSuitcase('suitcase-17', 'smoke', 'plain', 'rounded', [162, 214, 50], 2),
  createSuitcase('suitcase-18', 'bronze', 'vertical-ribs', 'reinforced', [148, 200, 58], 3),
  createSuitcase('suitcase-19', 'umber', 'fine-grid', 'square', [156, 184, 44], 4),
  createSuitcase('suitcase-20', 'ochre', 'bands', 'rounded', [164, 210, 56], 0),
] as const;
