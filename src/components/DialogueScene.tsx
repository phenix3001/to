import { getPassengerDialogue } from '../lib/dialogues';
import { useLanguage } from '../lib/i18n';
import { isNightmarePassenger } from '../lib/dialogues/temperament';
import { useVisitFlow } from '../lib/VisitFlowContext';
import { PassengerConversation } from './PassengerConversation';
import '../styles/dialogue-scene.css';

const uiText = {
  ru: {
    day: 'День',
    finishVisit: 'Проводить посетителя',
    portraitAlt: 'Изображение посетителя',
  },
  en: {
    day: 'Day',
    finishVisit: 'See the visitor out',
    portraitAlt: 'Visitor portrait',
  },
} as const;

interface DialogueSceneProps {
  onVisitComplete: () => void;
}

export function DialogueScene({ onVisitComplete }: DialogueSceneProps) {
  const { language } = useLanguage();
  const {
    currentVisit, dialoguePath, chooseDialogueOption, completeVisit,
  } = useVisitFlow();
  const copy = uiText[language];
  if (!currentVisit) return null;

  const { day, passenger, encounterNumber, visitKey } = currentVisit;
  const dialogue = getPassengerDialogue(passenger.id, encounterNumber);
  const isNightmare = isNightmarePassenger(passenger.id);

  function showNext() {
    completeVisit();
    onVisitComplete();
  }

  return (
    <section
      className={isNightmare
        ? `dialogue-scene dialogue-scene--nightmare dialogue-scene--nightmare-${encounterNumber}`
        : 'dialogue-scene'}
      aria-label={`${copy.day} ${day.number}`}
    >
      <div className="dialogue-scene__portrait">
        <img key={visitKey} src={passenger.image} alt={copy.portraitAlt} />
      </div>
      <article className="dialogue-scene__panel">
        <PassengerConversation
          key={visitKey}
          dialogue={dialogue}
          language={language}
          nextLabel={copy.finishVisit}
          encounterNumber={encounterNumber}
          path={dialoguePath}
          onChoose={chooseDialogueOption}
          onComplete={showNext}
        />
      </article>
    </section>
  );
}
