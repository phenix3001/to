import { Link } from 'wouter';
import { InvestigationGame } from './InvestigationGame';
import { useLanguage } from '../lib/i18n';
import '../styles/investigation-layout.css';
import '../styles/investigation-objects.css';
import '../styles/investigation-controls.css';
import '../styles/investigation-ui.css';

export function GameScene() {
  const { text } = useLanguage();

  return (
    <main className="game-scene" onContextMenu={(event) => event.preventDefault()}>
      <InvestigationGame />
      <Link href="/" className="game-scene__back">← {text.backToDesk}</Link>
    </main>
  );
}
