import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="w-40 h-64 md:w-48 md:h-72 xl:w-40 xl:h-72 p-4 flex-shrink-0">
      <Skeleton className="w-full h-32 rounded-md mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

export const ProductCarouselSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex space-x-2 rtl:space-x-reverse">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
