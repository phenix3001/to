import { useEffect, useState } from 'react';
import { GameLoadingScreen } from '../components/GameLoadingScreen';
import { GameScene } from '../components/GameScene';
import { preloadGameTextures } from '../lib/gameTextures';
import '../styles/game.css';

type LoadingStatus = 'loading' | 'ready' | 'error';

export function GamePage() {
  const [status, setStatus] = useState<LoadingStatus>('loading');
  const [progress, setProgress] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function loadGame() {
      setStatus('loading');
      setProgress(0);

      try {
        await Promise.all([
          preloadGameTextures((value) => {
            if (!isCancelled) setProgress(value);
          }),
          new Promise((resolve) => window.setTimeout(resolve, 700)),
        ]);

        if (!isCancelled) setStatus('ready');
      } catch {
        if (!isCancelled) setStatus('error');
      }
    }

    void loadGame();
    return () => {
      isCancelled = true;
    };
  }, [attempt]);

  if (status !== 'ready') {
    return (
      <GameLoadingScreen
        progress={progress}
        hasError={status === 'error'}
        onRetry={() => setAttempt((value) => value + 1)}
      />
    );
  }

  return <GameScene />;
}
