import { useEffect, useMemo, useRef, useState } from 'react';
import type { Language } from '../lib/i18n';
import {
  getLuggageHandoffChoices,
  isCorrectLuggage,
} from '../lib/luggageHandoff';
import type { PassengerId } from '../lib/passengers';
import { suitcaseWearLabels } from '../lib/suitcases';
import type { SuitcaseId } from '../lib/suitcases';
import { useGameProgress } from '../lib/GameProgressContext';
import { SuitcaseThumbnail } from './SuitcaseThumbnail';
import '../styles/luggage-handoff.css';

const uiText = {
  ru: {
    prompt: 'По последней примете выбери нужный багаж в комнате.',
    correct: 'Посетитель узнаёт багаж и забирает его. Приём завершён.',
    wrong: 'Не подходит. Посетитель резко отодвигает чужой багаж обратно к стене.',
  },
  en: {
    prompt: 'Use the final clue to choose the right luggage in the room.',
    correct: 'The visitor recognizes the luggage and takes it. The visit is complete.',
    wrong: 'Wrong one. The visitor sharply pushes the unfamiliar bag back toward the wall.',
  },
} as const;

const finalNightmareText = {
  ru: 'Мистер Блэк не касается чемодана. За твоей спиной щёлкает замок. «Теперь посмотри, кто остался в отражении».',
  en: 'Mr. Black does not touch the suitcase. The lock clicks behind you. “Now look at who remains in the reflection.”',
} as const;

interface LuggageHandoffProps {
  passengerId: PassengerId;
  encounterNumber: number;
  language: Language;
  nextLabel: string;
  onComplete: () => void;
}

export function LuggageHandoff({
  passengerId,
  encounterNumber,
  language,
  nextLabel,
  onComplete,
}: LuggageHandoffProps) {
  const { unlockAchievement } = useGameProgress();
  const [wrongIds, setWrongIds] = useState<SuitcaseId[]>([]);
  const [isResolved, setIsResolved] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const firstChoiceRef = useRef<HTMLButtonElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);
  const choices = useMemo(
    () => getLuggageHandoffChoices(passengerId, encounterNumber),
    [encounterNumber, passengerId],
  );
  const copy = uiText[language];
  const feedbackText = feedback === 'correct'
    && passengerId === 'passenger-19'
    && encounterNumber >= 3
    ? finalNightmareText[language]
    : feedback ? copy[feedback] : '';

  useEffect(() => {
    if (isResolved) continueRef.current?.focus();
    else firstChoiceRef.current?.focus();
  }, [isResolved]);

  function chooseLuggage(suitcaseId: SuitcaseId) {
    const suitcase = choices.find(({ id }) => id === suitcaseId);
    if (!suitcase || isResolved) return;
    if (isCorrectLuggage(suitcase, passengerId)) {
      setIsResolved(true);
      setFeedback('correct');
      unlockAchievement('first-return');
      return;
    }
    setWrongIds((current) => current.includes(suitcaseId)
      ? current
      : [...current, suitcaseId]);
    setFeedback('wrong');
    unlockAchievement('wrong-luggage');
  }

  return (
    <section className="luggage-handoff" aria-label={copy.prompt}>
      <p className="luggage-handoff__prompt">{copy.prompt}</p>
      <div className="luggage-handoff__choices">
        {choices.map((suitcase, index) => (
          <button
            type="button"
            key={suitcase.id}
            ref={index === 0 ? firstChoiceRef : undefined}
            className={wrongIds.includes(suitcase.id)
              ? 'luggage-handoff__choice luggage-handoff__choice--wrong'
              : 'luggage-handoff__choice'}
            disabled={isResolved || wrongIds.includes(suitcase.id)}
            onClick={() => chooseLuggage(suitcase.id)}
          >
            <SuitcaseThumbnail
              suitcase={suitcase}
              size={64}
              label={`${suitcase.label[language]}, ${suitcaseWearLabels[suitcase.wear][language]}`}
            />
            <span>{suitcase.label[language]}</span>
            <small>{suitcaseWearLabels[suitcase.wear][language]}</small>
          </button>
        ))}
      </div>
      {feedback && (
        <p className={`luggage-handoff__feedback luggage-handoff__feedback--${feedback}`} role="status">
          {feedbackText}
        </p>
      )}
      {isResolved && (
        <button
          ref={continueRef}
          type="button"
          className="dialogue-scene__next"
          onClick={onComplete}
        >
          {nextLabel} →
        </button>
      )}
    </section>
  );
}
