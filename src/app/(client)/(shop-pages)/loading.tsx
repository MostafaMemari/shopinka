import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryListGridItemSkeleton } from '@/features/categories/CategoryListGridItem';

export default function ShopPageSkeleton() {
  return (
    <div className="mx-auto">
      <section className="mb-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <CategoryListGridItemSkeleton key={index} />
          ))}
        </div>
      </section>

      <div className="mb-6 flex flex-col gap-4 md:hidden">
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="flex gap-x-4">
          <Skeleton className="h-12 w-1/2 rounded-lg" />
          <Skeleton className="h-12 w-1/2 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
        <Card className="col-span-4 row-span-2 hidden md:flex md:flex-col lg:col-span-3 gap-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </Card>

        <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
          <Card className="hidden md:flex flex-row items-center gap-x-2 py-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </Card>

          <div className="grid grid-cols-2 gap-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index}>
                <Skeleton className="h-48 w-full rounded-lg mb-2" />
                <Skeleton className="h-10 w-full rounded-lg mb-2" />
                <Skeleton className="h-6 w-3/4 rounded-lg" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
