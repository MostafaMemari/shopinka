import { FontItem } from '@/types/fontType';
import { useEffect, useState } from 'react';

export function useFontByTitle(title: string | null) {
  const [font, setFont] = useState<FontItem | null>(null);

  useEffect(() => {
    if (!title) return;

    const code = title;

    fetch(`/fonts/${code}.json`)
      .then((res) => res.json())
      .then((data) => setFont(data))
      .catch((err) => {
        console.error('Failed to load font:', code, err);
        setFont(null);
      });
  }, [title]);

  return font;
}
