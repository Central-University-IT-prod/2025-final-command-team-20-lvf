import { useMemo } from 'react';

export function useTheme() {
  const theme = useMemo(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return darkModeQuery.matches ? 'dark' : 'light';
  }, []);

  return theme;
}
