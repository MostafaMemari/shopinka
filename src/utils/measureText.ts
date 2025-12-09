export function measureMultilineText(
  text: string,
  options: {
    fontFamily: string;
    fontSize?: number;
    fontWeight?: string | number;
    lineHeight?: number;
  },
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const { fontFamily, fontSize = 48, fontWeight = 'normal', lineHeight = 1 } = options;

  ctx.font = `${fontWeight} ${fontSize}px "${fontFamily}"`;
  ctx.direction = 'rtl';

  const rawLines = text.split('\n');
  const lines = [...rawLines];

  while (lines.length > 1 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  const lineResults: {
    text: string;
    width: number;
    height: number;
    lineNumber: number;
  }[] = [];

  let maxWidth = 0;
  let totalHeight = 0;

  lines.forEach((line, index) => {
    const metrics = ctx.measureText(line);

    const width = metrics.width;
    const height = (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) * lineHeight;

    lineResults.push({
      text: line,
      width,
      height,
      lineNumber: index + 1,
    });

    if (width > maxWidth) maxWidth = width;
    totalHeight += height;
  });

  return {
    lines: lineResults,
    total: {
      width: maxWidth,
      height: totalHeight,
      ratio: maxWidth / totalHeight,
    },
  };
}
