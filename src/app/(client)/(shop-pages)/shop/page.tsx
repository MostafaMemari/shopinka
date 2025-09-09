import { getProducts } from '@/features/products/api';
import { loadSearchParams } from '@/utils/loadSearchParams';
import { parseArrayParam } from '@/utils/parseArrayParam';
import { SearchParams } from 'nuqs';
import SearchInput from '@/features/filter/SearchInput';
import SortBar from '@/features/filter/SortBar';
import MobileFilter from '@/features/filter/MobileFilter';
import MobileSortDrawer from '@/features/filter/MobileSortDrawer';
import { getCategories } from '@/features/categories/api';
import CategoryChildrenGrid from '@/features/categories/components/CategoryChildrenGrid';
import ProductListShop from '@/features/shopPage/ProductListShop';
import SidebarFilters from '@/features/filter/SidebarFilters';
import { Category } from '@/features/categories/types';
import { PRODUCT_SORT_OPTIONS, ProductParams } from '@/features/products/types';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await loadSearchParams(searchParams);

  const query: ProductParams = {
    page: params.page ?? 1,
    take: params.perPage ?? 10,
    hasDiscount: params.hasDiscount ?? undefined,
    categoryIds: parseArrayParam(params.categoryIds ?? undefined),
    attributeValueIds: parseArrayParam(params.attributeValueIds ?? undefined),
    minPrice: params.minPrice ?? undefined,
    maxPrice: params.maxPrice ?? undefined,
    stockStatus: params.stockStatus === 'instock' ? 'instock' : 'all',
    search: params.search,
    includeMainImage: params.includeMainImage ?? false,
    includeVariants: params.includeVariants ?? false,
    sortBy:
      params.sortBy && ['price_asc', 'price_desc', 'newest'].includes(params.sortBy)
        ? (params.sortBy as ProductParams['sortBy'])
        : undefined,
  };

  const categories = await getCategories({
    type: 'PRODUCT',
    includeThumbnailImage: true,
    includeChildren: true,
    childrenDepth: 3,
    includeOnlyTopLevel: true,
  });

  const { items: products, pager } = await getProducts(query);

  return (
    <>
      <CategoryChildrenGrid basePath="product-category" name="دسته‌بندی ها" categories={categories.items} />

      <div className="mb-6 flex flex-col gap-4 md:hidden">
        <div className="py-1 rounded-lg bg-muted shadow-base">
          <SearchInput />
        </div>
        <div className="flex gap-x-4">
          <MobileFilter totalCount={pager.totalCount} type="SHOP" />
          <MobileSortDrawer options={PRODUCT_SORT_OPTIONS} />
        </div>
      </div>
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)]  text-sm font-medium text-right gap-4">
        <SidebarFilters categories={categories.items.flatMap((cat: Category) => cat.children ?? [])} />
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <SortBar options={PRODUCT_SORT_OPTIONS} queryKey="sortBy" />
          <ProductListShop initialProducts={products} initialQuery={query} pager={pager} />
        </div>
      </div>
    </>
  );
}
