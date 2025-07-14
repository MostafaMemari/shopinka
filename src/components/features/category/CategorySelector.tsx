'use client';

import { useMemo, useCallback } from 'react';
import { useQueryState } from 'nuqs';
import CategoryAccordion from './CategoryAccordion';
import CategoryItem from './CategoryItem';
import { Category } from '@/types/categoryType';
import { useResetPageOnQueryChange } from '@/hooks/useResetPageOnQueryChange';

interface Props {
  queryKey?: string;
  title?: string;
  categories: Category[];
}

const CategorySelector: React.FC<Props> = ({ queryKey = 'categoryIds', title = 'دسته‌بندی‌ها', categories }) => {
  const [categoryIds, setCategoryIds] = useQueryState(queryKey, {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  useResetPageOnQueryChange(categoryIds);

  const selectedCategories = useMemo(() => (categoryIds ? categoryIds.split(',').map(Number) : []), [categoryIds]);

  const collectCategoryIds = useCallback((category: Category): number[] => {
    return [category.id, ...(category.children?.flatMap(collectCategoryIds) ?? [])];
  }, []);

  const handleToggle = useCallback(
    (id: number) => {
      const updated = selectedCategories.includes(id) ? selectedCategories.filter((cid) => cid !== id) : [...selectedCategories, id];

      setCategoryIds(updated.length ? updated.join(',') : '');
    },
    [selectedCategories, setCategoryIds],
  );

  if (!categories || categories.length === 0) return null;

  return (
    <ul>
      <CategoryAccordion title={title} defaultOpen>
        <ul>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.id)}
              onToggle={() => handleToggle(category.id)}
            />
          ))}
        </ul>
      </CategoryAccordion>
    </ul>
  );
};

export default CategorySelector;
