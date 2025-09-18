import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface DiscountBadgeProps {
  discount: number;
  className?: string;
}

function DiscountBadge({ discount, className }: DiscountBadgeProps) {
  return (
    <Badge
      variant="destructive"
      className={cn(
        'w-9 rounded-tr-full rounded-tl-full rounded-br-full rounded-bl-sm bg-accent-foreground py-px text-center text-sm text-white shadow-md',
        className,
      )}
    >
      %{discount}
    </Badge>
  );
}

export default DiscountBadge;
