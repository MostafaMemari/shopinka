'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { Line, setLines, setText } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';

interface Props {
  line: Line;
}

export default function StickerDimensionForm({ line }: Props) {
  const { lines } = useSelector((state: RootState) => state.sticker);

  const dispatch = useDispatch();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(setLines(lines.map((l) => (l.lineNumber === line.lineNumber ? { ...l, text: value } : l))));
    dispatch(
      setText(
        lines
          .map((l) => (l.lineNumber === line.lineNumber ? { ...l, text: value } : l))
          .map((l) => l.text)
          .join('\n'),
      ),
    );
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(
      setLines(
        lines.map((l) =>
          l.lineNumber === line.lineNumber
            ? {
                ...l,
                width: Number(value),
                height: line.ratio ? Number((Number(value) / line.ratio).toFixed(1)) : null,
              }
            : l,
        ),
      ),
    );
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(
      setLines(
        lines.map((l) =>
          l.lineNumber === line.lineNumber
            ? {
                ...l,
                width: line.ratio ? Number((Number(value) * line.ratio).toFixed(1)) : null,
                height: Number(value),
              }
            : l,
        ),
      ),
    );
  };

  return (
    <div className="p-4 space-y-4">
      <Input placeholder="متن..." value={line.text} onChange={handleTextChange} className="flex-1 text-right" dir="rtl" />
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="عرض (cm)"
          value={line.width ? line.width.toString() : ''}
          onChange={handleWidthChange}
          className="flex-1 text-right"
          dir="rtl"
          min="10"
          max="30"
        />
        <Input
          type="number"
          placeholder="طول (cm)"
          value={line.height ? line.height.toString() : ''}
          onChange={handleHeightChange}
          className="flex-1 text-right"
          dir="rtl"
        />
      </div>
    </div>
  );
}
