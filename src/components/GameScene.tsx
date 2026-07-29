import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { InvestigationGame } from './InvestigationGame';
import { useLanguage } from '../lib/i18n';
import { GameSettingsOverlay } from './GameSettingsOverlay';
import '../styles/investigation-layout.css';
import '../styles/investigation-objects.css';
import '../styles/investigation-controls.css';
import '../styles/investigation-ui.css';
import '../styles/settings.css';

export function GameScene() {
  const { text } = useLanguage();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setSettingsOpen((isOpen) => !isOpen);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="game-scene" onContextMenu={(event) => event.preventDefault()}>
      <InvestigationGame />
      <Link href="/" className="game-scene__back">← {text.backToDesk}</Link>
      {settingsOpen && <GameSettingsOverlay onClose={() => setSettingsOpen(false)} />}
    </main>
  );
}
