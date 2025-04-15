// @ts-nocheck
import { memo, useCallback, useState } from 'react'
import styles from './Reel.module.scss'
import { ReelFilmInfo } from './ReelFilmInfo'
import { ReelFilmLike } from './ReelFilmLike';
import { Icon20CopyOutline, Icon28ChainOutline, Icon28DownloadOutline, Icon28ShareOutline, Icon28StoryAddOutline } from '@vkontakte/icons';
import { Cell, IconButton, Modal, Snackbar, Title } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { openUrl } from '../../util/openUrl';
import { STORY_IMAGE_URL } from '../../config';
import { downloadFile } from '../../util/downloadFile';
import { buildClassName } from '../../util/buildClassName';

interface OwnProps {
  film: {
    id: number;
    title: string;
    image: string;
    description: string;
    status: 'none' | 'saved' | 'watched';
  }
  id: number;
  isLiked: boolean;
  likesCount: number;
  setIsUnfoldedDescription?: (isUnfolded: boolean) => void;
}

export const Reel = memo<OwnProps>(({ film, id, isLiked, likesCount, setIsUnfoldedDescription }) => {
  const [snackbar, setSnackbar] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnfoldedDescription, setIsUnfoldedDescriptionLocal] = useState(false);

  const handleOpenShareModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(`https://t.me/lottiemoviebot/app?startapp=reel_${id}`);
    setSnackbar(
      <Snackbar
        description="Ссылка на рилс скопирована"
        onClose={() => setSnackbar(undefined)} before={<Icon20CopyOutline />}
      />
    );
    setIsModalOpen(false);
  }, [id]);

  const handleShareChat = useCallback(() => {
    const url = `https://t.me/lottiemoviebot/app?startapp=reel_${id}`;
    const text = `${film.title} - Сохраните для просмотра в Lottie Movie`;
    openUrl(`http://t.me/share/url?url=${url}&text=${encodeURIComponent(text)}`);
    setIsModalOpen(false);
  }, [film.title, id]);

  const handleShareStory = useCallback(() => {
    const imgUrl = STORY_IMAGE_URL;
    const url = `https://t.me/lottiemoviebot/app?startapp=reel_${id}`;
    window.Telegram?.WebApp.shareToStory(imgUrl, {
      text: `${film.title} - Сохраните для просмотра в Lottie Movie`,
      widget_link: {
        url,
        name: `${film.title} - Lottie Movie`,
      }
    })
    setIsModalOpen(false);
  }, [film.title, id]);

  const handleDownload = useCallback(() => {
    const url = `https://t.me/lottiemoviebot/app?startapp=reel_${id}`;
    downloadFile(url, `${film.title}-${id}.mp4`);
    setIsModalOpen(false);
  }, [id, film.title]);

  const handleDescriptionChange = useCallback((isUnfolded: boolean) => {
    setIsUnfoldedDescriptionLocal(isUnfolded);
    setIsUnfoldedDescription?.(isUnfolded);
  }, [setIsUnfoldedDescription]);

  return (
    <div className={buildClassName(styles.reel, isUnfoldedDescription && styles.withUnfoldedDescription)}>
      <video playsInline autoPlay loop muted className={styles.reelVideo}>
        <source src="https://prod-team-20-l09f4inu.REDACTED/api/files/1741070886795_301.mp4" type="video/mp4" />
        Your browser does not support the video tag. Please update your browser.
      </video>
      <ReelFilmInfo {...film} setIsUnfoldedDescription={handleDescriptionChange} />
      <div className={styles.reelFilmVerticalButtons}>
        <ReelFilmLike isLiked={isLiked} likesCount={likesCount} />
        <IconButton mode="plain" size="l" onClick={handleOpenShareModal}>
          <Icon28ShareOutline className={styles.reelFilmVerticalButtonsIcon} />
        </IconButton>
        <IconButton mode="plain" size="l" onClick={handleDownload}>
          <Icon28DownloadOutline className={styles.reelFilmVerticalButtonsIcon} />
        </IconButton>
      </div>
      {snackbar}
      <Modal
        onOpenChange={(open) => {
          if (!open) {
            setIsModalOpen(false);
          }
        }}
        header={<ModalHeader />}
        open={isModalOpen}
        className={styles.reelShareModal}

      >
        <Title level="2" weight="1" plain>
          Поделиться рилсом
        </Title>
        <Cell before={<Icon28ShareOutline />} onClick={handleShareChat} className={styles.reelShareModalCell}>
          Поделиться в чате
        </Cell>
        <Cell before={<Icon28StoryAddOutline />} onClick={handleShareStory} className={styles.reelShareModalCell}>
          Поделиться в истории
        </Cell>
        <Cell before={<Icon28ChainOutline />} onClick={handleCopyLink} className={styles.reelShareModalCell}>
          Скопировать ссылку
        </Cell>
      </Modal>
    </div>
  )
});
