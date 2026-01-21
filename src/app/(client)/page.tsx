export const revalidate = 60;

import { getProducts } from '@/features/products/productService';
import { getBlogs } from '@/features/blogs/blogsService';

import { getCategoryBySlug } from '@/features/categories/cartService';
import CategoryCirclesBanners from '@/features/categoryBanners';
import CarouselBlog from '@/features/blogs/components/CarouselBlog';
import CarouselProduct from '@/features/products/components/ProductCarousel';
import AmazingProducts from '@/features/products/components/ProductCardAmazing/AmazingOffersCarousel';
import { AdBanner } from '@/components/common/AdBanner';
import FlashOfferCard from '@/features/flash-offer/components/FlashOfferCard';
import { generateFlashOffer } from '@/lib/flashOffers';
import BannerRow from '@/features/banner/components/BannerRow';
import HeroSlider from '@/features/banner/components/HeroSlider';
import FlashOfferSection from '@/features/flash-offer/components/FlashOfferSection';

export default async function Home() {
  const [discountProducts, newestProducts, blogs, categories] = await Promise.all([
    getProducts({ take: 14, hasDiscount: true }),
    getProducts({ take: 14, sortBy: 'newest' }),
    getBlogs({ take: 14 }),
    getCategoryBySlug('car-sticker'),
  ]);

  const allItems = [
    ...(discountProducts.success ? discountProducts.data.items : []),
    ...(newestProducts.success ? newestProducts.data.items : []),
  ];

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <HeroSlider />
          </div>

          <div className="lg:col-span-4 space-y-2">
            <FlashOfferSection products={allItems} />
          </div>
        </div>

        <BannerRow />

        {discountProducts.success && <AmazingProducts products={discountProducts.data.items} viewAllLink="/shop?hasDiscount=true" />}

        {newestProducts.success && (
          <CarouselProduct key="newest" title="جدیدترین محصولات" products={newestProducts.data.items} viewAllLink="/shop?sortBy=newest" />
        )}

        <CategoryCirclesBanners basePath={`/product-category/${categories.slug}`} categories={categories.children} />

        {blogs.success && <CarouselBlog title="آخرین مقالات" blogs={blogs.data.items} viewAllLink="/shop?sortBy=newest" />}
      </div>
    </>
  );
}
