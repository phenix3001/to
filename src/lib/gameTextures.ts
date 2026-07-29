import magnifierUrl from '../assets/level-one/magnifier.png';
import businessPassengerUrl from '../assets/level-one/passenger-business.png';
import elderlyPassengerUrl from '../assets/level-one/passenger-elderly.png';
import punkPassengerUrl from '../assets/level-one/passenger-punk.png';
import blueSuitcaseUrl from '../assets/level-one/suitcase-blue.png';
import leatherSuitcaseUrl from '../assets/level-one/suitcase-leather.png';
import stickerSuitcaseUrl from '../assets/level-one/suitcase-stickers.png';

const gameTextureUrls = [
  magnifierUrl,
  businessPassengerUrl,
  elderlyPassengerUrl,
  punkPassengerUrl,
  blueSuitcaseUrl,
  leatherSuitcaseUrl,
  stickerSuitcaseUrl,
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
