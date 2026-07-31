import {
  createContext, ReactNode, useCallback, useContext, useEffect, useState,
} from 'react';
import { readStorage, writeStorage } from './safeStorage';

const HINTS_STORAGE_KEY = 'game-hints-enabled';
const MOBILE_LAYOUT_STORAGE_KEY = 'game-mobile-layout';

interface GameSettingsContextValue {
  hintsEnabled: boolean;
  setHintsEnabled: (enabled: boolean) => void;
  mobileLayoutEnabled: boolean;
  setMobileLayoutEnabled: (enabled: boolean) => void;
}

const GameSettingsContext = createContext<GameSettingsContextValue | null>(null);

function readHintsEnabled() {
  return readStorage(HINTS_STORAGE_KEY) !== 'false';
}

function readMobileLayoutEnabled() {
  return readStorage(MOBILE_LAYOUT_STORAGE_KEY) === 'true';
}

export function GameSettingsProvider({ children }: { children: ReactNode }) {
  const [hintsEnabled, setHintsEnabledState] = useState(readHintsEnabled);
  const [mobileLayoutEnabled, setMobileLayoutEnabledState] = useState(
    readMobileLayoutEnabled,
  );

  useEffect(() => {
    document.documentElement.dataset.mobileLayout = String(mobileLayoutEnabled);
  }, [mobileLayoutEnabled]);

  const setHintsEnabled = useCallback((enabled: boolean) => {
    setHintsEnabledState(enabled);
    writeStorage(HINTS_STORAGE_KEY, String(enabled));
  }, []);

  const setMobileLayoutEnabled = useCallback((enabled: boolean) => {
    setMobileLayoutEnabledState(enabled);
    writeStorage(MOBILE_LAYOUT_STORAGE_KEY, String(enabled));
  }, []);

  return (
    <GameSettingsContext.Provider value={{
      hintsEnabled,
      setHintsEnabled,
      mobileLayoutEnabled,
      setMobileLayoutEnabled,
    }}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettings() {
  const context = useContext(GameSettingsContext);
  if (!context) throw new Error('useGameSettings must be used inside GameSettingsProvider');
  return context;
}
