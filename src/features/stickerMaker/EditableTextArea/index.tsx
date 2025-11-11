'use client';

import React, { useEffect, useState } from 'react';
import EditableText from './EditableText';
import EditableSurface from './EditableSurface';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface EditableTextAreaProps {
  text: string;
  setText: (value: string) => void;
  onStartEditing?: () => void;
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({ text, setText, onStartEditing }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { selectedColor, selectedFont } = useSelector((state: RootState) => state.sticker);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsEditing(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[contenteditable]')) setIsEditing(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const startEditing = () => {
    setIsEditing(true);
    onStartEditing?.();
  };

  return (
    <div
      className="relative w-full h-svh overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8"
      onClick={startEditing}
    >
      <EditableSurface />
      <EditableText
        text={text}
        setText={setText}
        selectedFont={selectedFont}
        selectedColor={selectedColor}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default EditableTextArea;
