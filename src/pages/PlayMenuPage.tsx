import { useLocation } from 'wouter';
import { DialogueScene } from '../components/DialogueScene';
import { GameAreaTabs } from '../components/GameAreaTabs';
import { WarehouseAtmosphere } from '../components/WarehouseAtmosphere';
import { useLanguage } from '../lib/i18n';
import { useVisitFlow } from '../lib/VisitFlowContext';
import '../styles/play-menu.css';

export function PlayMenuPage() {
  const { language } = useLanguage();
  const { stage } = useVisitFlow();
  const [, navigate] = useLocation();

  return (
    <main
      className="play-menu"
      aria-label={language === 'ru' ? 'Игровая комната' : 'Game room'}
    >
      <div className="play-menu__backdrop" aria-hidden="true" />
      <WarehouseAtmosphere />
      <GameAreaTabs activeArea="room" />
      {stage === 'room' && (
        <DialogueScene onVisitComplete={() => navigate('/reception')} />
      )}
    </main>
  );
}
