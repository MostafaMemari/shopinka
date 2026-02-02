import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="mb-3 mt-1 flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-lg" />
        <Skeleton className="h-4 w-20 rounded-lg" />
        <Skeleton className="h-4 w-24 rounded-lg" />
      </div>

      <Card>
        <div className="grid grow grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4 p-4">
          {/* Gallery / Actions */}
          <div className="flex flex-col items-center justify-center gap-3 lg:col-span-4">
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9 rounded-4xl" />
              <Skeleton className="h-9 w-9 rounded-4xl" />
            </div>

            {/* Main Image */}
            <Skeleton className="mx-auto w-3/5 md:max-w-[350px] lg:max-w-[450px] h-[230px] md:h-[230px] lg:h-[350px] rounded-lg object-contain" />

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 w-full px-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col lg:col-span-8 mt-4 lg:mt-0">
            {/* Title */}
            <Skeleton className="h-6 w-3/4 rounded-lg mb-3" />

            {/* SKU + Comments */}
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-px" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Variants / Properties */}
              <div className="flex flex-col gap-3 lg:col-span-7">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-5/6 rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>

              {/* Status / Add to Cart */}
              <div className="flex flex-col gap-3 lg:col-span-5">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
