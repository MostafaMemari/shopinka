import { Badge } from '@/components/ui/badge';
import { surfaceLabelMap } from '@/types/materialStickerType';
import { FontItem } from '@/types/fontType';
import { MaterialStickerItem } from '@/types/materialStickerType';

interface StickerSelectionSummaryProps {
  font?: FontItem | null;
  material?: MaterialStickerItem | null;
}

export default function StickerSelectionSummary({ font, material }: StickerSelectionSummaryProps) {
  if (!font && !material) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {font && (
        <Badge variant="secondary" className="gap-1.5 px-2.5 py-0.5 font-normal">
          <span className="text-muted-foreground">فونت</span>
          <span className="font-medium">{font.displayName || font.name}</span>
        </Badge>
      )}

      {material && (
        <Badge variant="outline" className="flex items-center gap-1.5 px-2.5 py-0.5">
          <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-background">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: material.colorCode }} />
          </span>

          <span className="font-medium">{material.name}</span>
        </Badge>
      )}

      {material?.surface && (
        <Badge variant="outline" className="px-2.5 py-0.5 text-muted-foreground">
          {surfaceLabelMap[material.surface]}
        </Badge>
      )}
    </div>
  );
}
