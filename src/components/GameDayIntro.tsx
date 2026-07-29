import { GameDayNumber } from '../lib/gameDays';
import { Language } from '../lib/i18n';
import '../styles/day-intro.css';

interface GameDayIntroProps {
  day: GameDayNumber;
  language: Language;
}

export function GameDayIntro({ day, language }: GameDayIntroProps) {
  return (
    <div className="day-intro" aria-live="polite">
      <span>{language === 'ru' ? 'День' : 'Day'}</span>
      <strong>{day}</strong>
    </div>
  );
}
