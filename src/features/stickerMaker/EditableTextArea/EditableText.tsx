'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import { useLoadFont } from '@/hooks/useLoadFont';
import { setText } from '@/store/slices/stickerSlice';

interface EditableTextProps {
  onStartEditing: () => void;
}

const EditableText: React.FC<EditableTextProps> = ({ onStartEditing }) => {
  const { selectedFont, selectedMaterial, text, options } = useSelectedStickerAssets();
  const { fontLoaded, fontFamily } = useLoadFont(selectedFont);

  const dispatch = useDispatch();
  const editableRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!fontLoaded) return;

    const timeout = setTimeout(() => {
      editableRef.current?.focus();
      onStartEditing();
    }, 0);

    return () => clearTimeout(timeout);
  }, [fontLoaded]);

  useEffect(() => {
    if (editableRef.current && editableRef.current.innerText !== text) {
      editableRef.current.innerText = text;
    }
  }, [text]);

  if (!fontLoaded) {
    return (
      <div className="absolute flex items-center justify-center w-full h-full pointer-events-none">
        <div className="w-6 h-6 border-2 border-gray-300 rounded-full opacity-40 animate-spin border-t-blue-600" />
      </div>
    );
  }

  const colorValue = selectedMaterial?.colorCode || '#000000';
  const editableStyle: React.CSSProperties = {
    fontSize: selectedFont?.size
      ? `clamp(${selectedFont.size * 0.8}rem, ${selectedFont.size}rem + 1vw, ${selectedFont.size * 1.8}rem)`
      : 'clamp(1rem, 2vw, 3rem)',
    color: colorValue,
    fontFamily,
    lineHeight: selectedFont?.lineHeight,
    textAlign: 'center',
    caretColor: 'var(--color-primary)',
    filter: 'drop-shadow(0.015em 0.015em 0.01em rgba(4, 8, 15, 0.3))',
    maxWidth: '90%',
    fontWeight: options?.weight,
    fontStyle: options?.style,
    transition: 'opacity 0.2s ease',
  };

  return (
    <div className="flex items-center justify-center p-0.5 w-full h-full relative">
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
          dispatch(setText(e.currentTarget.innerText.trim()));
        }}
        className={`whitespace-pre-wrap outline-none text-center select-text relative min-h-[1.2em] ${
          isFocused ? 'opacity-100' : 'opacity-90'
        } ${!isFocused && !text ? "before:content-['متن_را_اینجا_وارد_کنید_...'] before:text-gray-400 before:opacity-40 before:pointer-events-none before:select-none" : ''}`}
        style={editableStyle}
      >
        {text}
      </div>
    </div>
  );
};

export default EditableText;
