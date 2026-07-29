import { gameDayNumbers, GameDayNumber } from '../lib/gameDays';
import { Language } from '../lib/i18n';

interface InvestigationDayHeaderProps {
  currentDay: GameDayNumber;
  language: Language;
  onSelectDay: (day: GameDayNumber) => void;
  progress: number;
  unlockedThrough: GameDayNumber;
}

export function InvestigationDayHeader({
  currentDay,
  language,
  onSelectDay,
  progress,
  unlockedThrough,
}: InvestigationDayHeaderProps) {
  return (
    <>
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
        <nav className="day-selector" aria-label={language === 'ru' ? 'Игровые дни' : 'Game days'}>
          {gameDayNumbers.map((day) => {
            const locked = day > unlockedThrough;
            return (
              <button
                type="button"
                className={day === currentDay ? 'is-active' : ''}
                disabled={locked}
                onClick={() => onSelectDay(day)}
                key={day}
              >
                {locked ? '🔒' : day}
              </button>
            );
          })}
        </nav>
        <p>
          {language === 'ru'
            ? `День ${currentDay} из 7 · Бюро находок`
            : `Day ${currentDay} of 7 · Lost luggage`}
        </p>
        <h1>{language === 'ru' ? 'Осмотр багажа' : 'Luggage inspection'}</h1>
      </div>
    </>
  );
}
