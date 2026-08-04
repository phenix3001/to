import { Link } from 'wouter';
import { useGameSettings } from '../lib/GameSettingsContext';
import { useLanguage } from '../lib/i18n';

export function MagnifyingGlassButton() {
  const { text } = useLanguage();
  const { showCatalogBeforeGame } = useGameSettings();

  return (
    <Link
      href={showCatalogBeforeGame ? '/game' : '/play'}
      className="magnifier"
      aria-label={text.play}
    >
      <span className="object-label">{text.play}</span>
    </Link>
  );
}
