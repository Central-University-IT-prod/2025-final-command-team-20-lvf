/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { debounce } from '../util/schedulers';

type AnyToVoid = (...args: any[]) => void;

export function useDebouncedCallback<F extends AnyToVoid>(
  fn: F,
  ms: number,
  shouldRunFirst = true,
  shouldRunLast = true,
): F {
  return useMemo(
    () => debounce(fn, ms, shouldRunFirst, shouldRunLast) as F,
    [fn, ms, shouldRunFirst, shouldRunLast],
  );
}
