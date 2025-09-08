'use client';

import { useEffect, useState } from 'react';
import { Category } from '@/features/categories/types';
import { HiPlus } from 'react-icons/hi';
import CategoryItemShop from './CategoryItemShop';

interface CategoryChildrenGridProps {
  name: string;
  categories: Category[];
  basePath?: string;
}

function getVisibleCountByScreenWidth(width: number): number {
  if (width < 640) return 2;
  if (width < 768) return 3;
  if (width < 1024) return 4;
  if (width < 1280) return 5;
  if (width < 1536) return 6;
  return 8;
}

function useResponsiveVisibleCount() {
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setVisibleCount(getVisibleCountByScreenWidth(width));
    };

    update();
    const resizeListener = () => update();

    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return visibleCount;
}

export default function CategoryChildrenGrid({ name, categories, basePath }: CategoryChildrenGridProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = useResponsiveVisibleCount();

  if (!categories?.length || visibleCount === null) return null;

  const slicedCount = showAll ? categories.length : visibleCount - 1;
  const visibleCategories = categories.slice(0, slicedCount);
  const shouldShowMore = !showAll && categories.length > slicedCount;

  return (
    <section className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold text-gray-900">{name || 'دسته‌بندی'}</span>
      </div>

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          2xl:grid-cols-8
          gap-4
          overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300
        "
      >
        {visibleCategories.map((child) => (
          <div key={child.id}>
            <CategoryItemShop
              name={child.name}
              imageUrl={child?.thumbnailImage?.fileUrl}
              href={basePath ? `/${basePath}/${child.slug}` : child.slug}
            />
          </div>
        ))}

        {shouldShowMore && (
          <div>
            <CategoryItemShop
              name="مشاهده بیشتر"
              onClick={() => setShowAll(true)}
              icon={<HiPlus className="text-gray-500" size={36} />}
              isButton
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </section>
  );
}
