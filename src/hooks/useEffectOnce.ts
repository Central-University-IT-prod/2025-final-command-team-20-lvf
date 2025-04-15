import { useEffect } from 'react';

export function useEffectOnce(effect: AnyFunction) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
