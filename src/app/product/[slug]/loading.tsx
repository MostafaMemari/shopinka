import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductLoader() {
  return (
    <>
      {/* Desktop Loader */}
      <div className="hidden lg:block">
        {/* Breadcrumb Skeleton Loader */}
        <Card className="mb-4 w-1/4 p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-1/3 rounded-lg" />
            <Skeleton className="h-5 w-1/3 rounded-lg" />
          </div>
        </Card>

        <Card className="mb-6 p-6">
          <div className="mb-10 grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <div className="mb-4 flex items-center gap-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="mb-4 aspect-square w-full rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>

            <div className="col-span-8 flex min-h-full flex-col">
              <Skeleton className="mb-4 h-8 w-3/4 rounded-lg" />
              <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-1">
                  <div className="mb-4 flex items-center gap-x-4">
                    <Skeleton className="h-4 w-20 rounded-lg" />
                    <Skeleton className="h-4 w-px rounded-full" />
                    <Skeleton className="h-4 w-16 rounded-lg" />
                  </div>
                </div>
                <div className="col-span-1 flex flex-col">
                  <Skeleton className="mb-6 h-12 w-full rounded-lg" />
                  <Skeleton className="mb-6 h-6 w-24 rounded-lg" />
                  <Skeleton className="mb-6 h-12 w-1/3 rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              </div>
              <Skeleton className="mt-6 h-20 w-full rounded-lg" />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </Card>
      </div>

      {/* Mobile Loader */}
      <div className="lg:hidden">
        <Card className="mb-6 relative p-4">
          <Skeleton className="mb-4 aspect-square w-full rounded-lg" />
          <Skeleton className="mb-4 h-6 w-1/2 rounded-lg" />
          <Skeleton className="mb-4 h-8 w-3/4 rounded-lg" />
          <div className="mb-4 flex gap-x-4">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
          <Skeleton className="my-4 h-px w-full rounded-full" />
          <Skeleton className="mb-6 h-12 w-full rounded-lg" />
          <Skeleton className="mb-6 h-6 w-24 rounded-lg" />
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-12 w-1/2 rounded-lg" />
            <Skeleton className="h-12 w-1/3 rounded-lg" />
          </div>
        </Card>
      </div>
    </>
  );
}
