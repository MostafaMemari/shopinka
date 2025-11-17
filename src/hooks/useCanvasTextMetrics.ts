import { useLayoutEffect, useState } from 'react';

export function usePersianTextRatio(text: string, fontFamily: string, fontSize: number = 25.6) {
  const [ratio, setRatio] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!text || !fontFamily) return;

    // ساخت عنصر مخفی
    const span = document.createElement('span');
    span.style.fontFamily = fontFamily;
    span.style.fontSize = `${fontSize}px`;
    span.style.fontWeight = 'normal';
    span.style.fontStyle = 'normal';
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'pre';
    span.style.lineHeight = 'normal';
    span.textContent = text;

    document.body.appendChild(span);

    const rect = span.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (height > 0) setRatio(width / height);
    else setRatio(1);

    document.body.removeChild(span);
  }, [text, fontFamily, fontSize]);

  return ratio;
}
