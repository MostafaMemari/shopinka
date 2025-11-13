'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ColorItem } from '../StickerMakerView';
import { useDispatch, useSelector } from 'react-redux';
import { setText } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';
import { FontItemType } from '@/types/font';

interface EditableTextProps {
  selectedFont: FontItemType | null;
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
    if (!selectedFont?.base64Content || !isClient) return;

    const fontFace = new FontFace(selectedFont.name, `url(data:font/woff2;base64,${selectedFont.base64Content}) format('woff2')`);

    setFontLoaded(false);
    fontFace
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        setFontLoaded(true);
      })
      .catch((err) => {
        console.error('Error loading font:', err);
        setFontLoaded(true);
      });
  }, [selectedFont, isClient]);

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
  const fontFamily = fontLoaded && selectedFont ? selectedFont.name : 'Arial';

  const editableStyle: React.CSSProperties = {
    fontSize: '40px',
    color: colorValue,
    fontFamily,
    lineHeight: options.lineHeight,
    background: 'transparent',
    textAlign: options.textAlign,
    caretColor: 'var(--color-primary)',
    filter: 'drop-shadow(0.015em 0.015em 0.01em rgba(4, 8, 15, 0.3))',
    maxWidth: '90%',
    transition: 'opacity 0.2s ease',
    fontWeight: options.fontWeight,
    fontStyle: options.fontStyle,
  };

  if (!isClient) {
    return (
      <div className="absolute flex items-center justify-center w-full h-full pointer-events-none">
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 border-2 border-gray-300 rounded-full opacity-40" />
          <div className="absolute inset-0 border-2 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      {!fontLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 border-2 border-gray-300 rounded-full opacity-40" />
            <div className="absolute inset-0 border-2 border-t-blue-600 rounded-full animate-spin" />
          </div>
        </div>
      ) : (
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
            'whitespace-pre-wrap outline-none text-center select-text transition-opacity ease-in-out relative min-h-[1.2em]',
            isFocused ? 'opacity-100' : 'opacity-90',
            !isFocused && !text
              ? "before:content-['متن_را_اینجا_وارد_کنید_...'] before:text-gray-400 before:opacity-40 before:pointer-events-none before:select-none"
              : '',
          )}
          style={editableStyle}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default EditableText;
