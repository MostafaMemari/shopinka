import { getProducts } from '@/features/products/productService';
import { loadSearchParams } from '@/lib/utils';
import { parseArrayParam } from '@/lib/utils';
import { SearchParams } from 'nuqs';
import SortBar from '@/features/filter/SortBar';
import MobileFilter from '@/features/filter/MobileFilter';
import MobileSortDrawer from '@/features/filter/MobileSortDrawer';
import { getCategories } from '@/features/categories/cartService';
import CategoryChildrenGrid from '@/features/categories/components/CategoryListGrid';
import ProductListShop from '@/features/shopPage/ProductListShop';
import SidebarFilters from '@/features/filter/SidebarFilters';
import SearchInput from '@/features/filter/SearchInput';
import { PRODUCT_SORT_OPTIONS, ProductParams } from '@/features/products/ProductType';
import CategoryOverview from '@/features/categories/components/CategoryOverview';

type PageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string[] }>;
};

export default async function ShopPage({ searchParams, params }: PageProps) {
  const queryParams = await loadSearchParams(searchParams);
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];

  const query: ProductParams = {
    page: queryParams.page ?? 1,
    take: queryParams.perPage ?? 10,
    hasDiscount: queryParams.hasDiscount ?? undefined,
    categoryIds: parseArrayParam(queryParams.categoryIds ?? undefined),
    attributeValueIds: parseArrayParam(queryParams.attributeValueIds ?? undefined),
    minPrice: queryParams.minPrice ?? undefined,
    maxPrice: queryParams.maxPrice ?? undefined,
    stockStatus: queryParams.stockStatus === 'instock' ? 'instock' : 'all',
    search: queryParams.search,
    includeMainImage: true,
    includeVariants: true,
    sortBy:
      queryParams.sortBy && ['price_asc', 'price_desc', 'newest'].includes(queryParams.sortBy)
        ? (queryParams.sortBy as ProductParams['sortBy'])
        : undefined,
  };

  const resCategory = await getCategories({
    type: 'PRODUCT',
    slug: lastSlug,
    includeOnlyTopLevel: false,
    includeThumbnailImage: true,
    includeChildren: true,
    childrenDepth: 3,
  });

  if (!resCategory.success) return;

  const resProduct = await getProducts({
    ...query,
    categoryIds: query.categoryIds ? query.categoryIds : [resCategory.data.items[0].id],
  });

  if (!resProduct.success) return;

  const { items: products, pager } = resProduct.data;

  const category = resCategory.data.items[0];

  return (
    <>
      <CategoryChildrenGrid name={category.name} basePath={`product-category/${category.slug}`} categories={category.children} />

      <div className="mb-4 flex flex-col gap-4 md:hidden">
        <SearchInput />
        <div className="flex items-center justify-center gap-x-4">
          <MobileFilter totalCount={pager.totalCount} categories={category.children} type="SHOP" />
          <MobileSortDrawer options={PRODUCT_SORT_OPTIONS} />
        </div>
      </div>
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
        <SidebarFilters categories={category.children} />
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <SortBar options={PRODUCT_SORT_OPTIONS} queryKey="sortBy" />
          <ProductListShop
            initialProducts={products}
            initialQuery={{
              ...query,
              categoryIds: query.categoryIds ? query.categoryIds : [category.id],
            }}
            pager={pager}
          />
        </div>
      </div>

      <CategoryOverview name={category.name} description={category.description || ''} thumbnailImage={category.thumbnailImage} />
    </>
  );
}
