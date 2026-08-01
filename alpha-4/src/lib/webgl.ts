let cachedSupport: boolean | null = null;

export function hasWebGLSupport() {
  if (cachedSupport !== null) return cachedSupport;
  if (typeof document === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    cachedSupport = Boolean(
      canvas.getContext('webgl2')
      || canvas.getContext('webgl'),
    );
  } catch {
    cachedSupport = false;
  }

  return cachedSupport;
}
