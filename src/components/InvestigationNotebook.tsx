import { clues } from '../lib/investigation';
import { Language } from '../lib/i18n';

interface InvestigationNotebookProps {
  foundClues: string[];
  language: Language;
  onClose: () => void;
}

export function InvestigationNotebook({
  foundClues,
  language,
  onClose,
}: InvestigationNotebookProps) {
  const entries = clues.filter((clue) => foundClues.includes(clue.id));

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
                <span>{clue.description[language]}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
