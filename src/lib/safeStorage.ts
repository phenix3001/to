function getLocalStorage() {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readStorage(key: string) {
  try {
    return getLocalStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string) {
  try {
    getLocalStorage()?.setItem(key, value);
  } catch {
    // Keep the current session usable when storage is blocked or full.
  }
}

export function removeStorage(key: string) {
  try {
    getLocalStorage()?.removeItem(key);
  } catch {
    // Missing persistence must not interrupt the game.
  }
}
