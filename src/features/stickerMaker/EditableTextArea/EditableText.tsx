'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ColorItem } from '../StickerMakerView';
import { useDispatch, useSelector } from 'react-redux';
import { setText } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';

interface EditableTextProps {
  selectedFont: string;
  selectedColor: ColorItem | null;
}

const EditableText: React.FC<EditableTextProps> = ({ selectedFont, selectedColor }) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const [fontClass, setFontClass] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();
  const { text, options } = useSelector((state: RootState) => state.sticker);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    let isMounted = true;

    async function loadFont() {
      try {
        const fontMap: Record<string, () => Promise<any>> = {
          vazir: () => import('@/fonts/persian/vazir'),
          dimaShekasteh: () => import('@/fonts/persian/dimaShekasteh'),
          lalezar: () => import('@/fonts/persian/lalezar'),
          bTitrBold: () => import('@/fonts/persian/bTitrBold'),
          farJadid: () => import('@/fonts/persian/farJadid'),
          dastnevis: () => import('@/fonts/persian/dastnevis'),
          digiSarvenaz: () => import('@/fonts/persian/digiSarvenaz'),
          iranNastaliq: () => import('@/fonts/persian/iranNastaliq'),
          shekasteh: () => import('@/fonts/persian/shekasteh'),
          bMorvaridBold: () => import('@/fonts/persian/BMorvaridBold'),
        };

        const loader = fontMap[selectedFont] || fontMap['vazir'];
        const fontModule = await loader();
        if (!isMounted) return;

        const font = Object.values(fontModule)[0] as { className: string };
        setFontClass(font.className);
      } catch (err) {
        console.error('Font load error:', err);
      }
    }

    loadFont();
    return () => {
      isMounted = false;
    };
  }, [selectedFont, isClient]);

  const colorValue = isClient && selectedColor ? selectedColor.value : '#000000';

  const editableStyle: React.CSSProperties = {
    fontSize: '40px',
    color: colorValue,
    filter: 'drop-shadow(0.015em 0.015em 0.01em rgba(4, 8, 15, 0.3))',
    background: 'transparent',
    maxWidth: '90%',
    textAlign: 'center',
    caretColor: 'var(--color-primary)',
    transition: 'opacity 0.2s ease',
    fontFamily: fontClass ? undefined : 'Arial',
    lineHeight: options.lineHeight,
  };

  if (!isClient)
    return (
      <div className="absolute flex items-center justify-center w-full h-full pointer-events-none">
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 border-2 border-gray-300 rounded-full opacity-40" />
          <div className="absolute inset-0 border-2 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        dir="rtl"
        onFocus={() => setIsFocused(true)}
        onInput={(e) => {
          const el = e.target as HTMLDivElement;
          let value = el.innerText;

          if (value === '\n' || value === '') {
            value = '';
            el.innerHTML = '';
          }
        }}
        onBlur={(e) => {
          setIsFocused(false);

          const newText = (e.target as HTMLDivElement).innerText.trim();

          dispatch(setText(newText));
        }}
        className={cn(
          fontClass,
          'whitespace-pre-wrap outline-none transition-all ease-in-out text-center select-text',
          'empty:before:text-gray-400 empty:before:pointer-events-none',
          !isFocused && text === '' ? 'empty:before:content-["متن_را_اینجا_وارد_کنید_..."]' : '',
        )}
        style={editableStyle}
      >
        {text}
      </div>
    </div>
  );
};

export default EditableText;
