import { Link } from 'wouter';
import { useLanguage } from '../lib/i18n';
import '../styles/game-area-tabs.css';

type GameArea = 'room' | 'reception';

export function GameAreaTabs({ activeArea }: { activeArea: GameArea }) {
  const { language } = useLanguage();
  const labels = language === 'ru'
    ? {
      navigation: 'Переход между комнатами',
      room: 'Спуститься в обычную комнату',
      reception: 'Подняться в комнату приёма посетителей',
    }
    : {
      navigation: 'Move between rooms',
      room: 'Go down to the ordinary room',
      reception: 'Go up to visitor reception',
    };
  const isGoingUp = activeArea === 'room';
  const destination = isGoingUp
    ? { href: '/reception', label: labels.reception, arrow: '↑', direction: 'up' }
    : { href: '/play', label: labels.room, arrow: '↓', direction: 'down' };

  return (
    <nav
      className={`game-area-tabs game-area-tabs--${destination.direction}`}
      aria-label={labels.navigation}
    >
      <Link
        href={destination.href}
        className="game-area-tabs__link"
        aria-label={destination.label}
        title={destination.label}
      >
        <span aria-hidden="true">{destination.arrow}</span>
      </Link>
    </nav>
  );
}
