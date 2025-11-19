'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ColorItem } from '../StickerMakerView';
import { useDispatch, useSelector } from 'react-redux';
import { setText } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';
import { fontType } from '@/types/font';

interface EditableTextProps {
  selectedFont: fontType | null;
  selectedColor: ColorItem | null;
  onStartEditing: () => void;
}

const EditableText: React.FC<EditableTextProps> = ({ selectedFont, selectedColor, onStartEditing }) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { text, options } = useSelector((state: RootState) => state.sticker);

  const [isClient, setIsClient] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!selectedFont?.file) {
      setFontLoaded(true);
      return;
    }

    setFontLoaded(false);
    const fontFace = new FontFace(selectedFont.name, `url(${selectedFont.file})`);
    fontFace
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        setFontLoaded(true);
      })
      .catch(() => setFontLoaded(true));
  }, [selectedFont]);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.style.textAlign = options.textAlign;
    }
  }, [options.textAlign]);

  useEffect(() => {
    if (editableRef.current && text !== editableRef.current.innerText) {
      editableRef.current.innerText = text;
    }
  }, [text, isClient]);

  const colorValue = selectedColor?.value || '#000000';
  const fontFamily = fontLoaded && selectedFont ? selectedFont.name : 'IranYekan';

  const editableStyle: React.CSSProperties = {
    fontSize: '2rem',
    color: colorValue,
    fontFamily,
    lineHeight: options.lineHeight,
    background: 'transparent',
    textAlign: options.textAlign,
    caretColor: 'var(--color-primary)',
    filter: 'drop-shadow(0.015em 0.015em 0.01em rgba(4, 8, 15, 0.3))',
    maxWidth: '90%',
    fontWeight: options.fontWeight,
    fontStyle: options.fontStyle,
    transition: 'opacity 0.2s ease',
  };

  if (!isClient || !fontLoaded) {
    return (
      <div className="absolute flex items-center justify-center w-full h-full pointer-events-none">
        <div className="w-6 h-6 border-2 border-gray-300 rounded-full opacity-40 animate-spin border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        dir="rtl"
        onFocus={() => {
          setIsFocused(true);
          onStartEditing();
        }}
        onBlur={(e) => {
          setIsFocused(false);
          const newText = (e.target as HTMLDivElement).innerText.trim();
          dispatch(setText(newText));
        }}
        className={cn(
          'whitespace-pre-wrap outline-none text-center select-text relative min-h-[1.2em]',
          isFocused ? 'opacity-100' : 'opacity-90',
          !isFocused && !text
            ? "before:content-['متن_را_اینجا_وارد_کنید_...'] before:text-gray-400 before:opacity-40 before:pointer-events-none before:select-none"
            : '',
        )}
        style={editableStyle}
      >
        {text}
      </div>
    </div>
  );
};

export default EditableText;
