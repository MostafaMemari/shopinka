import { MoveHorizontal, MoveVertical } from 'lucide-react';

interface StickerLineDimensionsProps {
  width: number;
  height: number;
}

export default function StickerLineDimensions({ width, height }: StickerLineDimensionsProps) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <Dimension icon={<MoveHorizontal className="h-3.5 w-3.5" />} label="عرض" value={width} />

      <span className="select-none text-muted-foreground/40">×</span>

      <Dimension icon={<MoveVertical className="h-3.5 w-3.5" />} label="ارتفاع" value={height} />
    </div>
  );
}

function Dimension({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span className="whitespace-nowrap">
        {label} <span className="font-medium tabular-nums">{value} </span>
        <span className="text-[10px] text-muted-foreground ml-0.5">سانتی‌متر</span>
      </span>
    </div>
  );
}
