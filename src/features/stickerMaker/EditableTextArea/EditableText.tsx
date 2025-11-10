'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ColorItem } from '../StickerMakerView';

interface EditableTextProps {
  text: string;
  setText: (value: string) => void;
  selectedFont: string;
  selectedColor: ColorItem | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ text, setText, selectedFont, selectedColor, isEditing, setIsEditing }) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const [fontClass, setFontClass] = useState('');

  useEffect(() => {
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
        };

        const loader = fontMap[selectedFont] || fontMap['farJadid'];
        const fontModule = await loader();
        const font = Object.values(fontModule)[0] as { className: string };
        setFontClass(font.className);
      } catch (err) {
        console.error('Font load error:', err);
      }
    }

    loadFont();
  }, [selectedFont]);

  useEffect(() => {
    if (isEditing && editableRef.current) {
      const el = editableRef.current;
      el.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEditing]);

  const editableStyle: React.CSSProperties = {
    fontSize: '40px',
    color: selectedColor ? selectedColor.value : '#000000',
    WebkitTextStroke: '0',
    filter: 'drop-shadow(0.015em 0.015em 0.01em rgba(4, 8, 15, 0.3))',
    background: 'transparent',
    maxWidth: '90%',
    textAlign: 'center' as const,
    caretColor: isEditing ? 'var(--color-primary)' : 'transparent',
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        ref={editableRef}
        contentEditable={isEditing}
        suppressContentEditableWarning
        spellCheck={false}
        dir="rtl"
        onBlur={() => setIsEditing(false)}
        className={cn(
          fontClass,
          'break-words whitespace-pre-wrap outline-none caret-gray-400 text-center select-text empty:before:content-["متن_را_اینجا_وارد_کنید_..."]',
          isEditing ? 'cursor-none empty:before:opacity-0' : 'cursor-pointer empty:before:opacity-50',
        )}
        style={editableStyle}
      >
        {text}
      </div>
    </div>
  );
};

export default EditableText;
