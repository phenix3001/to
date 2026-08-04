import { useCallback, useState } from 'react';
import { createRandomArrivalSchedule, getPassengerEncounterNumber } from '../lib/arrivalSchedule';
import { getPassengerDialogue } from '../lib/dialogues';
import { gameDays } from '../lib/gameDays';
import { useLanguage } from '../lib/i18n';
import { passengersById } from '../lib/passengers';
import { isNightmarePassenger } from '../lib/dialogues/temperament';
import { useGameProgress } from '../lib/GameProgressContext';
import { DayTransition } from './DayTransition';
import { PassengerConversation } from './PassengerConversation';
import '../styles/dialogue-scene.css';

const uiText = {
  ru: {
    day: 'День',
    finishVisit: 'Проводить посетителя',
    complete: 'Все пять дней завершены',
    completeText: 'Весь потерянный багаж возвращён владельцам.',
    restart: 'Начать заново',
    portraitAlt: 'Изображение посетителя',
  },
  en: {
    day: 'Day',
    finishVisit: 'See the visitor out',
    complete: 'All five days are complete',
    completeText: 'Every lost bag has been returned to its owner.',
    restart: 'Start again',
    portraitAlt: 'Visitor portrait',
  },
} as const;

export function DialogueScene() {
  const { language } = useLanguage();
  const { unlockAchievement } = useGameProgress();
  const copy = uiText[language];
  const [dayIndex, setDayIndex] = useState(0);
  const [visitorIndex, setVisitorIndex] = useState(0);
  const [arrivalSchedule, setArrivalSchedule] = useState(createRandomArrivalSchedule);
  const [isDayTransitionVisible, setIsDayTransitionVisible] = useState(true);
  const day = gameDays[dayIndex];
  const hideDayTransition = useCallback(() => setIsDayTransitionVisible(false), []);

  function restart() {
    setDayIndex(0);
    setVisitorIndex(0);
    setArrivalSchedule(createRandomArrivalSchedule());
    setIsDayTransitionVisible(true);
  }

  if (!day) {
    return (
      <section className="dialogue-scene dialogue-scene--complete">
        <div className="dialogue-scene__completion">
          <h2>{copy.complete}</h2>
          <p>{copy.completeText}</p>
          <button type="button" onClick={restart}>{copy.restart}</button>
        </div>
      </section>
    );
  }

  if (isDayTransitionVisible) {
    return <DayTransition dayNumber={day.number} onComplete={hideDayTransition} />;
  }

  const passengerIds = arrivalSchedule[dayIndex];
  const passengerId = passengerIds?.[visitorIndex];
  if (!passengerId) throw new Error(`Missing arrival for day ${day.number}`);
  const passenger = passengersById.get(passengerId);
  if (!passenger) throw new Error(`Missing passenger: ${passengerId}`);
  const encounterNumber = getPassengerEncounterNumber(
    arrivalSchedule, dayIndex, visitorIndex, passengerId,
  );
  const dialogue = getPassengerDialogue(passengerId, encounterNumber);
  const isNightmare = isNightmarePassenger(passengerId);
  const isLastVisitor = visitorIndex === passengerIds.length - 1;
  const isLastDay = dayIndex === gameDays.length - 1;

  function showNext() {
    if (!isLastVisitor) {
      setVisitorIndex((index) => index + 1);
      return;
    }

    setVisitorIndex(0);
    if (isLastDay) unlockAchievement('shift-complete');
    if (!isLastDay) setIsDayTransitionVisible(true);
    setDayIndex((index) => index + 1);
  }

  return (
    <section
      className={isNightmare
        ? `dialogue-scene dialogue-scene--nightmare dialogue-scene--nightmare-${encounterNumber}`
        : 'dialogue-scene'}
      aria-label={`${copy.day} ${day.number}`}
    >
      <div className="dialogue-scene__portrait">
        <img key={passenger.id} src={passenger.image} alt={copy.portraitAlt} />
      </div>
      <article className="dialogue-scene__panel">
        <PassengerConversation
          key={`${day.number}-${passenger.id}`}
          dialogue={dialogue}
          language={language}
          nextLabel={copy.finishVisit}
          encounterNumber={encounterNumber}
          onComplete={showNext}
        />
      </article>
    </section>
  );
}
