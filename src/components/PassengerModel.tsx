import { CSSProperties } from 'react';
import { Language } from '../lib/i18n';
import { Passenger, PassengerId } from '../lib/passengers';

interface PassengerModelProps {
  language: Language;
  matched: boolean;
  onChoose: (id: PassengerId) => void;
  passenger: Passenger;
}

export function PassengerModel({
  language,
  matched,
  onChoose,
  passenger,
}: PassengerModelProps) {
  const hitboxStyle = {
    left: `${passenger.hitbox.x}%`,
    top: `${passenger.hitbox.y}%`,
    width: `${passenger.hitbox.width}%`,
    height: `${passenger.hitbox.height}%`,
  } satisfies CSSProperties;

  return (
    <article className={`passenger-model${matched ? ' is-matched' : ''}`}>
      <div className="passenger-model__figure">
        <img src={passenger.image} alt="" draggable={false} />
        <button
          type="button"
          className="passenger-model__hitbox"
          style={hitboxStyle}
          onClick={() => onChoose(passenger.id)}
          aria-label={passenger.name[language]}
        />
      </div>
      <span>{passenger.name[language]}</span>
      {matched && <em aria-hidden="true">✓</em>}
    </article>
  );
}
