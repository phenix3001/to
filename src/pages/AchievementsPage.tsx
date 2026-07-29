import { Link } from 'wouter';
import { useGameProgress } from '../lib/GameProgressContext';
import { clues } from '../lib/investigation';
import { useLanguage } from '../lib/i18n';
import '../styles/achievements.css';

export function AchievementsPage() {
  const { text } = useLanguage();
  const { foundClueIds, matchedCaseIds } = useGameProgress();
  const achievements = [
    {
      title: text.firstStep,
      description: text.firstStepDescription,
      unlocked: true,
    },
    {
      title: text.sharpEye,
      description: text.sharpEyeDescription,
      unlocked: foundClueIds.length > 0,
    },
    {
      title: text.goodMemory,
      description: text.goodMemoryDescription,
      unlocked: foundClueIds.length === clues.length * 7,
    },
    {
      title: text.detective,
      description: text.detectiveDescription,
      unlocked: matchedCaseIds.length === 3 * 7,
    },
  ];
  const unlockedCount = achievements.filter((achievement) => achievement.unlocked).length;

  return (
    <main className="achievements-page">
      <header className="achievements-page__header">
        <p>{text.notebook}</p>
        <h1>{text.achievements}</h1>
        <span>{text.opened}: {unlockedCount} / {achievements.length}</span>
      </header>

      <section className="achievements-grid" aria-label={text.achievements}>
        {achievements.map((achievement, index) => (
          <article
            className={`achievement${achievement.unlocked ? ' achievement--unlocked' : ''}`}
            key={achievement.title}
          >
            <span className="achievement__icon" aria-hidden="true">{index + 1}</span>
            <div>
              <h2>{achievement.title}</h2>
              <p>{achievement.description}</p>
            </div>
            <span className="achievement__status">
              {achievement.unlocked ? text.opened : text.closed}
            </span>
          </article>
        ))}
      </section>

      <Link href="/" className="achievements-page__back">← {text.backToDesk}</Link>
    </main>
  );
}
