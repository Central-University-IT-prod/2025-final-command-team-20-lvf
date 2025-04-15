import { memo, useCallback, useState } from 'react'
import { Button, Title } from '@telegram-apps/telegram-ui'
import { NoteFilm } from './NoteFilm'
import { NoteText } from './NoteText'
import styles from './Films.module.scss'
import { Icon20VideoAddSquareOutline } from '@vkontakte/icons'
import { CreateNoteModal } from './CreateNoteModal'
import { NoteType } from '../../types'
import { withGlobal } from '../../context/withGlobal'
import { openKinopoiskLink } from '../../util/getKinopoiskLink'

interface StateProps {
  notes: NoteType[];
}

function FilmsComponent({ notes }: StateProps) {
  console.log(notes);
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false);

  const handleCreateNote = useCallback(() => {
    setIsCreateNoteModalOpen(true);
  }, []);

  return (
    <>
      <Title level="1" weight="1" plain={false}>
        Фильмы
      </Title>
      <Button
        before={<Icon20VideoAddSquareOutline />}
        className={styles.addFilmButton}
        mode="filled"
        size="s"
        onClick={handleCreateNote}
      >
        Сохранить фильм в коллекцию
      </Button>
      <div className={styles.films}>
        {notes.map((note) => {
          if ('film' in note) {
            return <NoteFilm key={note.id} film={note.film} onClick={() => openKinopoiskLink(note.film.id)} id={note.id} isSeen={note.isSeen} />
          } else {
            return <NoteText key={note.id} title={note.title} description={note.description} id={note.id} isSeen={note.isSeen} />
          }
        })}
      </div>
      <CreateNoteModal
        open={isCreateNoteModalOpen}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onOpenChange={setIsCreateNoteModalOpen as any}
        setIsOpen={setIsCreateNoteModalOpen}
      />
    </>
  )
}

export const Films = withGlobal<StateProps>(
  (global) => {
    const { notes } = global;

    return {
      notes,
    }
  }
)(memo(FilmsComponent));
