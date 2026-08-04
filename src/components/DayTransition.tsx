import { useEffect } from 'react';
import { useLanguage } from '../lib/i18n';
import '../styles/day-transition.css';

const transitionText = {
  ru: { day: 'День', begins: 'Бюро находок открывается' },
  en: { day: 'Day', begins: 'Lost luggage office opens' },
} as const;

type DayTransitionProps = {
  dayNumber: number;
  onComplete: () => void;
};

export function DayTransition({ dayNumber, onComplete }: DayTransitionProps) {
  const { language } = useLanguage();
  const copy = transitionText[language];

  useEffect(() => {
    const timeoutId = window.setTimeout(onComplete, 1800);
    return () => window.clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <div className="day-transition" role="status" aria-live="assertive">
      <div className="day-transition__content">
        <span className="day-transition__line" aria-hidden="true" />
        <p>{copy.day}</p>
        <strong>{dayNumber}</strong>
        <small>{copy.begins}</small>
        <span className="day-transition__line" aria-hidden="true" />
      </div>
    </div>
  );
}
