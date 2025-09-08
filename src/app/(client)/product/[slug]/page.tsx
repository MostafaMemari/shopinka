import { fetchProductBySlug, getProducts } from '@/features/products/api';
import ProductDetailsView from '@/features/productDetails/views/ProductDetailsView';
import { notFound } from 'next/navigation';
import MobileHeader from '@/features/productDetails/MobileProductHeader';
import { Metadata } from 'next';
import { generateProductMetadata } from './metadata';
import CarouselProduct from '@/features/products/components/ProductCarousel';
import ProductTabs from '@/features/products/components/ProductTabs';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateProductMetadata({ slug });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) return notFound();

  const lastCategory = product.categories?.[product.categories.length - 1];
  const categoryIds = lastCategory ? [lastCategory.id] : [];

  const discountProducts = await getProducts({ take: 14, categoryIds });

  return (
    <>
      <MobileHeader productId={product.id} />
      <ProductDetailsView product={product} />
      <CarouselProduct
        title="محصولات مرتبط"
        products={discountProducts?.items}
        viewAllLink={`/shop?categoryIds=${categoryIds.join(',')}`}
      />
      <ProductTabs description={product?.description} specifications={product?.properties} productId={product.id} />
    </>
  );
}
