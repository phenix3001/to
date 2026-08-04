import {
  createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { useAuth } from './auth';
import { GameAchievementId } from './gameAchievements';
import {
  clearGuestProgress,
  galleryItemKey,
  galleryLuggageKey,
  GameProgress,
  loadCloudProgress,
  mergeProgress,
  readLocalProgress,
  saveCloudProgress,
  writeLocalProgress,
} from './gameProgress';

export type SyncStatus = 'local' | 'syncing' | 'synced' | 'error';

interface GameProgressContextValue extends GameProgress {
  recordLuggageOpened: (luggageId: string, itemIds: readonly string[]) => void;
  syncStatus: SyncStatus;
  unlockAchievement: (achievementId: GameAchievementId) => void;
}

const GameProgressContext = createContext<GameProgressContextValue | null>(null);

export function GameProgressProvider({ children }: { children: ReactNode }) {
  const { isLoading: authLoading, user } = useAuth();
  const initialProgress = useRef(readLocalProgress(null));
  const progressRef = useRef(initialProgress.current);
  const ownerRef = useRef<string | null>(null);
  const saveQueue = useRef<Promise<void>>(Promise.resolve());
  const saveRevision = useRef(0);
  const [progress, setProgress] = useState(initialProgress.current);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('local');

  const queueCloudSave = useCallback((userId: string, next: GameProgress) => {
    const revision = ++saveRevision.current;
    setSyncStatus('syncing');
    const task = saveQueue.current
      .catch(() => undefined)
      .then(() => saveCloudProgress(userId, next));
    saveQueue.current = task;
    void task.then(
      () => {
        if (ownerRef.current === userId && saveRevision.current === revision) {
          setSyncStatus('synced');
        }
      },
      () => {
        if (ownerRef.current === userId && saveRevision.current === revision) {
          setSyncStatus('error');
        }
      },
    );
    return task;
  }, []);

  const applyProgress = useCallback((next: GameProgress) => {
    progressRef.current = next;
    setProgress(next);
    writeLocalProgress(ownerRef.current, next);
    if (ownerRef.current) void queueCloudSave(ownerRef.current, next);
  }, [queueCloudSave]);

  useEffect(() => {
    if (authLoading) return;
    const userId = user?.id ?? null;
    const previousOwner = ownerRef.current;
    const inMemoryProgress = previousOwner === null || previousOwner === userId
      ? progressRef.current
      : { achievementIds: [], foundClueIds: [], matchedCaseIds: [] };
    ownerRef.current = userId;

    if (!userId) {
      const guestProgress = readLocalProgress(null);
      progressRef.current = guestProgress;
      setProgress(guestProgress);
      setSyncStatus('local');
      return;
    }

    let isCancelled = false;
    setSyncStatus('syncing');
    void loadCloudProgress(userId).then(async (cloudProgress) => {
      if (isCancelled) return;
      const next = mergeProgress(
        cloudProgress ?? { achievementIds: [], foundClueIds: [], matchedCaseIds: [] },
        readLocalProgress(userId),
        readLocalProgress(null),
        inMemoryProgress,
      );
      progressRef.current = next;
      setProgress(next);
      writeLocalProgress(userId, next);
      await queueCloudSave(userId, next);
      if (!isCancelled) clearGuestProgress();
    }).catch(() => {
      if (isCancelled) return;
      const fallback = mergeProgress(
        readLocalProgress(userId),
        readLocalProgress(null),
        inMemoryProgress,
      );
      progressRef.current = fallback;
      setProgress(fallback);
      writeLocalProgress(userId, fallback);
      setSyncStatus('error');
    });

    return () => {
      isCancelled = true;
    };
  }, [authLoading, queueCloudSave, user?.id]);

  const recordLuggageOpened = useCallback((
    luggageId: string,
    itemIds: readonly string[],
  ) => {
    const next = mergeProgress(progressRef.current, {
      achievementIds: [],
      foundClueIds: itemIds.map(galleryItemKey),
      matchedCaseIds: [galleryLuggageKey(luggageId)],
    });
    if (
      next.foundClueIds.length === progressRef.current.foundClueIds.length
      && next.matchedCaseIds.length === progressRef.current.matchedCaseIds.length
    ) return;
    applyProgress(next);
  }, [applyProgress]);

  const unlockAchievement = useCallback((achievementId: GameAchievementId) => {
    if (progressRef.current.achievementIds.includes(achievementId)) return;
    const next = mergeProgress(progressRef.current, {
      achievementIds: [achievementId],
      foundClueIds: [],
      matchedCaseIds: [],
    });
    applyProgress(next);
  }, [applyProgress]);

  return (
    <GameProgressContext.Provider value={{
      ...progress,
      recordLuggageOpened,
      syncStatus,
      unlockAchievement,
    }}>
      {children}
    </GameProgressContext.Provider>
  );
}

export function useGameProgress() {
  const context = useContext(GameProgressContext);
  if (!context) throw new Error('useGameProgress must be used inside GameProgressProvider');
  return context;
}
