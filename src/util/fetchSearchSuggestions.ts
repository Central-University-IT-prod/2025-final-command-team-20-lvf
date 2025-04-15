import { SearchSuggestionType } from "../types";

export function fetchSearchSuggestions(_query: string): Promise<SearchSuggestionType[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{
        id: 1,
        title: 'Матрица',
        description: 'Матрица матрица длинное описание лалала',
        subtitle: '2021, Научно-фантастический боевик',
        image: 'https://sun9-73.userapi.com/impg/SuIoCR_TkYHE31B_lwJFu6qyxwMhPp8UhVHQfw/X6_kd-GHxiE.jpg?size=600x338&quality=95&sign=226a56aed1b0978856b878cece18467c&type=album'
      }, {
        id: 2,
        title: 'Не смотрите наверх',
        description: 'Не смотрите наверх не смотрите наверх не смотрите наверх не смотрите наверх',
        subtitle: '2021, Сатирический научно-фантастический фильм',
        image: 'https://sun9-1.userapi.com/impg/XUMIljtQBITSg-9ZNHZP69-OyzkOIAIcixIp6A/hs-WKP3GCXk.jpg?size=1480x750&quality=95&sign=6cf6050340527d4ff120e6e82b6d73de&type=album'
      }, {
        id: 3,
        title: 'Как Витька Чеснок вёз Лёху Штыря в дом инвалидов',
        description: 'jkhdjksahdjaksfhjkd',
        subtitle: '2017, Драма про парня с детдомовским прошлым',
        image: 'https://sun9-10.userapi.com/impg/SpZLhDTmQbvkf3jq9L1c6cyXYMqdVF-acl8WXA/uICz4rs5d38.jpg?size=600x900&quality=95&sign=1d64cb8bf94132f8be367bdef4664a27&type=album'
      }])
    }, 3000);
  })
}
