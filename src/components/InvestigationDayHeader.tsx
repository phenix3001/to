import { Language } from '../lib/i18n';

interface InvestigationDayHeaderProps {
  language: Language;
  progress: number;
}

export function InvestigationDayHeader({
  language,
  progress,
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
