import { Line } from '@/store/slices/stickerSlice';
import { ArrowLeft, ArrowUp } from 'lucide-react';

interface PreviewLinesProps {
  line: Line;
  fontFamily?: string;
  fontWeight?: number | string;
  fontStyle?: string;
  lineHeight?: number;
}

export default function PreviewLines({ line, fontFamily, fontWeight, fontStyle, lineHeight = 1.2 }: PreviewLinesProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="relative px-3 pt-6 pb-4">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center text-[11px] text-red-500 font-medium">
          <ArrowLeft className="w-3 h-3 rotate-180 mr-1" />
          {line.width} سانتی‌متر
          <ArrowLeft className="w-3 h-3 ml-1" />
        </div>

        <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center rotate-[-90deg] text-[11px] text-red-500 font-medium">
          <ArrowUp className="w-3 h-3 mr-1 rotate-90" />
          {line.height} سانتی‌متر
          <ArrowUp className="w-3 h-3 ml-1 -rotate-90" />
        </div>

        <div
          style={{ fontFamily, fontWeight, fontStyle, lineHeight, color: '#000000' }}
          className="mx-auto flex items-center justify-center border-dashed px-2 text-center text-black"
        >
          {line.text}
        </div>
      </div>
    </div>
  );
}
