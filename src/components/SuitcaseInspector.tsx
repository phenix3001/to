import { useEffect, useState } from 'react';
import magnifierUrl from '../assets/level-one/magnifier.png';
import {
  clues,
  faceNames,
} from '../lib/investigation';
import { caseForDaySuitcase, GameDay } from '../lib/gameDays';
import { Language } from '../lib/i18n';
import {
  suitcaseCatalog,
  suitcasesById,
  SuitcaseFaceIndex,
  SuitcaseId,
} from '../lib/suitcases';
import { SuitcaseModel } from './SuitcaseModel';
import { SuitcaseThumbnail } from './SuitcaseThumbnail';

interface SuitcaseInspectorProps {
  activeSuitcaseId: SuitcaseId;
  day: GameDay;
  face: SuitcaseFaceIndex;
  foundClues: string[];
  language: Language;
  magnifierActive: boolean;
  onChooseSuitcase: (id: SuitcaseId) => void;
  onFindClue: (clueId: string) => void;
  onRotate: (step: number) => void;
}

export function SuitcaseInspector(props: SuitcaseInspectorProps) {
  const {
    activeSuitcaseId, day, face, foundClues, language, magnifierActive,
    onChooseSuitcase, onFindClue, onRotate,
  } = props;
  const [pointer, setPointer] = useState({ x: 0, y: 0, visible: false });
  const suitcase = suitcasesById.get(activeSuitcaseId)!;
  const caseId = caseForDaySuitcase(day, activeSuitcaseId);
  const visibleClues = caseId
    ? clues.filter((clue) => clue.caseId === caseId && clue.face === face)
    : [];

  useEffect(() => {
    function rotateWithKeyboard(event: KeyboardEvent) {
      const steps: Record<string, number> = {
        ArrowLeft: -1,
        ArrowRight: 1,
        ArrowUp: -2,
        ArrowDown: 2,
      };
      const step = steps[event.key];
      if (step === undefined) return;
      event.preventDefault();
      onRotate(step);
    }

    window.addEventListener('keydown', rotateWithKeyboard);
    return () => window.removeEventListener('keydown', rotateWithKeyboard);
  }, [onRotate]);

  return (
    <section className="suitcase-inspector">
      <div
        className={`suitcase-stage${magnifierActive ? ' is-searching' : ''}`}
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          setPointer({
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top,
            visible: true,
          });
        }}
        onMouseLeave={() => setPointer((value) => ({ ...value, visible: false }))}
      >
        <span className="suitcase-stage__side">
          {faceNames[language][face]} · {face + 1}/6
        </span>
        <SuitcaseModel
          className="inspected-suitcase"
          face={face}
          label={suitcase.label[language]}
          suitcase={suitcase}
        />

        {visibleClues.map((clue) => {
          const isFound = foundClues.includes(clue.id);
          return (
            <button
              type="button"
              className={`clue-target${magnifierActive ? ' can-detect' : ''}${isFound ? ' is-found' : ''}`}
              style={{ left: `${clue.x}%`, top: `${clue.y}%` }}
              onClick={() => onFindClue(clue.id)}
              aria-label={isFound
                ? clue.title[language]
                : (language === 'ru' ? 'Неизвестная улика' : 'Unknown clue')}
              key={clue.id}
            >
              <span>{isFound ? '✓' : '?'}</span>
            </button>
          );
        })}

        {magnifierActive && pointer.visible && (
          <img
            className="magnifier-cursor"
            src={magnifierUrl}
            alt=""
            style={{ left: pointer.x, top: pointer.y }}
            draggable={false}
          />
        )}
      </div>

      <div className="rotation-controls">
        <button type="button" onClick={() => onRotate(-1)} aria-label={language === 'ru' ? 'Повернуть влево' : 'Rotate left'}>←</button>
        <span>{language === 'ru' ? 'Стрелки — вращать' : 'Arrow keys — rotate'}</span>
        <button type="button" onClick={() => onRotate(1)} aria-label={language === 'ru' ? 'Повернуть вправо' : 'Rotate right'}>→</button>
      </div>

      <div className="suitcase-picker" aria-label={language === 'ru' ? '6 чемоданов' : '6 suitcases'}>
        {suitcaseCatalog
          .filter((item) => day.suitcaseIds.includes(item.id))
          .map((item) => (
          <button
            type="button"
            className={item.id === activeSuitcaseId ? 'is-active' : ''}
            onClick={() => onChooseSuitcase(item.id)}
            aria-label={item.label[language]}
            title={item.label[language]}
            key={item.id}
          >
            <SuitcaseThumbnail suitcase={item} size={58} />
            <small>{item.id.slice(-2)}</small>
          </button>
          ))}
      </div>
    </section>
  );
}
