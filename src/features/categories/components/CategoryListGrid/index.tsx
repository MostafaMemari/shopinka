'use client';

import { Category } from '@/features/categories/CategoryType';
import { useIsMounted } from '@/hooks/useIsMounted';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryListGridItemSkeleton } from './CategoryListGridItemSkeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import CategoryListGridItem from './CategoryListGridItem';

interface CategoryChildrenGridProps {
  name: string;
  categories: Category[];
  basePath?: string;
}

export default function CategoryChildrenGrid({ name, categories, basePath }: CategoryChildrenGridProps) {
  const isMounted = useIsMounted();

  if (!isMounted)
    return (
      <section className="mb-6">
        <Skeleton className="h-8 w-48 mb-4" />

        <ScrollArea className="w-full">
          <div className="flex w-max gap-2 pb-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <CategoryListGridItemSkeleton key={index} className="flex-shrink-0 w-30" />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    );

  if (!categories?.length) return null;

  return (
    <section className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold text-gray-900">{name || 'دسته‌بندی'}</span>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max gap-2 pb-2">
          {categories.map((child) => (
            <div key={child.id} className="flex-shrink-0 w-30">
              <CategoryListGridItem
                name={child.name}
                imageUrl={child?.thumbnailImage?.fileUrl}
                href={basePath ? `/${basePath}/${child.slug}` : child.slug}
              />
            </div>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
