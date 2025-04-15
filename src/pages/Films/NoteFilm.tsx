import { memo, useState, useCallback } from 'react'
import { ButtonCell, Card, IconButton, Modal, Title } from '@telegram-apps/telegram-ui'
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import styles from './Films.module.scss'
import { Icon20DeleteOutlineAndroid, Icon28CancelCircleOutline, Icon28DeleteOutlineAndroid } from '@vkontakte/icons';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { useDeleteNote } from '../../context/context';
import { type NoteFilmType } from '../../types';
import { stopEvent } from '../../util/stopEvent';

type OwnProps = NoteFilmType & {
  onClick: NoneToVoidFunction;
};

export const NoteFilm = memo<OwnProps>(({ film: { name, description, image, id }, onClick }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteNote = useDeleteNote();
  const handleDelete = useCallback((e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    stopEvent(e);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirmation = useCallback(() => {
    setIsDeleteModalOpen(false);
    deleteNote(id);
  }, [id, deleteNote]);

  return (
    <>
      <Card type="plain" onClick={onClick} className={styles.film}>
        <>
          <div className={styles.filmActions}>
            <IconButton mode="gray" size="s" onClick={handleDelete}>
              <Icon20DeleteOutlineAndroid />
            </IconButton>
          </div>

          <img
            alt="Dog"
            src={image}
            className={styles.filmImage}
          />
          <CardCell
            readOnly
            subtitle={description}
          >
            {name}
          </CardCell>
        </>
      </Card>
      <Modal
        onOpenChange={(open) => {
          if (!open) {
            setIsDeleteModalOpen(false);
          }
        }}
        header={<ModalHeader />}
        open={isDeleteModalOpen}
        className={styles.modal}
      >
        <Title level="2" weight="1" plain>
          Вы уверены, что хотите удалить фильм?
        </Title>
        <ButtonCell
          before={<Icon28DeleteOutlineAndroid />}
          onClick={handleDeleteConfirmation}
          className={styles.modalCell}
          mode="destructive"
        >
          Удалить
        </ButtonCell>
        <ButtonCell
          before={<Icon28CancelCircleOutline />}
          onClick={() => setIsDeleteModalOpen(false)}
          className={styles.modalCell}
        >
          Отменить
        </ButtonCell>
      </Modal>
    </>
  )
});
