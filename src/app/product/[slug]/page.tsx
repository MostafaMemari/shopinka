import { fetchProductBySlug, getProducts } from '@/features/products/productService';
import ProductDetailsView from '@/features/productDetails/views/ProductDetailsView';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generateProductMetadata } from './metadata';
import CarouselProduct from '@/features/products/components/ProductCarousel';
import ProductTabs from '@/features/products/components/ProductTabs';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return await generateProductMetadata({ slug });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const res = await fetchProductBySlug(slug);

  if (!res.success) return;

  if (!res.data) return notFound();

  const product = res.data;

  const lastCategory = product.categories?.[product.categories.length - 1];
  const categoryIds = lastCategory ? [lastCategory.id] : [];

  const discountProducts = await getProducts({ take: 14, categoryIds });

  return (
    <>
      <ProductDetailsView product={product} />

      <div className="mt-4">
        {discountProducts.success && (
          <CarouselProduct
            title="محصولات مرتبط"
            products={discountProducts?.data.items}
            viewAllLink={`/shop?categoryIds=${categoryIds.join(',')}`}
          />
        )}
      </div>

      <div className="mt-4">
        <ProductTabs description={product?.description} specifications={product?.properties} productId={product.id} />
      </div>
    </>
  );
}
