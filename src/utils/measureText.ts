export function measureText(
  text: string,
  options: { fontFamily: string; fontSize?: number; fontWeight?: string | number; lineHeight?: number },
): number {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const { fontFamily, fontSize = 48, fontWeight = 'normal', lineHeight = 1 } = options;

  ctx.font = `${fontWeight} ${fontSize}px "${fontFamily}"`;
  ctx.direction = 'rtl';

  const metrics = ctx.measureText(text);

  const width = metrics.width;
  const height = (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) * lineHeight;

  return width / height;
}

export function measureMultilineText(
  text: string,
  options: { fontFamily: string; fontSize?: number; fontWeight?: string | number; lineHeight?: number },
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const { fontFamily, fontSize = 48, fontWeight = 'normal', lineHeight = 1.2 } = options;

  ctx.font = `${fontWeight} ${fontSize}px "${fontFamily}"`;
  ctx.direction = 'rtl';

  const lines = text.split('\n');

  let maxWidth = 0;
  let lineHeightPx = 0;

  for (const line of lines) {
    const metrics = ctx.measureText(line);
    const width = metrics.width;

    if (width > maxWidth) maxWidth = width;

    if (!lineHeightPx) {
      lineHeightPx = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    }
  }

  const totalHeight = lines.length * lineHeightPx * lineHeight;

  return {
    width: maxWidth,
    height: totalHeight,
    ratio: maxWidth / totalHeight,
  };
}
