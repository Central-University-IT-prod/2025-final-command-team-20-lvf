export function openUrl(url: string) {
  if (window.Telegram) {
    window.Telegram.WebApp.openLink(url);
  } else {
    window.open(url, '_blank');
  }
}
