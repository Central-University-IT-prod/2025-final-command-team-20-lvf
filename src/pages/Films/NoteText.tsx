import { memo, useState, useCallback } from 'react'
import { ButtonCell, Card, Title, IconButton, Modal } from '@telegram-apps/telegram-ui'
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import styles from './Films.module.scss'
import { Icon20DeleteOutlineAndroid, Icon20WriteOutline, Icon24WriteOutline, Icon28DeleteOutlineAndroid, Icon28CancelCircleOutline } from '@vkontakte/icons';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { EditNoteModal } from './EditNoteModal';
import { NoteTextType } from '../../types';
import { useDeleteNote } from '../../context/context';
type OwnProps = NoteTextType;

export const NoteText = memo<OwnProps>(({ title, description, id }) => {
  const deleteNote = useDeleteNote();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirmation = useCallback(() => {
    deleteNote(id);
    setIsDeleteModalOpen(false);
  }, [deleteNote, id]);

  const handleEdit = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  return (
    <>
      <Card type="plain" className={styles.film}>
        <>
          <div className={styles.filmActions}>
            <IconButton mode="gray" size="s" onClick={handleEdit}>
              <Icon20WriteOutline />
            </IconButton>
            <IconButton mode="gray" size="s" onClick={handleDelete}>
              <Icon20DeleteOutlineAndroid />
            </IconButton>
          </div>
          <div className={styles.filmNoLinkPreview}>
            <Icon24WriteOutline />
          </div>

          <CardCell
            readOnly
            subtitle={description}
          >
            {title}
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
        className={styles.deleteFilmModal}

      >
        <Title level="2" weight="1" plain>
          Вы уверены, что хотите удалить фильм?
        </Title>
        <ButtonCell
          before={<Icon28DeleteOutlineAndroid />}
          onClick={handleDeleteConfirmation}
          className={styles.deleteFilmModalCell}
          mode="destructive"
        >
          Удалить
        </ButtonCell>
        <ButtonCell
          before={<Icon28CancelCircleOutline />}
          onClick={() => setIsDeleteModalOpen(false)}
          className={styles.deleteFilmModalCell}
        >
          Отменить
        </ButtonCell>
      </Modal>
      <EditNoteModal
        open={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        modalType="edit"
        currentName={title}
        currentDescription={description}
        currentId={id}
      />
    </>
  )
});
