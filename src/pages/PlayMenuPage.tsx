import { GameAreaTabs } from '../components/GameAreaTabs';
import { WarehouseAtmosphere } from '../components/WarehouseAtmosphere';
import { useLanguage } from '../lib/i18n';
import '../styles/play-menu.css';

export function PlayMenuPage() {
  const { language } = useLanguage();

  return (
    <main
      className="play-menu"
      aria-label={language === 'ru' ? 'Игровая комната' : 'Game room'}
    >
      <div className="play-menu__backdrop" aria-hidden="true" />
      <WarehouseAtmosphere />
      <GameAreaTabs activeArea="room" />
    </main>
  );
}
