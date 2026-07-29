import { Link } from 'wouter';
import { clues, readFoundClues } from '../lib/investigation';
import { useLanguage } from '../lib/i18n';
import '../styles/achievements.css';

export function AchievementsPage() {
  const { language, text } = useLanguage();
  const foundClues = readFoundClues();
  const entries = clues.filter((clue) => foundClues.includes(clue.id));

  return (
    <main className="achievements-page">
      <header className="achievements-page__header">
        <p>{text.notebook}</p>
        <h1>{language === 'ru' ? 'Записи по делу' : 'Case notes'}</h1>
        <span>
          {language === 'ru'
            ? `Найдено улик: ${entries.length} из ${clues.length}`
            : `Evidence found: ${entries.length} of ${clues.length}`}
        </span>
      </header>

      <section className="achievements-grid notebook-evidence" aria-label={text.notebook}>
        {entries.length === 0 && (
          <p className="notebook-evidence__empty">
            {language === 'ru'
              ? 'Пока записей нет. Возьмите лупу на первом уровне и исследуйте чемоданы.'
              : 'No notes yet. Take the magnifier on level one and inspect the suitcases.'}
          </p>
        )}
        {entries.map((clue, index) => (
          <article className="achievement achievement--unlocked" key={clue.id}>
            <span className="achievement__icon" aria-hidden="true">{index + 1}</span>
            <div>
              <h2>{clue.title[language]}</h2>
              <p>{clue.description[language]}</p>
            </div>
            <span className="achievement__status">✓</span>
          </article>
        ))}
      </section>

      <Link href="/" className="achievements-page__back">← {text.backToDesk}</Link>
    </main>
  );
}
