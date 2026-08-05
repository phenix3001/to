import { useEffect, useRef, useState } from 'react';
import { resolveDialogueTurn } from '../lib/dialogues/flow';
import { PassengerDialogue } from '../lib/dialogues/types';
import { Language } from '../lib/i18n';
import { isNightmarePassenger } from '../lib/dialogues/temperament';
import { getDialogueCharactersPerSecond } from '../lib/dialogueTyping';
import { useGameProgress } from '../lib/GameProgressContext';
import { LuggageHandoff } from './LuggageHandoff';
import { TypewriterText } from './TypewriterText';
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
  path: readonly string[];
  onChoose: (choiceId: string) => void;
  onComplete: () => void;
}

export function PassengerConversation({
  dialogue,
  language,
  nextLabel,
  encounterNumber = 1,
  path,
  onChoose,
  onComplete,
}: PassengerConversationProps) {
  const { unlockAchievement } = useGameProgress();
  const speechRef = useRef<HTMLParagraphElement>(null);
  const firstChoiceRef = useRef<HTMLButtonElement>(null);
  const [completedSpeechKey, setCompletedSpeechKey] = useState<string | null>(null);
  const turn = resolveDialogueTurn(dialogue, path, encounterNumber);
  const speechKey = [
    dialogue.passengerId,
    encounterNumber,
    language,
    path.join('-') || 'opening',
  ].join(':');
  const isSpeechComplete = completedSpeechKey === speechKey;
  const charactersPerSecond = getDialogueCharactersPerSecond(
    dialogue.passengerId,
    encounterNumber,
  );
  const copy = uiText[language];
  const reactionEffect = turn.reaction?.effect;
  const reactionClass = turn.reaction
    ? ` dialogue-scene__conversation--${turn.reaction.effect}`
    : '';
  const nightmareClass = isNightmarePassenger(dialogue.passengerId)
    ? ' dialogue-scene__conversation--nightmare'
    : '';

  useEffect(() => {
    if (!isSpeechComplete) speechRef.current?.focus();
    else if (!turn.isComplete) firstChoiceRef.current?.focus();
  }, [isSpeechComplete, speechKey, turn.isComplete]);

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
        <TypewriterText
          key={speechKey}
          text={turn.speech[language]}
          charactersPerSecond={charactersPerSecond}
          onComplete={() => setCompletedSpeechKey(speechKey)}
        />
        {turn.reaction && (
          <span
            className={`dialogue-scene__reaction dialogue-scene__reaction--${turn.reaction.effect}`}
          >
            {turn.reaction.text[language]}
          </span>
        )}
      </p>
      {!turn.isComplete && isSpeechComplete && (
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
              disabled={!isSpeechComplete}
              onClick={(event) => {
                if (!isSpeechComplete) return;
                event.currentTarget.disabled = true;
                onChoose(choice.id);
              }}
            >
              <span>{choice.text[language]}</span>
            </button>
          ))}
        </div>
      )}
      {turn.isComplete && isSpeechComplete && (
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
