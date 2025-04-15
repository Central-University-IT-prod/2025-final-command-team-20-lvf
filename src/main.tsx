import { createRoot } from 'react-dom/client'
import './index.module.scss'
import App from './App.tsx'
import '@telegram-apps/telegram-ui/dist/styles.css';
import { GlobalProvider } from './context/withGlobal.tsx';

const notes = [
  {
    id: 1,
    film: {
      name: 'Матрица',
      image: 'https://sun9-73.userapi.com/impg/SuIoCR_TkYHE31B_lwJFu6qyxwMhPp8UhVHQfw/X6_kd-GHxiE.jpg?size=600x338&quality=95&sign=226a56aed1b0978856b878cece18467c&type=album',
      description: '2021, Научно-фантастический боевик',
    },
    isSeen: false,
  },
  {
    id: 2,
    film: {
      name: 'Не смотрите наверх',
      image: 'https://sun9-1.userapi.com/impg/XUMIljtQBITSg-9ZNHZP69-OyzkOIAIcixIp6A/hs-WKP3GCXk.jpg?size=1480x750&quality=95&sign=6cf6050340527d4ff120e6e82b6d73de&type=album',
      description: '2021, Сатирический научно-фантастический фильм',
    },
    isSeen: false,
  },
  {
    id: 3,
    film: {
      name: 'Как Витька Чеснок вёз Лёху Штыря в дом инвалидов',
      image: 'https://sun9-10.userapi.com/impg/SpZLhDTmQbvkf3jq9L1c6cyXYMqdVF-acl8WXA/uICz4rs5d38.jpg?size=600x900&quality=95&sign=1d64cb8bf94132f8be367bdef4664a27&type=album',
      description: '2017, Драма про парня с детдомовским прошлым',
    },
    isSeen: false,
  },
  {
    id: 4,
    film: {
      name: 'Стражи Галактики',
      image: 'https://sun9-10.userapi.com/impg/SpZLhDTmQbvkf3jq9L1c6cyXYMqdVF-acl8WXA/uICz4rs5d38.jpg?size=600x900&quality=95&sign=1d64cb8bf94132f8be367bdef4664a27&type=album',
      description: '2014, Научно-фантастический боевик',
    },
    isSeen: false,
  },
  {
    id: 5,
    title: 'Фильм от Насти',
    description: 'Бля я забыл там аниме чета хз',
  },
  {
    id: 6,
    film: {
      name: 'Основатель',
      image: 'https://sun9-74.userapi.com/impg/izmQMUWcGGOTlqMgSMdxvH4attbu3W6EJGs5QA/YHrGR72psks.jpg?size=554x554&quality=95&sign=b0c3766e306cbbda9a4b487082da51fc&type=album',
      description: '2016, Драма о бурном подъеме гиганта быстрого питания McDonald\'s',
    },
    isSeen: false,
  },
];

createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
)
