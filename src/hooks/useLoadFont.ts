import { FontItem } from '@/types/fontType';
import { useEffect, useState } from 'react';

export function useLoadFont(selectedFont?: FontItem | null) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (!selectedFont?.file) {
      setFontLoaded(true);
      return;
    }

    let isMounted = true;
    setFontLoaded(false);

    const fontFace = new FontFace(selectedFont.name, `url(${selectedFont.file.fileUrl})`);

    fontFace
      .load()
      .then((loadedFont) => {
        if (!isMounted) return;
        document.fonts.add(loadedFont);
        setFontLoaded(true);
      })
      .catch(() => {
        if (isMounted) setFontLoaded(true);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedFont]);

  const fontFamily = fontLoaded && selectedFont ? selectedFont.name : 'IranYekan';

  return {
    fontLoaded,
    fontFamily,
  };
}
