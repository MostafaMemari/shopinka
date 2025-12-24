'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CustomStickerValues } from '@/features/cart/cartType';
import { MoveHorizontal, MoveVertical, Type } from 'lucide-react';

interface CustomStickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customStickerValues: CustomStickerValues | null;
}

const SURFACE_LABELS: Record<string, string> = {
  GLOSSY: 'براق',
  MATTE: 'مات',
};

export default function CustomStickerDialog({ open, onOpenChange, customStickerValues }: CustomStickerDialogProps) {
  if (!customStickerValues) return null;

  const { font, material, lines } = customStickerValues;
  const thumbnail = customStickerValues.previewImage?.fileUrl || null;

  console.log(thumbnail);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 overflow-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-right text-base font-bold">جزئیات برچسب سفارشی</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center bg-muted/30 py-4 rounded-2xl border border-dashed">
            <Image
              src={thumbnail || '/placeholder.png'}
              alt="برچسب"
              width={120}
              height={120}
              className="rounded-lg drop-shadow-md object-contain"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs font-normal">
              <Type className="w-3.5 h-3.5 text-muted-foreground" />
              فونت: {font.displayName}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 text-xs font-normal">
              جنس: {material.name}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs font-normal border-primary/30 text-primary">
              سطح {SURFACE_LABELS[material.surface] || material.surface}
            </Badge>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground mr-1">متن‌ها و ابعاد:</p>

            <ScrollArea className="h-[240px] w-full rounded-md pr-4" dir="rtl">
              <div className="grid gap-4 pb-4">
                {lines.map((line) => (
                  <div
                    key={line.lineNumber}
                    className="group relative rounded-xl border bg-card p-4 pt-5 transition-colors hover:border-primary/30 shadow-sm"
                  >
                    <span className="absolute -top-2 right-3 bg-background border px-2 py-0.5 rounded-full text-[10px] font-bold text-primary">
                      خط {line.lineNumber}
                    </span>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-text text-right" dir="auto">
                        {line.text}
                      </p>

                      <div className="flex items-center gap-4 pt-2 border-t border-dashed">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MoveHorizontal className="w-3.5 h-3.5 text-blue-500" />
                          <span className="text-[11px]">عرض:</span>
                          <span className="text-xs font-medium text-text">
                            {line.width} <small className="text-[10px]">cm</small>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MoveVertical className="w-3.5 h-3.5 text-green-500" />
                          <span className="text-[11px]">ارتفاع:</span>
                          <span className="text-xs font-medium text-text">
                            {line.height} <small className="text-[10px]">cm</small>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
