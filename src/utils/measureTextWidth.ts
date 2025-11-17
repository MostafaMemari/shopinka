export function measureTextWidth({
  text,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing = 0,
}: {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  letterSpacing?: number;
}) {
  console.log({
    text,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  const baseWidth = ctx.measureText(text).width;

  const extra = letterSpacing * (text.length - 1);

  return baseWidth + extra;
}
