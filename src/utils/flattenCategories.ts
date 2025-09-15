import { Category } from '@/features/categories/CategoryType';

export function flattenCategories(categories: Category[], depth: number = 0): { category: Category; depth: number }[] {
  let result: { category: Category; depth: number }[] = [];
  categories.forEach((category) => {
    result.push({ category, depth });
    if (category.children?.length) {
      result = result.concat(flattenCategories(category.children, depth + 1));
    }
  });
  return result;
}
