import { CaseId, clues } from './investigation';
import { supabase } from './supabase';

export interface GameProgress {
  foundClueIds: string[];
  matchedCaseIds: CaseId[];
}

export const EMPTY_PROGRESS: GameProgress = {
  foundClueIds: [],
  matchedCaseIds: [],
};

const LEVEL_ID = 'case-01';
const STORAGE_PREFIX = 'airport-progress:';
const LEGACY_CLUES_KEY = 'airport-found-clues';
const LEGACY_MATCHES_KEY = 'airport-matched-cases';

function validStrings(value: unknown) {
  return Array.isArray(value)
    ? value.filter((id): id is string => typeof id === 'string')
    : [];
}

export function normalizeProgress(value: unknown): GameProgress {
  const record = typeof value === 'object' && value !== null
    ? value as Record<string, unknown>
    : {};
  return {
    foundClueIds: [...new Set(validStrings(record.foundClueIds)
      .filter((id) => clues.some((clue) => clue.id === id)))],
    matchedCaseIds: [...new Set(validStrings(record.matchedCaseIds)
      .filter((id): id is CaseId => ['elderly', 'punk', 'business'].includes(id)))],
  };
}

export function mergeProgress(...items: GameProgress[]): GameProgress {
  return normalizeProgress({
    foundClueIds: items.flatMap((item) => item.foundClueIds),
    matchedCaseIds: items.flatMap((item) => item.matchedCaseIds),
  });
}

export function readLocalProgress(userId: string | null): GameProgress {
  const owner = userId ?? 'guest';
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${owner}`);
    if (stored) return normalizeProgress(JSON.parse(stored));
    if (userId) return EMPTY_PROGRESS;
    return normalizeProgress({
      foundClueIds: JSON.parse(localStorage.getItem(LEGACY_CLUES_KEY) ?? '[]'),
      matchedCaseIds: JSON.parse(localStorage.getItem(LEGACY_MATCHES_KEY) ?? '[]'),
    });
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function writeLocalProgress(userId: string | null, progress: GameProgress) {
  const owner = userId ?? 'guest';
  localStorage.setItem(`${STORAGE_PREFIX}${owner}`, JSON.stringify(progress));
}

export function clearGuestProgress() {
  localStorage.removeItem(`${STORAGE_PREFIX}guest`);
  localStorage.removeItem(LEGACY_CLUES_KEY);
  localStorage.removeItem(LEGACY_MATCHES_KEY);
}

export async function loadCloudProgress(userId: string) {
  const { data, error } = await supabase
    .from('game_progress')
    .select('found_clue_ids, matched_case_ids')
    .eq('user_id', userId)
    .eq('level_id', LEVEL_ID)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return normalizeProgress({
    foundClueIds: data.found_clue_ids,
    matchedCaseIds: data.matched_case_ids,
  });
}

export async function saveCloudProgress(userId: string, progress: GameProgress) {
  const { error } = await supabase.from('game_progress').upsert({
    user_id: userId,
    level_id: LEVEL_ID,
    found_clue_ids: progress.foundClueIds,
    matched_case_ids: progress.matchedCaseIds,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,level_id' });

  if (error) throw error;
}
