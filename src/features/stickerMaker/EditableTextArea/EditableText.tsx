'use client';

import React, { useEffect, useRef } from 'react';
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
          'break-words whitespace-pre-wrap outline-none caret-gray-400 text-center select-text empty:before:content-["متن_را_اینجا_وارد_کنید_..."]',
          isEditing ? 'cursor-none empty:before:opacity-0' : 'cursor-pointer empty:before:opacity-50',
        )}
        style={{
          fontSize: '40px',
          color: selectedColor ? selectedColor.value : '#000000',
          fontFamily: selectedFont,
          WebkitTextStroke: '0',
          filter: 'drop-shadow(0.03em 0.03em 0.02em rgb(4,8,15))',
          background: 'transparent',
          maxWidth: '90%',
          textAlign: 'center',
          caretColor: isEditing ? '#fff' : 'transparent',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default EditableText;
