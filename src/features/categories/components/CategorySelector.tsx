'use client';

import { useMemo, useCallback } from 'react';
import { useQueryState } from 'nuqs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@/features/categories/CategoryType';
import { Label } from '@/components/ui/label';

interface Props {
  queryKey?: string;
  title?: string;
  categories: Category[];
}

const CategorySelector: React.FC<Props> = ({ queryKey = 'categoryIds', title = 'دسته‌بندی‌ها', categories }) => {
  const [categoryIds, setCategoryIds] = useQueryState(queryKey, { defaultValue: '', history: 'replace', shallow: false });
  const [, setPage] = useQueryState('page', { defaultValue: '1', history: 'replace', shallow: false });

  const selectedCategories = useMemo(() => (categoryIds ? categoryIds.split(',').map(Number) : []), [categoryIds]);

  const handleToggle = useCallback(
    (id: number) => {
      const updated = selectedCategories.includes(id) ? selectedCategories.filter((cid) => cid !== id) : [...selectedCategories, id];

      setCategoryIds(updated.length ? updated.join(',') : '');

      setPage('1');
    },
    [selectedCategories, setCategoryIds, setPage],
  );

  if (!categories || categories.length === 0) return null;

  return (
    <ul>
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="hover:no-underline cursor-pointer">
            <Label className="cursor-pointer">{title}</Label>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      className="cursor-pointer"
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleToggle(category.id)}
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </Label>
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
