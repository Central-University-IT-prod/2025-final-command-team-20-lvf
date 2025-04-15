import { memo, useRef, useCallback } from 'react'
import useForceUpdate from '../../hooks/useForceUpdate';
import { Icon28LikeOutline, Icon28LikeFillRed } from '@vkontakte/icons';
import { Text } from '@telegram-apps/telegram-ui';
import styles from './Reel.module.scss'

interface OwnProps {
  isLiked: boolean;
  likesCount: number;
}

export const ReelFilmLike = memo<OwnProps>(({
  isLiked, likesCount,
}) => {
  const forceUpdate = useForceUpdate();

  const isLikedRef = useRef(isLiked);
  const likesCountRef = useRef(likesCount);

  if (isLiked === isLikedRef.current) {
    // Backend update after like is set
    likesCountRef.current = likesCount;
  }

  const handleClick = useCallback(() => {
    if (isLikedRef.current === isLiked) {
      isLikedRef.current = !isLikedRef.current;
      likesCountRef.current++;
    } else {
      isLikedRef.current = !isLikedRef.current;
      likesCountRef.current--;
    }
    forceUpdate();
  }, [forceUpdate, isLiked]);

  return (
    <div onClick={handleClick} className={styles.reelFilmLike}>
      {isLikedRef.current ? (
        <>
          <Icon28LikeFillRed className={styles.reelFilmLikeItem} />
          <Text weight="3" className={styles.reelFilmLikeItem}>
            {likesCountRef.current}
          </Text>
        </>
      ) : (
        <>
          <Icon28LikeOutline className={styles.reelFilmLikeItem} />
          <Text weight="3" className={styles.reelFilmLikeItem}>
            {likesCountRef.current}
          </Text>
        </>
      )}
    </div>
  )
});
