import { useRef } from 'react';

export default function usePrevious2<T>(current: T) {
  const prevRef = useRef<T>(undefined);
  const lastRef = useRef<T>(undefined);

  prevRef.current = lastRef.current;

  lastRef.current = current;

  return prevRef.current;
}
