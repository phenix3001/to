import {
  createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { CaseId } from './investigation';
import { useAuth } from './auth';
import {
  clearGuestProgress,
  GameProgress,
  loadCloudProgress,
  mergeProgress,
  readLocalProgress,
  saveCloudProgress,
  writeLocalProgress,
} from './gameProgress';

export type SyncStatus = 'local' | 'syncing' | 'synced' | 'error';

interface GameProgressContextValue extends GameProgress {
  recordClue: (id: string) => void;
  recordMatchedCase: (id: CaseId) => void;
  syncStatus: SyncStatus;
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
      : { foundClueIds: [], matchedCaseIds: [] };
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
        cloudProgress ?? { foundClueIds: [], matchedCaseIds: [] },
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

  const recordClue = useCallback((id: string) => {
    if (progressRef.current.foundClueIds.includes(id)) return;
    applyProgress(mergeProgress(progressRef.current, {
      foundClueIds: [id],
      matchedCaseIds: [],
    }));
  }, [applyProgress]);

  const recordMatchedCase = useCallback((id: CaseId) => {
    if (progressRef.current.matchedCaseIds.includes(id)) return;
    applyProgress(mergeProgress(progressRef.current, {
      foundClueIds: [],
      matchedCaseIds: [id],
    }));
  }, [applyProgress]);

  return (
    <GameProgressContext.Provider value={{
      ...progress,
      recordClue,
      recordMatchedCase,
      syncStatus,
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
