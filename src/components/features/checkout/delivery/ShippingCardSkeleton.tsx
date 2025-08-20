import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function ShippingCardSkeleton() {
  return (
    <Card className={cn('p-4 border-border bg-card dark:bg-gray-800 dark:border-gray-700')}>
      <CardContent className="flex flex-col p-0 gap-3">
        <CardTitle className="flex gap-2 items-center">
          <Skeleton className="h-5 w-5 rounded-sm" />
          <Skeleton className="h-5 w-[100px]" />
        </CardTitle>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </CardContent>
    </Card>
  );
}
