import { useCallback, useMemo, useState } from 'react';
import {
  caseIdsForDay, clueIdsForDay, dailyCaseKey, dailyClueKey,
  firstIncompleteDay, isDayComplete, unlockedDay,
} from '../lib/dailyProgress';
import { caseForDaySuitcase, getGameDay, GameDayNumber } from '../lib/gameDays';
import { useGameProgress } from '../lib/GameProgressContext';
import { clues } from '../lib/investigation';
import { useLanguage } from '../lib/i18n';
import { passengers, PassengerId } from '../lib/passengers';
import { SuitcaseFaceIndex, SuitcaseId } from '../lib/suitcases';
import { InvestigationDayHeader } from './InvestigationDayHeader';
import { InvestigationNotebook } from './InvestigationNotebook';
import { MagnifierTool } from './MagnifierTool';
import { PassengerLineup } from './PassengerLineup';
import { SuitcaseInspector } from './SuitcaseInspector';

export function InvestigationGame() {
  const { language } = useLanguage();
  const progressState = useGameProgress();
  const initialDay = firstIncompleteDay(progressState.matchedCaseIds);
  const [currentDay, setCurrentDay] = useState<GameDayNumber>(initialDay);
  const day = getGameDay(currentDay);
  const [activeSuitcaseId, setActiveSuitcaseId] = useState<SuitcaseId>(
    day.caseSuitcaseIds.elderly,
  );
  const [face, setFace] = useState<SuitcaseFaceIndex>(0);
  const [magnifierActive, setMagnifierActive] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [message, setMessage] = useState(
    language === 'ru'
      ? 'Выберите чемодан, возьмите лупу и найдите его владельца.'
      : 'Choose a suitcase, take the magnifier, and find its owner.',
  );
  const foundClues = clueIdsForDay(progressState.foundClueIds, currentDay);
  const matchedCases = caseIdsForDay(progressState.matchedCaseIds, currentDay);
  const activeCase = caseForDaySuitcase(day, activeSuitcaseId);
  const dayComplete = isDayComplete(progressState.matchedCaseIds, currentDay);
  const unlockedThrough = unlockedDay(progressState.matchedCaseIds);
  const dayPassengers = useMemo(
    () => day.passengerIds.map((id) => passengers.find((item) => item.id === id)!),
    [day],
  );
  const matchedPassengerIds = Object.entries(day.caseOwners)
    .filter(([caseId]) => matchedCases.includes(caseId as keyof typeof day.caseOwners))
    .map(([, passengerId]) => passengerId);
  const progress = Math.round(((foundClues.length + matchedCases.length) / 9) * 100);

  const rotate = useCallback((step: number) => {
    setFace((current) => ((current + step + 6) % 6) as SuitcaseFaceIndex);
  }, []);

  function selectDay(nextDay: GameDayNumber) {
    const next = getGameDay(nextDay);
    setCurrentDay(nextDay);
    setActiveSuitcaseId(next.caseSuitcaseIds.elderly);
    setFace(0);
    setMessage(language === 'ru'
      ? `Начался день ${nextDay}. Прибыла новая группа пассажиров.`
      : `Day ${nextDay} started. A new group of passengers has arrived.`);
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
    progressState.recordClue(dailyClueKey(currentDay, clueId));
    setMessage(`${language === 'ru' ? 'Записано' : 'Recorded'}: ${clue.title[language]}`);
  }

  function choosePassenger(passengerId: PassengerId) {
    if (!activeCase) {
      setMessage(language === 'ru' ? 'У этого чемодана нет дела.' : 'This suitcase has no case.');
      return;
    }
    const caseClues = clues.filter((clue) => clue.caseId === activeCase);
    if (!caseClues.every((clue) => foundClues.includes(clue.id))) {
      setMessage(language === 'ru' ? 'Сначала найдите обе улики.' : 'Find both clues first.');
      return;
    }
    if (day.caseOwners[activeCase] !== passengerId) {
      setMessage(language === 'ru' ? 'Улики указывают на другого пассажира.' : 'The evidence points to someone else.');
      return;
    }
    if (!matchedCases.includes(activeCase)) {
      progressState.recordMatchedCase(dailyCaseKey(currentDay, activeCase));
      const finishingDay = matchedCases.length === 2;
      setMessage(finishingDay
        ? (language === 'ru' ? 'День завершён! Можно переходить дальше.' : 'Day complete! You can move on.')
        : (language === 'ru' ? 'Владелец найден. Продолжайте.' : 'Owner found. Keep going.'));
    }
  }

  return (
    <div className="investigation-game">
      <InvestigationDayHeader currentDay={currentDay} language={language} onSelectDay={selectDay} progress={progress} unlockedThrough={unlockedThrough} />
      <div className="investigation-workspace">
        <PassengerLineup language={language} matchedPassengerIds={matchedPassengerIds} onChoose={choosePassenger} passengers={dayPassengers} />
        <SuitcaseInspector activeSuitcaseId={activeSuitcaseId} day={day} face={face} foundClues={foundClues} language={language} magnifierActive={magnifierActive} onChooseSuitcase={(id) => { setActiveSuitcaseId(id); setFace(0); }} onFindClue={findClue} onRotate={rotate} />
        <aside className="investigation-tools">
          <MagnifierTool active={magnifierActive} language={language} onToggle={() => setMagnifierActive((value) => !value)} />
          <button type="button" className="notebook-tool" onClick={() => setNotebookOpen(true)}>
            <span aria-hidden="true">▤</span>
            {language === 'ru' ? `Блокнот · ${foundClues.length}/6` : `Notebook · ${foundClues.length}/6`}
          </button>
          {dayComplete && currentDay < 7 && (
            <button type="button" className="next-day-button" onClick={() => selectDay((currentDay + 1) as GameDayNumber)}>
              {language === 'ru' ? 'Следующий день →' : 'Next day →'}
            </button>
          )}
        </aside>
      </div>
      <p className="investigation-message" role="status">{message}</p>
      {notebookOpen && <InvestigationNotebook day={day} foundClues={foundClues} language={language} onClose={() => setNotebookOpen(false)} />}
    </div>
  );
}
