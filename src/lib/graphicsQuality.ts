export type GraphicsQuality = 'standard' | '2k';

const STORAGE_KEY = 'game-graphics-quality';

export function readGraphicsQuality(): GraphicsQuality {
  return localStorage.getItem(STORAGE_KEY) === '2k' ? '2k' : 'standard';
}

export function applyGraphicsQuality(quality: GraphicsQuality) {
  document.documentElement.dataset.graphicsQuality = quality;
  localStorage.setItem(STORAGE_KEY, quality);
}
