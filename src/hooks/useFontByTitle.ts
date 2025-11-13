import { useEffect, useState } from 'react';
import { FontItemType } from '@/types/font';

export function useFontByTitle(title: string | null) {
  const [font, setFont] = useState<FontItemType | null>(null);

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
