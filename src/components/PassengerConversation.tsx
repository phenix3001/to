import { useEffect, useRef, useState } from 'react';
import { resolveDialogueTurn } from '../lib/dialogues/flow';
import { PassengerDialogue } from '../lib/dialogues/types';
import { Language } from '../lib/i18n';
import { isNightmarePassenger } from '../lib/dialogues/temperament';
import { useGameProgress } from '../lib/GameProgressContext';
import { LuggageHandoff } from './LuggageHandoff';
import '../styles/dialogue-actions.css';
import '../styles/dialogue-reactions.css';

const uiText = {
  ru: { choices: 'Варианты разговора' },
  en: { choices: 'Conversation options' },
} as const;

interface PassengerConversationProps {
  dialogue: PassengerDialogue;
  language: Language;
  nextLabel: string;
  encounterNumber?: number;
  onComplete: () => void;
}

export function PassengerConversation({
  dialogue,
  language,
  nextLabel,
  encounterNumber = 1,
  onComplete,
}: PassengerConversationProps) {
  const [path, setPath] = useState<string[]>([]);
  const { unlockAchievement } = useGameProgress();
  const speechRef = useRef<HTMLParagraphElement>(null);
  const firstChoiceRef = useRef<HTMLButtonElement>(null);
  const turn = resolveDialogueTurn(dialogue, path, encounterNumber);
  const copy = uiText[language];
  const reactionEffect = turn.reaction?.effect;
  const reactionClass = turn.reaction
    ? ` dialogue-scene__conversation--${turn.reaction.effect}`
    : '';
  const nightmareClass = isNightmarePassenger(dialogue.passengerId)
    ? ' dialogue-scene__conversation--nightmare'
    : '';

  useEffect(() => {
    if (path.length === 0) speechRef.current?.focus();
    else if (!turn.isComplete) firstChoiceRef.current?.focus();
  }, [path, turn.isComplete]);

  useEffect(() => {
    if (reactionEffect === 'hit') unlockAchievement('provoked-hit');
    if (
      turn.isComplete
      && dialogue.passengerId === 'passenger-19'
      && encounterNumber >= 3
    ) unlockAchievement('nightmare-survivor');
  }, [dialogue.passengerId, encounterNumber, reactionEffect, turn.isComplete, unlockAchievement]);

  return (
    <div className={`dialogue-scene__conversation${reactionClass}${nightmareClass}`}>
      <p
        ref={speechRef}
        className="dialogue-scene__speech"
        aria-live="polite"
        tabIndex={-1}
      >
        {turn.action && (
          <span className="dialogue-scene__action">{turn.action[language]}</span>
        )}
        {turn.speech[language]}
        {turn.reaction && (
          <span
            className={`dialogue-scene__reaction dialogue-scene__reaction--${turn.reaction.effect}`}
          >
            {turn.reaction.text[language]}
          </span>
        )}
      </p>
      {!turn.isComplete && (
        <div
          key={path.join('-') || 'opening'}
          className="dialogue-scene__choices"
          role="group"
          aria-label={copy.choices}
        >
          {turn.choices.map((choice, index) => (
            <button
              key={choice.id}
              ref={index === 0 ? firstChoiceRef : undefined}
              type="button"
              onClick={(event) => {
                event.currentTarget.disabled = true;
                setPath((currentPath) => [...currentPath, choice.id]);
              }}
            >
              <b aria-hidden="true">{index + 1}</b>
              <span>{choice.text[language]}</span>
            </button>
          ))}
        </div>
      )}
      {turn.isComplete && (
        <LuggageHandoff
          passengerId={dialogue.passengerId}
          encounterNumber={encounterNumber}
          language={language}
          nextLabel={nextLabel}
          onComplete={onComplete}
        />
      )}
    </div>
  );
}
