export async function renderStickerImage({
  text,
  fontFamily,
  color,
  weight,
  style,
}: {
  text: string;
  fontFamily: string;
  color: string;
  weight: 'normal' | 'bold';
  style: 'normal' | 'italic';
  textAlign?: CanvasTextAlign;
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;

  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${style} ${weight} 80px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.direction = 'rtl';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const x = canvas.width / 2;
  const lines = text.split('\n');

  const metrics = lines.map((line) => ctx.measureText(line));

  const lineHeights = metrics.map((m) => m.actualBoundingBoxAscent + m.actualBoundingBoxDescent);
  const totalHeight = lineHeights.reduce((a, b) => a + b, 0);

  let currentY = (canvas.height - totalHeight) / 2;

  lines.forEach((line, i) => {
    const lineHeight = lineHeights[i];

    currentY += lineHeight / 2;

    ctx.fillText(line, x, currentY);

    currentY += lineHeight / 2;
  });

  return canvas.toDataURL('image/webp');
}
