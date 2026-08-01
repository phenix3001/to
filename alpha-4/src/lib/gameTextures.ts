import magnifierUrl from '../assets/level-one/magnifier.png';
import { passengerTextureUrls } from './passengers';

const gameTextureUrls = [
  magnifierUrl,
  ...passengerTextureUrls,
];

function loadTexture(url: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      image.decode().catch(() => undefined).finally(resolve);
    };
    image.onerror = () => reject(new Error(`Texture failed to load: ${url}`));
    image.src = url;
  });
}

export async function preloadGameTextures(
  onProgress: (progress: number) => void,
) {
  let loadedCount = 0;
  onProgress(0);

  await Promise.all(
    gameTextureUrls.map(async (url) => {
      await loadTexture(url);
      loadedCount += 1;
      onProgress(Math.round((loadedCount / gameTextureUrls.length) * 100));
    }),
  );
}
