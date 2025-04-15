type Parts = (string | false | undefined | null | number)[];

export function buildClassName(...parts: Parts) {
  return parts.filter(Boolean).join(' ');
}
