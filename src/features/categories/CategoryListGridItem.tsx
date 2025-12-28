import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CategoryListGridItemSkeleton() {
  return (
    <Card className="flex flex-col items-center justify-center p-4 mb-1">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center mb-2">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>

      <Skeleton className="h-4 w-16 mt-1" />
    </Card>
  );
}
