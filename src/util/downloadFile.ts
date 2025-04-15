export function downloadFile(url: string, filename: string) {
  if (window.Telegram) {
    window.Telegram.WebApp.downloadFile({ url, file_name: filename });
  } else {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
}
