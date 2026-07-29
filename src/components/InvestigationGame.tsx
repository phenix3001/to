import { useCallback, useMemo, useState } from 'react';
import {
  CaseId,
  clues,
  readFoundClues,
  readMatchedCases,
  saveFoundClue,
  saveMatchedCase,
} from '../lib/investigation';
import { useLanguage } from '../lib/i18n';
import { InvestigationNotebook } from './InvestigationNotebook';
import { MagnifierTool } from './MagnifierTool';
import { PassengerLineup } from './PassengerLineup';
import { SuitcaseInspector } from './SuitcaseInspector';

export function InvestigationGame() {
  const { language } = useLanguage();
  const [activeCase, setActiveCase] = useState<CaseId>('elderly');
  const [face, setFace] = useState(0);
  const [magnifierActive, setMagnifierActive] = useState(false);
  const [foundClues, setFoundClues] = useState(readFoundClues);
  const [matchedCases, setMatchedCases] = useState(readMatchedCases);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [message, setMessage] = useState(
    language === 'ru' ? 'Выберите чемодан, возьмите лупу и осмотрите все шесть сторон.' : 'Choose a suitcase, take the magnifier, and inspect all six sides.',
  );

  const rotate = useCallback((step: number) => {
    setFace((current) => (current + step + 6) % 6);
  }, []);

  const progress = useMemo(
    () => Math.round(((foundClues.length + matchedCases.length) / (clues.length + 3)) * 100),
    [foundClues, matchedCases],
  );

  function chooseCase(id: CaseId) {
    setActiveCase(id);
    setFace(0);
    setMessage(language === 'ru' ? 'Осмотрите каждую сторону стрелками.' : 'Use the arrow keys to inspect every side.');
  }

  function findClue(clueId: string) {
    if (!magnifierActive) {
      setMessage(language === 'ru' ? 'Сначала возьмите лупу.' : 'Take the magnifier first.');
      return;
    }
    const clue = clues.find((item) => item.id === clueId)!;
    if (foundClues.includes(clueId)) {
      setMessage(language === 'ru' ? 'Эта улика уже записана.' : 'This clue is already recorded.');
      return;
    }
    setFoundClues(saveFoundClue(clueId));
    setMessage(`${language === 'ru' ? 'Записано' : 'Recorded'}: ${clue.title[language]}`);
  }

  function choosePassenger(passengerId: CaseId) {
    const caseClues = clues.filter((clue) => clue.caseId === activeCase);
    if (!caseClues.every((clue) => foundClues.includes(clue.id))) {
      setMessage(language === 'ru' ? 'Сначала найдите обе улики на этом чемодане.' : 'Find both clues on this suitcase first.');
      return;
    }
    if (passengerId !== activeCase) {
      setMessage(language === 'ru' ? 'Улики указывают на другого пассажира.' : 'The evidence points to another passenger.');
      return;
    }
    if (!matchedCases.includes(passengerId)) {
      const next = saveMatchedCase(passengerId);
      setMatchedCases(next);
      setMessage(next.length === 3
        ? (language === 'ru' ? 'Расследование завершено!' : 'Investigation complete!')
        : (language === 'ru' ? 'Владелец найден. Продолжайте расследование.' : 'Owner identified. Continue the investigation.'));
    }
  }

  return (
    <div className="investigation-game">
      <header className="case-progress">
        <div className="case-progress__track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <b>{progress}%</b>
      </header>

      <div className="investigation-heading">
        <p>{language === 'ru' ? 'Дело № 01 · Бюро находок' : 'Case 01 · Lost luggage'}</p>
        <h1>{language === 'ru' ? 'Осмотр багажа' : 'Luggage inspection'}</h1>
      </div>

      <div className="investigation-workspace">
        <PassengerLineup activeCase={activeCase} language={language} matchedCases={matchedCases} onChoose={choosePassenger} />
        <SuitcaseInspector
          activeCase={activeCase}
          face={face}
          foundClues={foundClues}
          language={language}
          magnifierActive={magnifierActive}
          onChooseCase={chooseCase}
          onFindClue={findClue}
          onRotate={rotate}
        />
        <aside className="investigation-tools">
          <MagnifierTool active={magnifierActive} language={language} onToggle={() => setMagnifierActive((value) => !value)} />
          <button type="button" className="notebook-tool" onClick={() => setNotebookOpen(true)}>
            <span aria-hidden="true">▤</span>
            {language === 'ru' ? `Блокнот · ${foundClues.length}/${clues.length}` : `Notebook · ${foundClues.length}/${clues.length}`}
          </button>
        </aside>
      </div>

      <p className="investigation-message" role="status">{message}</p>
      {notebookOpen && (
        <InvestigationNotebook foundClues={foundClues} language={language} onClose={() => setNotebookOpen(false)} />
      )}
    </div>
  );
}
