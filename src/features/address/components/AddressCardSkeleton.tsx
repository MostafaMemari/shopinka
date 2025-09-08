import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function AddressCardSkeleton() {
  return (
    <Card className={cn('p-4 border-border bg-card dark:bg-gray-800 dark:border-gray-700')}>
      <CardContent className="flex justify-between p-0 gap-2">
        <Skeleton className="h-5 w-5 rounded-sm" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-5 w-[180px]" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <Skeleton className="h-5 w-5 rounded-sm" />
      </CardContent>
    </Card>
  );
}
