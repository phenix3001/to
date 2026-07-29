import { Language } from '../lib/i18n';
import { Passenger, PassengerId } from '../lib/passengers';
import { PassengerModel } from './PassengerModel';

interface PassengerLineupProps {
  language: Language;
  matchedPassengerIds: PassengerId[];
  onChoose: (id: PassengerId) => void;
  passengers: Passenger[];
}

export function PassengerLineup({
  language,
  matchedPassengerIds,
  onChoose,
  passengers,
}: PassengerLineupProps) {
  return (
    <section
      className="passenger-lineup"
      aria-label={language === 'ru' ? 'Пассажиры' : 'Passengers'}
    >
      {passengers.map((passenger) => (
        <PassengerModel
          key={passenger.id}
          language={language}
          matched={matchedPassengerIds.includes(passenger.id)}
          onChoose={onChoose}
          passenger={passenger}
        />
      ))}
    </section>
  );
}
