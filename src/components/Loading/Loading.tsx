import { Placeholder } from '@telegram-apps/telegram-ui'
import { memo } from 'react'
import styles from './Loading.module.scss'

interface OwnProps {
  description: string;
  header: string;
}

export const Loading = memo<OwnProps>(({ description, header }) => {
  return (
    <Placeholder
      description={description}
      header={header}
    >
      <img
        alt="Telegram sticker"
        className={styles.loadingImage}
        src="https://xelene.me/telegram.gif"
      />
    </Placeholder>
  )
})
