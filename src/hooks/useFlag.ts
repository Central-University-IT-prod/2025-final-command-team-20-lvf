import { useCallback, useState } from 'react';

export function useFlag(flag: boolean) {
  const [isFlag, setIsFlag] = useState(flag);

  return [
    isFlag,
    useCallback(() => setIsFlag(true), []),
    useCallback(() => setIsFlag(false), []),
  ] as const;
}
