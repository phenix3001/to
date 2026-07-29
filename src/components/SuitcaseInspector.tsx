import { useEffect, useState } from 'react';
import magnifierUrl from '../assets/level-one/magnifier.png';
import { CaseId, clues, faceNames, suitcases } from '../lib/investigation';
import { Language } from '../lib/i18n';

interface SuitcaseInspectorProps {
  activeCase: CaseId;
  face: number;
  foundClues: string[];
  language: Language;
  magnifierActive: boolean;
  onChooseCase: (id: CaseId) => void;
  onFindClue: (clueId: string) => void;
  onRotate: (step: number) => void;
}

export function SuitcaseInspector(props: SuitcaseInspectorProps) {
  const {
    activeCase, face, foundClues, language, magnifierActive,
    onChooseCase, onFindClue, onRotate,
  } = props;
  const [pointer, setPointer] = useState({ x: 0, y: 0, visible: false });
  const suitcase = suitcases.find((item) => item.id === activeCase)!;
  const visibleClues = clues.filter((clue) => clue.caseId === activeCase && clue.face === face);

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
        className={`suitcase-stage face-${face}${magnifierActive ? ' is-searching' : ''}`}
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          setPointer({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, visible: true });
        }}
        onMouseLeave={() => setPointer((value) => ({ ...value, visible: false }))}
      >
        <span className="suitcase-stage__side">{faceNames[language][face]} · {face + 1}/6</span>
        <img className="inspected-suitcase" src={suitcase.image} alt={suitcase.name[language]} draggable={false} />

        {visibleClues.map((clue) => {
          const isFound = foundClues.includes(clue.id);
          return (
            <button
              type="button"
              className={`clue-target${magnifierActive ? ' can-detect' : ''}${isFound ? ' is-found' : ''}`}
              style={{ left: `${clue.x}%`, top: `${clue.y}%` }}
              onClick={() => onFindClue(clue.id)}
              aria-label={isFound ? clue.title[language] : (language === 'ru' ? 'Неизвестная улика' : 'Unknown clue')}
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

      <div className="suitcase-picker" aria-label={language === 'ru' ? 'Чемоданы' : 'Suitcases'}>
        {suitcases.map((item) => (
          <button
            type="button"
            className={item.id === activeCase ? 'is-active' : ''}
            onClick={() => onChooseCase(item.id)}
            aria-label={item.name[language]}
            key={item.id}
          >
            <img src={item.image} alt="" draggable={false} />
          </button>
        ))}
      </div>
    </section>
  );
}
