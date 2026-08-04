import { DialogueScene } from '../components/DialogueScene';
import { GameAreaTabs } from '../components/GameAreaTabs';
import { useLanguage } from '../lib/i18n';
import '../styles/reception.css';

export function ReceptionPage() {
  const { language } = useLanguage();

  return (
    <main
      className="reception"
      aria-label={language === 'ru' ? 'Приём посетителей' : 'Visitor reception'}
    >
      <div className="reception__backdrop" aria-hidden="true" />
      <GameAreaTabs activeArea="reception" />
      <DialogueScene />
    </main>
  );
}
