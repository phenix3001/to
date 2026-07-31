import { dailyCaseKey, dailyClueKey } from './dailyProgress';
import { gameDayNumbers, GameDayNumber } from './gameDays';
import { clues } from './investigation';
import { CaseId } from './investigationTypes';
import { householdItems } from './luggage/householdItems';
import { realSuitcases } from './realSuitcases';
import { readStorage, removeStorage, writeStorage } from './safeStorage';
import { supabase } from './supabase';

export interface GameProgress {
  foundClueIds: string[];
  matchedCaseIds: string[];
}

export const EMPTY_PROGRESS: GameProgress = {
  foundClueIds: [],
  matchedCaseIds: [],
};

const LEVEL_ID = 'case-01';
const STORAGE_PREFIX = 'airport-progress:';
const LEGACY_CLUES_KEY = 'airport-found-clues';
const LEGACY_MATCHES_KEY = 'airport-matched-cases';
export const GALLERY_ITEM_PREFIX = 'gallery:item:';
export const GALLERY_LUGGAGE_PREFIX = 'gallery:luggage:';

function validStrings(value: unknown) {
  return Array.isArray(value)
    ? value.filter((id): id is string => typeof id === 'string')
    : [];
}

function validDay(value: string): value is `${GameDayNumber}` {
  return gameDayNumbers.some((day) => String(day) === value);
}

function normalizeClueKey(value: string) {
  if (value.startsWith(GALLERY_ITEM_PREFIX)) {
    const itemId = value.slice(GALLERY_ITEM_PREFIX.length);
    return householdItems.some((item) => item.id === itemId) ? value : null;
  }
  if (clues.some((clue) => clue.id === value)) return dailyClueKey(1, value);
  const match = /^day-([1-7]):clue:(.+)$/.exec(value);
  if (!match || !validDay(match[1])) return null;
  return clues.some((clue) => clue.id === match[2]) ? value : null;
}

function normalizeCaseKey(value: string) {
  if (value.startsWith(GALLERY_LUGGAGE_PREFIX)) {
    const luggageId = value.slice(GALLERY_LUGGAGE_PREFIX.length);
    return realSuitcases.some((suitcase) => suitcase.id === luggageId)
      ? value
      : null;
  }
  const caseIds: readonly CaseId[] = ['elderly', 'punk', 'business'];
  if (caseIds.includes(value as CaseId)) return dailyCaseKey(1, value as CaseId);
  const match = /^day-([1-7]):case:(.+)$/.exec(value);
  if (!match || !validDay(match[1])) return null;
  return caseIds.includes(match[2] as CaseId) ? value : null;
}

export function galleryItemKey(id: string) {
  return `${GALLERY_ITEM_PREFIX}${id}`;
}

export function galleryLuggageKey(id: string) {
  return `${GALLERY_LUGGAGE_PREFIX}${id}`;
}

export function normalizeProgress(value: unknown): GameProgress {
  const record = typeof value === 'object' && value !== null
    ? value as Record<string, unknown>
    : {};
  return {
    foundClueIds: [...new Set(validStrings(record.foundClueIds)
      .map(normalizeClueKey)
      .filter((id): id is string => id !== null))],
    matchedCaseIds: [...new Set(validStrings(record.matchedCaseIds)
      .map(normalizeCaseKey)
      .filter((id): id is string => id !== null))],
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
    const stored = readStorage(`${STORAGE_PREFIX}${owner}`);
    if (stored) return normalizeProgress(JSON.parse(stored));
    if (userId) return EMPTY_PROGRESS;
    return normalizeProgress({
      foundClueIds: JSON.parse(readStorage(LEGACY_CLUES_KEY) ?? '[]'),
      matchedCaseIds: JSON.parse(readStorage(LEGACY_MATCHES_KEY) ?? '[]'),
    });
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function writeLocalProgress(userId: string | null, progress: GameProgress) {
  const owner = userId ?? 'guest';
  writeStorage(`${STORAGE_PREFIX}${owner}`, JSON.stringify(progress));
}

export function clearGuestProgress() {
  removeStorage(`${STORAGE_PREFIX}guest`);
  removeStorage(LEGACY_CLUES_KEY);
  removeStorage(LEGACY_MATCHES_KEY);
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
