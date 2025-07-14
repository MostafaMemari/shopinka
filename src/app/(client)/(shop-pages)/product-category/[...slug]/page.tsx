import { getProducts } from '@/service/productService';
import { loadSearchParams } from '@/utils/loadSearchParams';
import { parseArrayParam } from '@/utils/parseArrayParam';
import { PRODUCT_SORT_OPTIONS, ProductParams } from '@/types/productType';
import { SearchParams } from 'nuqs';
import SortBar from '@/components/features/filter/SortBar';
import MobileFilter from '@/components/features/filter/MobileFilter';
import MobileSortDrawer from '@/components/features/filter/MobileSortDrawer';
import { getCategories } from '@/service/categoryService';
import CategoryChildrenGrid from '@/components/features/category/CategoryChildrenGrid';
import CategoryHeaderSection from '@/components/features/category/CategoryHeaderSection';
import ProductListShop from '@/components/features/shopPage/ProductListShop';
import SidebarFilters from '@/components/features/filter/SidebarFilters';
import SearchInput from '@/components/features/filter/SearchInput';

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

  const { items } = await getCategories({
    type: 'PRODUCT',
    slug: lastSlug,
    includeOnlyTopLevel: false,
    includeThumbnailImage: true,
    includeChildren: true,
    childrenDepth: 3,
  });

  const category = items[0];

  const { items: products, pager } = await getProducts({
    ...query,
    categoryIds: query.categoryIds ? query.categoryIds : [category.id],
  });

  return (
    <>
      <CategoryChildrenGrid name={category.name} basePath={`product-category/${category.slug}`} categories={category.children} />

      <div className="mb-4 flex flex-col gap-4 md:hidden">
        <div className="rounded-lg bg-muted shadow-base">
          <SearchInput />
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <MobileFilter totalCount={pager.totalCount} categories={category.children} type="SHOP" />
          <MobileSortDrawer />
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

      <CategoryHeaderSection name={category.name} description={category.description || ''} thumbnailImage={category.thumbnailImage} />
    </>
  );
}
