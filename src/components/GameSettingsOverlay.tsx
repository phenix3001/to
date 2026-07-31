import { useLanguage } from '../lib/i18n';
import { SettingsPanel } from './SettingsPanel';

interface GameSettingsOverlayProps {
  onClose: () => void;
}

export function GameSettingsOverlay({ onClose }: GameSettingsOverlayProps) {
  const { text } = useLanguage();

  return (
    <div
      className="game-settings-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={text.settings}
    >
      <SettingsPanel onContinue={onClose} />
    </div>
  );
}
