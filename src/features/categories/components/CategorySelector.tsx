'use client';

import { useMemo, useCallback } from 'react';
import { useQueryState } from 'nuqs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@/features/categories/types';
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
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="hover:no-underline cursor-pointer">{title}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      className="cursor-pointer"
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleToggle(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ul>
  );
};

export default CategorySelector;
