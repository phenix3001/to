import { CaseId, passengers } from '../lib/investigation';
import { Language } from '../lib/i18n';

interface PassengerLineupProps {
  activeCase: CaseId;
  language: Language;
  matchedCases: CaseId[];
  onChoose: (id: CaseId) => void;
}

export function PassengerLineup({
  activeCase,
  language,
  matchedCases,
  onChoose,
}: PassengerLineupProps) {
  return (
    <section className="passenger-lineup" aria-label={language === 'ru' ? 'Пассажиры' : 'Passengers'}>
      {passengers.map((passenger) => {
        const isMatched = matchedCases.includes(passenger.id);
        return (
          <button
            type="button"
            className={`passenger-card${activeCase === passenger.id ? ' is-related' : ''}${isMatched ? ' is-matched' : ''}`}
            onClick={() => onChoose(passenger.id)}
            aria-label={passenger.name[language]}
            key={passenger.id}
          >
            <img src={passenger.image} alt="" draggable={false} />
            <span>{passenger.name[language]}</span>
            {isMatched && <em aria-hidden="true">✓</em>}
          </button>
        );
      })}
    </section>
  );
}
