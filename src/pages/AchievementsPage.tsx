import { Link } from 'wouter';
import {
  GALLERY_ITEM_PREFIX,
  GALLERY_LUGGAGE_PREFIX,
} from '../lib/gameProgress';
import { useGameProgress } from '../lib/GameProgressContext';
import { useLanguage } from '../lib/i18n';
import { householdItems } from '../lib/luggage/householdItems';
import { realSuitcases } from '../lib/realSuitcases';
import '../styles/achievements.css';

export function AchievementsPage() {
  const { text } = useLanguage();
  const { foundClueIds, matchedCaseIds } = useGameProgress();
  const foundItems = foundClueIds.filter((id) =>
    id.startsWith(GALLERY_ITEM_PREFIX));
  const openedLuggage = matchedCaseIds.filter((id) =>
    id.startsWith(GALLERY_LUGGAGE_PREFIX));
  const achievements = [
    {
      title: text.firstStep,
      description: text.firstStepDescription,
      unlocked: openedLuggage.length > 0,
    },
    {
      title: text.sharpEye,
      description: text.sharpEyeDescription,
      unlocked: foundItems.length >= 8,
    },
    {
      title: text.goodMemory,
      description: text.goodMemoryDescription,
      unlocked: foundItems.length === householdItems.length,
    },
    {
      title: text.detective,
      description: text.detectiveDescription,
      unlocked: openedLuggage.length === realSuitcases.length,
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
