import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SwiperCardSkeleton() {
  return (
    <Card className="relative border p-0 mx-1.5 overflow-hidden">
      <CardContent className="flex aspect-[3/4] flex-col items-center p-2 gap-2">
        <Skeleton className="h-4 w-16 rounded-md" />

        <Skeleton className="mt-auto aspect-square w-full rounded-full" />
      </CardContent>
    </Card>
  );
}
