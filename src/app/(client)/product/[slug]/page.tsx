import { fetchProductBySlug, getProducts } from '@/service/productService';
import ProductDetailsView from '@/components/features/productDetails/views/ProductDetailsView';
import { notFound } from 'next/navigation';
import ProductTabs from '@/components/features/product/ProductTabs';
import MobileHeader from '@/components/features/productDetails/MobileProductHeader';
import CarouselProduct from '@/components/features/product/ProductCarousel';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const res = await fetchProductBySlug(params.slug);
  const product = res?.data;

  if (!product || res.status !== 200) {
    return {
      title: 'محصول پیدا نشد',
      description: 'محصول مورد نظر یافت نشد.',
      robots: 'noindex, nofollow',
    };
  }

  const seo = product.seoMeta;

  const title = seo?.title || product.name;
  const description = seo?.description || `خرید ${product.name} با بهترین قیمت از فروشگاه اینترنتی شاپینکا`;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const imageUrl = seo?.ogImageId ? product.mainImage?.fileUrl : product.mainImage?.fileUrl || 'https://shopinka.ir/default-og-image.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: seo?.canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: seo?.canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    robots: seo?.robotsTag || 'index, follow',
    keywords: seo.keywords?.replace(/[^آ-یa-zA-Z0-9،,\s\-]/g, ''),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const res = await fetchProductBySlug(slug);
  const product = res?.data;

  if (!product || res.status !== 200) return notFound();

  const lastCategory = product.categories?.[product.categories.length - 1];
  const categoryIds = lastCategory ? [lastCategory.id] : [];

  const discountProducts = await getProducts({ take: 14, categoryIds });

  return (
    <>
      <MobileHeader productId={product.id} />
      <ProductDetailsView product={product} />
      <CarouselProduct title="محصولات مرتبط" products={discountProducts.items} viewAllLink={`/shop?categoryIds=${categoryIds.join(',')}`} />
      <ProductTabs description={product?.description} specifications={product?.properties} productId={product.id} />
    </>
  );
}
