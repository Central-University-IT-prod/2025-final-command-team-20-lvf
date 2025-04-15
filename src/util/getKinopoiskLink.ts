import { openUrl } from "./openUrl";

export function openKinopoiskLink(id: number) {
  console.log('openKinopoiskLink', id);
  return openUrl(`https://www.kinopoisk.ru/film/${id}/`);
}
