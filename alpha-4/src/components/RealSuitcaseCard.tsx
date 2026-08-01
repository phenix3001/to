import { useState } from 'react';
import { useGameProgress } from '../lib/GameProgressContext';
import { Language } from '../lib/i18n';
import { getHouseholdItems } from '../lib/luggage/householdItems';
import { RealSuitcase } from '../lib/realSuitcases';
import { hasWebGLSupport } from '../lib/webgl';
import { SuitcaseViewer } from './SuitcaseViewer';
import '../styles/real-suitcases.css';

interface RealSuitcaseCardProps {
  language: Language;
  number: number;
  suitcase: RealSuitcase;
}

export function RealSuitcaseCard({
  language,
  number,
  suitcase,
}: RealSuitcaseCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'3d' | '2d'>(() =>
    hasWebGLSupport() ? '3d' : '2d');
  const { recordLuggageOpened } = useGameProgress();
  const title = suitcase.title[language];
  const contentsId = `luggage-contents-${suitcase.id}`;

  function openLuggage() {
    setIsOpen(true);
    recordLuggageOpened(
      suitcase.id,
      getHouseholdItems(number).map((item) => item.id),
    );
  }

  return (
    <article className="real-suitcase-card">
      <div className="real-suitcase-card__toolbar">
        <span className="real-suitcase-card__title">
          <b>№{String(number).padStart(2, '0')}</b>
          {title}
        </span>
        <div
          role="group"
          aria-label={language === 'ru' ? 'Вид багажа' : 'Luggage view'}
        >
          <button
            aria-pressed={view === '3d'}
            className={view === '3d' ? 'is-active' : ''}
            type="button"
            disabled={!hasWebGLSupport()}
            onClick={() => setView('3d')}
          >
            3D
          </button>
          <button
            aria-pressed={view === '2d'}
            className={view === '2d' ? 'is-active' : ''}
            type="button"
            onClick={() => setView('2d')}
          >
            2D
          </button>
        </div>
      </div>

      <SuitcaseViewer
        isOpen={isOpen}
        language={language}
        number={number}
        contentsId={contentsId}
        suitcase={suitcase}
        title={title}
        view={view}
      />

      {suitcase.contents && (
        <p className="real-suitcase-card__contents">
          <strong>{language === 'ru' ? 'Внутри:' : 'Inside:'}</strong>{' '}
          {suitcase.contents[language]}
        </p>
      )}

      <div className="real-suitcase-card__actions">
        <button
          type="button"
          aria-controls={contentsId}
          aria-expanded={isOpen}
          disabled={isOpen}
          onClick={openLuggage}
        >
          {language === 'ru' ? 'Открыть' : 'Open'}
        </button>
        <button
          type="button"
          aria-controls={contentsId}
          disabled={!isOpen}
          onClick={() => setIsOpen(false)}
        >
          {language === 'ru' ? 'Закрыть' : 'Close'}
        </button>
      </div>

      <footer>
        <span>{suitcase.author} · {suitcase.license}</span>
        <a href={suitcase.sourceUrl} target="_blank" rel="noreferrer">
          {language === 'ru' ? 'Источник' : 'Source'}
        </a>
      </footer>
    </article>
  );
}
