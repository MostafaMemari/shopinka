import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ShippingItem } from '@/features/shippings/types';
import { formatPrice } from '@/utils/formatter';
import { Square, SquareCheckBig, Tag, Timer } from 'lucide-react';
import React from 'react';

interface DeliveryItemProps {
  item: ShippingItem;
  selected: string | number | null;
  setSelected: (id: string | number | null) => void;
  onShippingSelect: (item: ShippingItem) => void;
}

function DeliveryItem({ item, selected, setSelected, onShippingSelect }: DeliveryItemProps) {
  const isChecked = selected === item.id;

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all p-4',
        {
          'border-primary bg-primary/10 shadow-md': isChecked,
          'border-border bg-card hover:border-muted-foreground/50': !isChecked,
        },
        'dark:bg-gray-800 dark:border-gray-700',
      )}
      tabIndex={0}
      role="button"
      onClick={() => {
        setSelected(item.id);
        onShippingSelect(item);
      }}
    >
      <CardContent className="flex flex-col p-0 gap-4">
        <CardTitle className="flex gap-2">
          {isChecked ? <SquareCheckBig size={20} /> : <Square size={20} />}

          <span>{item.name}</span>
        </CardTitle>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag size={16} className="text-muted-foreground" />
            <span>{item.price === 0 ? 'رایگان' : `${formatPrice(item.price)} تومان`}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer size={16} className="text-muted-foreground" />
            <span>تحویل در {item.estimatedDays} روز</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DeliveryItem;
