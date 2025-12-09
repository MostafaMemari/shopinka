interface StickerRenderParams {
  text: string;
  fontFamily: string;
  color: string;
  weight: 'normal' | 'bold';
  style: 'normal' | 'italic';
  textAlign?: CanvasTextAlign;
  lineHeight?: number; // rem
}

export async function renderStickerImage({
  text,
  fontFamily,
  color,
  weight,
  style,
  textAlign = 'center',
  lineHeight = 1.2,
}: StickerRenderParams) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 800;

  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 800);

  ctx.direction = 'rtl';
  ctx.textAlign = textAlign;
  ctx.textBaseline = 'middle';

  const rawLines = text.split('\n');

  let lines = [...rawLines];
  while (lines.length > 1 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  const maxWidthAllowed = canvas.width * 0.86;
  const maxHeightAllowed = canvas.height * 0.86;

  let fontSize = 200;

  while (fontSize > 5) {
    ctx.font = `${style} ${weight} ${fontSize}px ${fontFamily}`;

    const maxLineWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));

    const metrics = lines.map((line) => ctx.measureText(line));
    const lineHeights = metrics.map((m) => Math.max(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent, lineHeight * fontSize));

    const totalHeight = lineHeights.reduce((a, b) => a + b, 0);

    if (maxLineWidth <= maxWidthAllowed && totalHeight <= maxHeightAllowed) {
      break;
    }

    fontSize -= 2;
  }

  ctx.font = `${style} ${weight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;

  const metrics = lines.map((line) => ctx.measureText(line));
  const lineHeights = metrics.map((m) => Math.max(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent, lineHeight * fontSize));

  const totalHeight = lineHeights.reduce((a, b) => a + b, 0);
  let currentY = (canvas.height - totalHeight) / 2;
  const centerX = canvas.width / 2;

  lines.forEach((line, i) => {
    const h = lineHeights[i];
    currentY += h / 2;
    ctx.fillText(line, centerX, currentY);
    currentY += h / 2;
  });

  return canvas.toDataURL('image/webp');
}
