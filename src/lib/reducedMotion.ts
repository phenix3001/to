import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function readPreference() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia(QUERY).matches;
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(readPreference);

  useEffect(() => {
    if (
      typeof window === 'undefined'
      || typeof window.matchMedia !== 'function'
    ) return undefined;

    const query = window.matchMedia(QUERY);
    const updatePreference = () => setPrefersReducedMotion(query.matches);
    updatePreference();
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', updatePreference);
      return () => query.removeEventListener('change', updatePreference);
    }

    query.addListener(updatePreference);
    return () => query.removeListener(updatePreference);
  }, []);

  return prefersReducedMotion;
}
