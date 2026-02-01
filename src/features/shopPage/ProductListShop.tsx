'use client';

import { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingDots from '@/features/shopPage/LoadingDots';
import Pagination from '@/features/shopPage/shop/Pagination';
import { Pager } from '@/types/pagerType';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../products/components/ProductCard';
import { getProducts } from '../products/productService';
import { Product, ProductParams } from '../products/ProductType';

interface ProductListShopProps {
  initialProducts: Product[];
  initialQuery: ProductParams;
  pager: Pager;
}

export default function ProductListShop({ initialProducts, initialQuery, pager }: ProductListShopProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(pager.currentPage);
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get('page');

  const isPageQueryPresent = Boolean(pageQuery);

  const [hasMore, setHasMore] = useState(!isPageQueryPresent && pager.hasNextPage && page < 10);
  const [showPagination, setShowPagination] = useState(isPageQueryPresent || page >= 10);

  useEffect(() => {
    setProducts(initialProducts);
    setPage(pager.currentPage);
    setHasMore(!isPageQueryPresent && pager.hasNextPage && pager.currentPage < 10);
    setShowPagination(isPageQueryPresent || pager.currentPage >= 10);
  }, [initialProducts, pager.currentPage, pager.hasNextPage, isPageQueryPresent]);

  const fetchMore = useCallback(async () => {
    try {
      const nextPage = page + 1;
      const res = await getProducts({
        ...initialQuery,
        page: nextPage,
        take: initialQuery.take ?? 20,
      });

      if (res.success) {
        const { items: newProducts, pager: newPager } = res.data;

        setProducts((prev) => {
          const all = [...prev, ...newProducts];
          const unique = Array.from(new Map(all.map((p) => [p.id, p])).values());
          return unique;
        });

        setPage(nextPage);

        if (!newPager.hasNextPage || nextPage >= 10) {
          setHasMore(false);
          setShowPagination(true);
        }
      }
    } catch {
      setHasMore(false);
      setShowPagination(true);
    }
  }, [page, initialQuery]);

  return (
    <>
      {hasMore ? (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={products.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<LoadingDots />}
        >
          <div className="grid grid-cols-2 gap-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="grid grid-cols-2 gap-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {showPagination && <Pagination totalPages={pager.totalPages} currentPage={page} />}
    </>
  );
}
