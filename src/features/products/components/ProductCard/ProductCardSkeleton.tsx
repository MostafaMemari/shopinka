'use client';

import { Card, Skeleton } from '@/components/ui';
import { FC } from 'react';

const ProductCardSkeleton: FC = () => {
  return (
    <Card className="w-56 h-80 rounded-lg p-4 flex-shrink-0 border border-gray-200">
      <Skeleton className="w-full h-40 rounded-md mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </Card>
  );
};

export default ProductCardSkeleton;
