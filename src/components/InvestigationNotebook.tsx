import { clues } from '../lib/investigation';
import { GameDay } from '../lib/gameDays';
import { Language } from '../lib/i18n';
import { passengers } from '../lib/passengers';

interface InvestigationNotebookProps {
  day: GameDay;
  foundClues: string[];
  language: Language;
  onClose: () => void;
}

export function InvestigationNotebook({
  day,
  foundClues,
  language,
  onClose,
}: InvestigationNotebookProps) {
  const entries = clues.filter((clue) => foundClues.includes(clue.id));

  function ownerEvidence(caseId: keyof GameDay['caseOwners']) {
    const ownerId = day.caseOwners[caseId];
    const owner = passengers.find((passenger) => passenger.id === ownerId)!;
    return language === 'ru'
      ? `Найденная улика связана с пассажиром: ${owner.name.ru}.`
      : `The evidence is connected to passenger: ${owner.name.en}.`;
  }

  return (
    <div className="case-notebook-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="case-notebook"
        role="dialog"
        aria-modal="true"
        aria-label={language === 'ru' ? 'Блокнот улик' : 'Evidence notebook'}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="case-notebook__close" onClick={onClose}>×</button>
        <p>{language === 'ru' ? 'Личный блокнот' : 'Personal notebook'}</p>
        <h2>{language === 'ru' ? 'Найденные улики' : 'Collected evidence'}</h2>
        {entries.length === 0 ? (
          <span className="case-notebook__empty">
            {language === 'ru' ? 'Здесь пока пусто. Возьмите лупу и осмотрите чемоданы.' : 'Nothing yet. Take the magnifier and inspect the suitcases.'}
          </span>
        ) : (
          <ol>
            {entries.map((clue) => (
              <li key={clue.id}>
                <strong>{clue.title[language]}</strong>
                <span>{ownerEvidence(clue.caseId)}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
