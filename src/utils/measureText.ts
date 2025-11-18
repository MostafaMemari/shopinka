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
