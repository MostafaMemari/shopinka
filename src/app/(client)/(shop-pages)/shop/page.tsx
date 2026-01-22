import { getProducts } from '@/features/products/productService';
import { loadSearchParams } from '@/lib/utils';
import { parseArrayParam } from '@/lib/utils';
import { SearchParams } from 'nuqs';
import SearchInput from '@/features/filter/SearchInput';
import SortBar from '@/features/filter/SortBar';
import MobileFilter from '@/features/filter/MobileFilter';
import MobileSortDrawer from '@/features/filter/MobileSortDrawer';
import { getCategories } from '@/features/categories/cartService';
import CategoryChildrenGrid from '@/features/categories/components/CategoryListGrid';
import ProductListShop from '@/features/shopPage/ProductListShop';
import SidebarFilters from '@/features/filter/SidebarFilters';
import { Category } from '@/features/categories/CategoryType';
import { PRODUCT_SORT_OPTIONS, ProductParams } from '@/features/products/ProductType';

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

  const resCategory = await getCategories({
    type: 'PRODUCT',
    includeThumbnailImage: true,
    includeChildren: true,
    childrenDepth: 3,
    includeOnlyTopLevel: true,
  });

  const resProduct = await getProducts(query);

  if (!resProduct.success || !resCategory.success) return;

  const { items: products, pager } = resProduct.data;

  return (
    <>
      <CategoryChildrenGrid basePath="product-category" name="دسته‌بندی ها" categories={resCategory.data.items} />

      <div className="mb-6 flex flex-col gap-4 md:hidden">
        <SearchInput />
        <div className="flex gap-x-4">
          <MobileFilter totalCount={pager.totalCount} type="SHOP" />
          <MobileSortDrawer options={PRODUCT_SORT_OPTIONS} />
        </div>
      </div>
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)]  text-sm font-medium text-right gap-4">
        <SidebarFilters categories={resCategory.data.items.flatMap((cat: Category) => cat.children ?? [])} />
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <SortBar options={PRODUCT_SORT_OPTIONS} queryKey="sortBy" />
          <ProductListShop initialProducts={products} initialQuery={query} pager={pager} />
        </div>
      </div>
    </>
  );
}
