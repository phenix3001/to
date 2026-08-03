import { readStorage, writeStorage } from './safeStorage';

export type GraphicsQuality = 'standard' | '2k';

const STORAGE_KEY = 'game-graphics-quality';

export function readGraphicsQuality(): GraphicsQuality {
  return readStorage(STORAGE_KEY) === '2k' ? '2k' : 'standard';
}

export function applyGraphicsQuality(quality: GraphicsQuality) {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.graphicsQuality = quality;
  }
  writeStorage(STORAGE_KEY, quality);
}
