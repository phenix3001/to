import {
  createContext, ReactNode, useCallback, useContext, useEffect, useState,
} from 'react';
import { readStorage, writeStorage } from './safeStorage';

const HINTS_STORAGE_KEY = 'game-hints-enabled';
const MOBILE_LAYOUT_STORAGE_KEY = 'game-mobile-layout';
const CATALOG_BEFORE_GAME_STORAGE_KEY = 'game-catalog-before-game';
const INTERFACE_HIDDEN_STORAGE_KEY = 'game-interface-hidden';

interface GameSettingsContextValue {
  hintsEnabled: boolean;
  setHintsEnabled: (enabled: boolean) => void;
  mobileLayoutEnabled: boolean;
  setMobileLayoutEnabled: (enabled: boolean) => void;
  showCatalogBeforeGame: boolean;
  setShowCatalogBeforeGame: (enabled: boolean) => void;
  interfaceHidden: boolean;
  setInterfaceHidden: (hidden: boolean) => void;
}

const GameSettingsContext = createContext<GameSettingsContextValue | null>(null);

function readHintsEnabled() {
  return readStorage(HINTS_STORAGE_KEY) !== 'false';
}

function readMobileLayoutEnabled() {
  return readStorage(MOBILE_LAYOUT_STORAGE_KEY) === 'true';
}

function readShowCatalogBeforeGame() {
  return readStorage(CATALOG_BEFORE_GAME_STORAGE_KEY) !== 'false';
}

function readInterfaceHidden() {
  return readStorage(INTERFACE_HIDDEN_STORAGE_KEY) === 'true';
}

export function GameSettingsProvider({ children }: { children: ReactNode }) {
  const [hintsEnabled, setHintsEnabledState] = useState(readHintsEnabled);
  const [mobileLayoutEnabled, setMobileLayoutEnabledState] = useState(
    readMobileLayoutEnabled,
  );
  const [showCatalogBeforeGame, setShowCatalogBeforeGameState] = useState(
    readShowCatalogBeforeGame,
  );
  const [interfaceHidden, setInterfaceHiddenState] = useState(readInterfaceHidden);

  useEffect(() => {
    document.documentElement.dataset.mobileLayout = String(mobileLayoutEnabled);
  }, [mobileLayoutEnabled]);

  useEffect(() => {
    document.documentElement.dataset.interfaceHidden = String(interfaceHidden);
  }, [interfaceHidden]);

  const setHintsEnabled = useCallback((enabled: boolean) => {
    setHintsEnabledState(enabled);
    writeStorage(HINTS_STORAGE_KEY, String(enabled));
  }, []);

  const setMobileLayoutEnabled = useCallback((enabled: boolean) => {
    setMobileLayoutEnabledState(enabled);
    writeStorage(MOBILE_LAYOUT_STORAGE_KEY, String(enabled));
  }, []);

  const setShowCatalogBeforeGame = useCallback((enabled: boolean) => {
    setShowCatalogBeforeGameState(enabled);
    writeStorage(CATALOG_BEFORE_GAME_STORAGE_KEY, String(enabled));
  }, []);

  const setInterfaceHidden = useCallback((hidden: boolean) => {
    setInterfaceHiddenState(hidden);
    writeStorage(INTERFACE_HIDDEN_STORAGE_KEY, String(hidden));
  }, []);

  return (
    <GameSettingsContext.Provider value={{
      hintsEnabled,
      setHintsEnabled,
      mobileLayoutEnabled,
      setMobileLayoutEnabled,
      showCatalogBeforeGame,
      setShowCatalogBeforeGame,
      interfaceHidden,
      setInterfaceHidden,
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
