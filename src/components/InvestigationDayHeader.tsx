import { GameDayNumber } from '../lib/gameDays';
import { Language } from '../lib/i18n';
import '../styles/day-intro.css';

interface InvestigationDayHeaderProps {
  currentDay: GameDayNumber;
  language: Language;
  progress: number;
}

export function InvestigationDayHeader({
  currentDay,
  language,
  progress,
}: InvestigationDayHeaderProps) {
  return (
    <>
      <div className="day-intro" aria-live="polite" key={currentDay}>
        <span>{language === 'ru' ? 'День' : 'Day'}</span>
        <strong>{currentDay}</strong>
      </div>

      <header className="case-progress">
        <div
          className="case-progress__track"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <b>{progress}%</b>
      </header>

      <div className="investigation-heading">
        <p>
          {language === 'ru'
            ? 'Дело · Бюро находок'
            : 'Case · Lost luggage'}
        </p>
        <h1>{language === 'ru' ? 'Осмотр багажа' : 'Luggage inspection'}</h1>
      </div>
    </>
  );
}
