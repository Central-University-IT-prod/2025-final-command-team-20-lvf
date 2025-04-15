// @ts-nocheck
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { Reel } from '../../components/Reel/Reel';
import { ReelType } from '../../types';
import styles from './Reels.module.scss';
import { TabsItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem';
import { TabsList } from '@telegram-apps/telegram-ui';
import { buildClassName } from '../../util/buildClassName';

// In a real app, you would fetch this data in chunks as needed
const mockReels: ReelType[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  film: {
    id: i + 1,
    title: `Матрица`,
    image: 'https://sun9-73.userapi.com/impg/SuIoCR_TkYHE31B_lwJFu6qyxwMhPp8UhVHQfw/X6_kd-GHxiE.jpg?size=600x338&quality=95&sign=226a56aed1b0978856b878cece18467c&type=album',
    description: `Жизнь Томаса Андерсона разделена на две части: днём он — самый обычный офисный работник, получающий нагоняи от начальства, а ночью превращается в хакера по имени Нео, и нет места в сети, куда он бы не смог проникнуть. Но однажды всё меняется. Томас узнаёт ужасающую правду о реальности.`,
    status: 'none',
  },
  isLiked: false,
  likesCount: Math.floor(Math.random() * 100),
}));

const BUFFER_SIZE = 1; // Number of reels to keep loaded on each side

export const Reels = memo(() => {
  const [isUnfoldedDescription, setIsUnfoldedDescription] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get the range of reels to render
  const getVisibleRange = useCallback((currentIdx: number) => {
    const start = Math.max(0, currentIdx - BUFFER_SIZE);
    const end = Math.min(mockReels.length - 1, currentIdx + BUFFER_SIZE);
    return { start, end };
  }, []);

  // Get visible reels
  const visibleReels = useCallback((currentIdx: number) => {
    const { start, end } = getVisibleRange(currentIdx);
    return mockReels.slice(start, end + 1).map((reel, index) => ({
      ...reel,
      virtualIndex: start + index,
    }));
  }, [getVisibleRange]);

  const loadMoreReels = useCallback(async () => {
    if (isLoading) return;
    
    const isNearEnd = currentIndex >= mockReels.length - BUFFER_SIZE - 1;
    if (isNearEnd) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 5000));
      // In a real app, you would fetch more reels here and append them to your reels array
      setIsLoading(false);
    }
  }, [currentIndex, isLoading]);

  useEffect(() => {
    loadMoreReels();
  }, [currentIndex, loadMoreReels]);

  useEffect(() => {
    if (!window.Telegram?.WebApp) return undefined;

    try {
      window.Telegram.WebApp.requestFullscreen();
      window.Telegram.WebApp.lockOrientation();
    } catch { /* do nothing - error can only be thrown on incorrect environment */ }

    return () => {
      try {
        window.Telegram!.WebApp.exitFullscreen();
        window.Telegram!.WebApp.unlockOrientation();
      } catch { /* do nothing - error can only be thrown on incorrect environment */ }
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('reelsStartFetchFrom')) {
      const reelsStartFetchFrom = sessionStorage.getItem('reelsStartFetchFrom');
      if (reelsStartFetchFrom) {
        const startIndex = parseInt(reelsStartFetchFrom, 10) - 1;
        if (!isNaN(startIndex) && startIndex >= 0 && startIndex < mockReels.length) {
          setCurrentIndex(startIndex);
        }
      }
      sessionStorage.removeItem('reelsStartFetchFrom');
    }
  }, []);

  const switchToReel = useCallback((index: number) => {
    if (index >= 0 && index < mockReels.length && containerRef.current) {
      setCurrentIndex(index);
      containerRef.current.style.transform = `translateY(${-index * 100}%)`;
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null || !containerRef.current) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    
    // Add some resistance at the edges
    let translateY = -currentIndex * 100;
    if (currentIndex === 0 && diff > 0) {
      translateY += Math.sqrt(diff);
    } else if (currentIndex === mockReels.length - 1 && diff < 0) {
      translateY += -Math.sqrt(Math.abs(diff));
    } else {
      translateY += diff / window.innerHeight * 100;
    }

    containerRef.current.style.transform = `translateY(${translateY}%)`;
    containerRef.current.style.transition = 'none';
  }, [currentIndex]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null || !containerRef.current) return;

    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchEnd - touchStartY.current;
    const threshold = window.innerHeight * 0.2; // 20% of screen height

    containerRef.current.style.transition = 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)';

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex > 0) {
        // Swipe down
        switchToReel(currentIndex - 1);
      } else if (diff < 0 && currentIndex < mockReels.length - 1) {
        // Swipe up
        switchToReel(currentIndex + 1);
      } else {
        // Bounce back if at the edges
        switchToReel(currentIndex);
      }
    } else {
      // Not enough movement, snap back
      switchToReel(currentIndex);
    }

    touchStartY.current = null;
  }, [currentIndex, switchToReel]);

  const currentReels = visibleReels(currentIndex);

  return (
    <div className={buildClassName(styles.reels, isUnfoldedDescription && styles.withUnfoldedDescription)}>
      <div className={styles.reelsHeader}>
        <TabsList>
          <TabsItem
            onClick={function noRefCheck() { }}
            selected
          >
            Рекомендации
          </TabsItem>
          <TabsItem
            onClick={function noRefCheck() { }}
          >
            Любимое
          </TabsItem>
        </TabsList>
      </div>
      <div 
        ref={containerRef}
        className={styles.reelsContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {currentReels.map(({ virtualIndex, ...reel }) => (
          <div 
            key={reel.id}
            className={styles.reelWrapper}
            style={{ transform: `translateY(${virtualIndex * 100}%)` }}
          >
            <Reel {...reel} setIsUnfoldedDescription={setIsUnfoldedDescription} />
          </div>
        ))}
      </div>
      {isLoading && (
        <div className={styles.reelsLoading}>
          Loading more reels...
        </div>
      )}
    </div>
  )
});
