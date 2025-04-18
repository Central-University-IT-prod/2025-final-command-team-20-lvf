import React, { memo, useRef, useState } from 'react';

import { buildClassName } from '../../util/buildClassName';
import usePrevious2 from '../../hooks/usePrevious2';

import './Collapsible.scss';

const CLASSES = {
  collapsible: 'collapsible',
  shown: 'shown',
  open: 'open',
  content: 'content',
} as const;

interface OwnProps {
  children: React.ReactNode;
  isShown: boolean;
}

const DELAY = 200;

const requestMutation = requestAnimationFrame;

function Collapsible({ children, isShown }: OwnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isShown);
  const [shouldRender, setShouldRender] = useState(isShown);
  const prevIsShown = usePrevious2(isShown);
  const hideTimeoutRef = useRef<number>(undefined);

  function toggleOpen() {
    if (!containerRef.current) return;
    containerRef.current.classList.toggle(CLASSES.open);
    isOpenRef.current = !isOpenRef.current;
  }

  if (prevIsShown !== undefined && prevIsShown !== isShown) {
    if (isShown && !isOpenRef.current) {
      setShouldRender(true);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
      setTimeout(() => requestMutation(toggleOpen), DELAY);
    } else {
      requestMutation(toggleOpen);
      hideTimeoutRef.current = window.setTimeout(() => {
        setShouldRender(false);
      }, DELAY);
    }
  }

  const render = <div className={CLASSES.content}>{children}</div>;

  return (
    <div
      ref={containerRef}
      className={buildClassName(CLASSES.collapsible, isShown && CLASSES.shown, isOpenRef.current && CLASSES.open)}
    >
      {shouldRender ? render : undefined}
    </div>
  );
}

export default memo(Collapsible);
