import { Badge } from '@/components/ui/badge';
import { surfaceLabelMap } from '@/types/materialStickerType';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';

export default function StickerSelectionSummary() {
  const { selectedFont, selectedMaterial } = useSelectedStickerAssets();

  if (!selectedFont && !selectedMaterial) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {selectedFont && (
        <Badge variant="secondary" className="gap-1.5 px-2.5 py-0.5 font-normal">
          <span className="text-muted-foreground">فونت</span>
          <span className="font-medium">{selectedFont.displayName || selectedFont.name}</span>
        </Badge>
      )}

      {selectedMaterial && (
        <Badge variant="outline" className="flex items-center gap-1.5 px-2.5 py-0.5">
          <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-background">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: selectedMaterial.colorCode }} />
          </span>

          <span className="font-medium">{selectedMaterial.name}</span>
        </Badge>
      )}

      {selectedMaterial?.surface && (
        <Badge variant="outline" className="px-2.5 py-0.5 text-muted-foreground">
          {surfaceLabelMap[selectedMaterial.surface]}
        </Badge>
      )}
    </div>
  );
}
