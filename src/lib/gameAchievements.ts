export const GAME_ACHIEVEMENTS = [
  {
    id: 'wrong-luggage',
    titleKey: 'wrongLuggageAchievement',
    descriptionKey: 'wrongLuggageAchievementDescription',
  },
  {
    id: 'first-return',
    titleKey: 'firstReturnAchievement',
    descriptionKey: 'firstReturnAchievementDescription',
  },
  {
    id: 'nightmare-survivor',
    titleKey: 'nightmareSurvivorAchievement',
    descriptionKey: 'nightmareSurvivorAchievementDescription',
  },
  {
    id: 'shift-complete',
    titleKey: 'shiftCompleteAchievement',
    descriptionKey: 'shiftCompleteAchievementDescription',
  },
  {
    id: 'provoked-hit',
    titleKey: 'provokedHitAchievement',
    descriptionKey: 'provokedHitAchievementDescription',
  },
] as const;

export type GameAchievementId = (typeof GAME_ACHIEVEMENTS)[number]['id'];

export function isGameAchievementId(value: string): value is GameAchievementId {
  return GAME_ACHIEVEMENTS.some(({ id }) => id === value);
}
