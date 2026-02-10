import { fetchProductBySlug, getProducts } from '@/features/products/productService';
import ProductDetailsView from '@/features/productDetails/views/ProductDetailsView';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generateProductMetadata } from './metadata';
import CarouselProduct from '@/features/products/components/ProductCarousel';
import ProductTabs from '@/features/products/components/ProductTabs';
import { buildProductJsonLd } from './productJsonLd';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateProductMetadata({ slug });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const res = await fetchProductBySlug(slug);

  if (!res.success || !res.data) notFound();

  const product = res.data;
  const jsonLd = buildProductJsonLd(product);

  const lastCategory = product.categories?.at(-1);
  const categoryIds = lastCategory ? [lastCategory.id] : [];

  const discountProducts = await getProducts({ take: 14, categoryIds });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <ProductDetailsView product={product} />

      {discountProducts.success && discountProducts.data?.items?.length > 0 && (
        <div className="mt-4">
          <CarouselProduct
            title="محصولات مرتبط"
            products={discountProducts.data.items}
            viewAllLink={`/shop?categoryIds=${categoryIds.join(',')}`}
          />
        </div>
      )}

      <div className="mt-4">
        <ProductTabs description={product.description} specifications={product.properties} productId={product.id} />
      </div>
    </>
  );
}
