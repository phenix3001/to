import { useState } from 'react';
import { useLocation } from 'wouter';
import { isNightmarePassenger } from '../lib/dialogues/temperament';
import { getDialogueCharactersPerSecond } from '../lib/dialogueTyping';
import { useLanguage } from '../lib/i18n';
import { useVisitFlow } from '../lib/VisitFlowContext';
import { getVisitorArrivalLine } from '../lib/visitorArrival';
import { DayTransition } from './DayTransition';
import { TypewriterText } from './TypewriterText';
import '../styles/dialogue-actions.css';
import '../styles/dialogue-scene.css';

const uiText = {
  ru: {
    answer: 'Проходи в комнату. Там вместе найдём твой багаж.',
    resumeSpeech: 'Мы уже начали искать багаж. Посетитель молча ждёт продолжения.',
    resumeAnswer: 'Вернёмся в комнату и продолжим поиски.',
    choices: 'Ответ посетителю',
    complete: 'Все пять дней завершены',
    completeText: 'Весь потерянный багаж возвращён владельцам.',
    restart: 'Начать заново',
    portraitAlt: 'Изображение посетителя',
  },
  en: {
    answer: 'Come into the room. We will find your luggage there together.',
    resumeSpeech: 'The luggage search has already begun. The visitor silently waits to continue.',
    resumeAnswer: 'Let us return to the room and continue searching.',
    choices: 'Reply to the visitor',
    complete: 'All five days are complete',
    completeText: 'Every lost bag has been returned to its owner.',
    restart: 'Start again',
    portraitAlt: 'Visitor portrait',
  },
} as const;

export function ReceptionEncounter() {
  const { language } = useLanguage();
  const {
    currentVisit, stage, finishDayTransition, admitToRoom, restart,
  } = useVisitFlow();
  const [, navigate] = useLocation();
  const [completedSpeechKey, setCompletedSpeechKey] = useState<string | null>(null);
  const copy = uiText[language];

  if (stage === 'complete') {
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

  if (!currentVisit) return null;
  if (stage === 'day-transition') {
    return (
      <DayTransition
        dayNumber={currentVisit.day.number}
        onComplete={finishDayTransition}
      />
    );
  }

  const { passenger, encounterNumber, visitKey } = currentVisit;
  const line = getVisitorArrivalLine(passenger.id, encounterNumber);
  const isNightmare = isNightmarePassenger(passenger.id);
  const charactersPerSecond = getDialogueCharactersPerSecond(
    passenger.id,
    encounterNumber,
  );
  const speechKey = `${visitKey}-${stage}-${language}`;
  const isSpeechComplete = completedSpeechKey === speechKey;

  function enterRoom() {
    if (!isSpeechComplete) return;
    admitToRoom();
    navigate('/play');
  }

  return (
    <section
      className={isNightmare
        ? `dialogue-scene dialogue-scene--nightmare dialogue-scene--nightmare-${encounterNumber}`
        : 'dialogue-scene'}
      aria-label={language === 'ru' ? 'Посетитель вошёл' : 'Visitor entered'}
    >
      <div className="dialogue-scene__portrait">
        <img key={visitKey} src={passenger.image} alt={copy.portraitAlt} />
      </div>
      <article className="dialogue-scene__panel">
        <p className="dialogue-scene__speech" aria-live="polite">
          <span className="dialogue-scene__action">{line.action[language]}</span>
          <TypewriterText
            key={speechKey}
            text={stage === 'room' ? copy.resumeSpeech : line.speech[language]}
            charactersPerSecond={charactersPerSecond}
            onComplete={() => setCompletedSpeechKey(speechKey)}
          />
        </p>
        {isSpeechComplete && (
          <div
            className="dialogue-scene__choices"
            role="group"
            aria-label={copy.choices}
          >
            <button type="button" onClick={enterRoom}>
              <span>{stage === 'room' ? copy.resumeAnswer : copy.answer}</span>
            </button>
          </div>
        )}
      </article>
    </section>
  );
}
