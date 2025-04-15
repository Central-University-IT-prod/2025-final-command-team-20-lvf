import { Icon28MagicWandOutline, Icon28Video, Icon28ListLikeFill } from '@vkontakte/icons'
import styles from './App.module.scss'
import { Tabbar, AppRoot } from '@telegram-apps/telegram-ui'
import { useState } from 'react'
import { Films } from './pages/Films/Films'
import { Loading } from './components/Loading/Loading'
import { Reels } from './pages/Reels/Reels'
import { useEffectOnce } from './hooks/useEffectOnce'
import { useTheme } from './hooks/useTheme'

enum TabbarItems {
  FILMS = 'films',
  FEELING_LUCKY = 'feeling_lucky',
  REELS = 'reels',
}

function App() {
  const [currentTab, setCurrentTab] = useState<TabbarItems>(TabbarItems.FILMS);

  useEffectOnce(() => {
    window.Telegram?.WebApp.disableVerticalSwipes();
    if (window.Telegram?.WebApp.platform === 'ios') {
      document.body.classList.add('ios');
    }
  });

  useEffectOnce(() => {
    const startParam = window.Telegram?.WebApp.initDataUnsafe.start_param;
    if (startParam) {
      if (startParam.startsWith('reel_') && /^\d+$/.test(startParam.slice(5))) {
        sessionStorage.setItem('reelsStartFetchFrom', startParam.slice(5));
        setCurrentTab(TabbarItems.REELS);
      }
    }
  })

  function renderTabContent() {
    switch (currentTab) {
      case TabbarItems.FILMS:
        return <Films />
      case TabbarItems.FEELING_LUCKY:
        return (
          <Loading
            description="Выбираем лучший фильм для просмотра из сохраненных на основе ваших последних интересов"
            header="Генерируем рекомендацию..."
          />
        )
      case TabbarItems.REELS:
        return <Reels />
    }
  }

  const defaultTheme = useTheme();

  return (
    <AppRoot appearance={currentTab === TabbarItems.REELS ? 'dark' : defaultTheme}>
      {renderTabContent()}
      <Tabbar className={styles.navbar}>
        <Tabbar.Item text="Фильмы" onClick={() => setCurrentTab(TabbarItems.FILMS)} selected={currentTab === TabbarItems.FILMS}>
         <Icon28ListLikeFill />
        </Tabbar.Item>
        <Tabbar.Item
          text="Мне повезет"
          className={styles.feelingLucky}
          onClick={() => setCurrentTab(TabbarItems.FEELING_LUCKY)}
        >
          <Icon28MagicWandOutline />
        </Tabbar.Item>
        <Tabbar.Item text="Reels" onClick={() => setCurrentTab(TabbarItems.REELS)} selected={currentTab === TabbarItems.REELS}>
          <Icon28Video />
        </Tabbar.Item>
      </Tabbar>
    </AppRoot>
  )
}

export default App
