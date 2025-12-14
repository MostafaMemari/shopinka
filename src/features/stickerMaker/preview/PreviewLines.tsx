import { Line } from '@/store/slices/stickerSlice';
import { ArrowLeft, ArrowUp } from 'lucide-react';

interface PreviewLinesProps {
  line: Line;
  fontFamily?: string;
  fontWeight?: number | string;
  fontStyle?: string;
  fontSize?: number;
}

export default function PreviewLines({ line, fontSize, fontFamily, fontWeight, fontStyle }: PreviewLinesProps) {
  const hasWidth = Boolean(line.width);
  const hasHeight = Boolean(line.height);

  const displayWidth = line.width ? `${line.width} سانتی‌متر` : '?? سانتی‌متر';
  const displayHeight = line.height ? `${line.height} سانتی‌متر` : '?? سانتی‌متر';
  const dimensionLineClasses = 'absolute text-[10px] text-gray-500 font-medium whitespace-nowrap bg-white px-1 z-10';

  return (
    <>
      {line.text && (
        <div className="relative min-h-[120px] border-b flex items-center justify-center">
          {hasWidth && (
            <>
              <div className={`${dimensionLineClasses} absolute top-0 left-1/2 -translate-x-1/2 flex items-center`}>
                <ArrowLeft className="w-2 h-2 text-red-500 rotate-180 mr-1" />
                <span className="text-red-500">{displayWidth}</span>
                <ArrowLeft className="w-2 h-2 text-red-500 ml-1" />
              </div>

              <div className="absolute left-0 right-0 top-2 border-b border-dashed border-red-300 pointer-events-none" />
            </>
          )}

          {hasHeight && (
            <>
              <div className={`${dimensionLineClasses} absolute -left-9 top-1/2 -translate-y-1/2 flex items-center -rotate-90`}>
                <ArrowUp className="w-2 h-2 text-red-500 rotate-90 mr-1" />
                <span className="text-red-500">{displayHeight}</span>
                <ArrowUp className="w-2 h-2 text-red-500 -rotate-90 ml-1" />
              </div>

              <div className="absolute top-0 bottom-0 left-2 border-l border-dashed border-red-300 pointer-events-none mb-3" />
            </>
          )}

          <div
            className="relative z-0 text-center p-2 pt-4 mb-3 w-full max-w-full"
            style={{
              fontFamily: fontFamily || 'inherit',
              fontWeight: fontWeight,
              fontStyle: fontStyle,
              color: '#000',
              fontSize: `${fontSize ? fontSize : 1}rem`,
              lineHeight: 1.2,
              whiteSpace: 'pre',
            }}
          >
            {line.text}
          </div>
        </div>
      )}
    </>
  );
}
