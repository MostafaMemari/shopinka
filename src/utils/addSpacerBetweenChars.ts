export const connectors = new Set([
  'ب',
  'پ',
  'ت',
  'ث',
  'ج',
  'چ',
  'ح',
  'خ',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ک',
  'گ',
  'ل',
  'م',
  'ن',
  'ه',
  'ی',
]);

export const nonConnectors = new Set(['ا', 'د', 'ذ', 'ر', 'ز', 'ژ', 'و']);

export function addSpacerBetweenChars(text: string, count: number = 1): string {
  if (count <= 0) return text;

  const spacer = 'ـ'.repeat(count);
  const chars = Array.from(text);
  let result = '';

  for (let i = 0; i < chars.length; i++) {
    const curr = chars[i];
    const next = chars[i + 1];

    result += curr;

    if (!next || next === ' ') continue;

    const currConnectsBothSides = connectors.has(curr);

    const nextIsPersianChar = connectors.has(next) || nonConnectors.has(next);

    if (currConnectsBothSides && nextIsPersianChar) {
      result += spacer;
    }
  }

  return result;
}
