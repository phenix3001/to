interface GameLoadingScreenProps {
  progress: number;
  hasError: boolean;
  onRetry: () => void;
}

export function GameLoadingScreen({
  progress,
  hasError,
  onRetry,
}: GameLoadingScreenProps) {
  const { text } = useLanguage();

  return (
    <main className="loading-screen" aria-live="polite">
      <div className="loading-screen__content">
        <p className="loading-screen__label">{text.investigation}</p>
        <h1>{text.dayOne}</h1>

        {hasError ? (
          <>
            <p className="loading-screen__error">{text.loadingError}</p>
            <button type="button" onClick={onRetry}>{text.retry}</button>
          </>
        ) : (
          <>
            <div
              className="loading-screen__track"
              role="progressbar"
              aria-label={text.loadingTextures}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
            <p className="loading-screen__progress">{text.loadingTextures} · {progress}%</p>
          </>
        )}
      </div>
    </main>
  );
}
import { useLanguage } from '../lib/i18n';
