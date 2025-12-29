export const revalidate = 60;

import { getProducts } from '@/features/products/productService';
import { getBlogs } from '@/features/blogs/blogsService';

import { getCategoryBySlug } from '@/features/categories/cartService';
import CategoryCirclesBanners from '@/features/categoryBanners';
import CarouselBlog from '@/features/blogs/components/CarouselBlog';
import CarouselProduct from '@/features/products/components/ProductCarousel';
import AmazingProducts from '@/features/products/components/ProductCardAmazing/AmazingOffersCarousel';
import SwiperSlideExample from '@/components/common/swiper/SwiperSlide';
import { Card } from '@/components/ui/card';
import { AdBanner } from '@/components/common/AdBanner';
import FlashOfferCard from '@/components/layout/home/FlashOfferCard/FlashOfferCard';
import { generateFlashOffer } from '@/lib/flashOffers';

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

  const { flashOfferItems, mainProduct } = generateFlashOffer(allItems);

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <Card className="p-0 m-0">
              <SwiperSlideExample />
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-2">
            <FlashOfferCard
              title="پیشنهادات لحظه ای"
              subtitle="لذت بررسی و خرید آنلاین محصولات"
              items={flashOfferItems}
              mainProduct={mainProduct!}
            />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdBanner
              href="/products?tag=دنا"
              image="https://car.vimascript.ir/media/library/2025-01-14/1/file.1736852801.27717.webp"
              alt="دنا"
            />

            <AdBanner
              href="/products"
              image="https://car.vimascript.ir/media/library/2025-01-14/1/file.1736853057.14332.webp"
              alt="لوازم جلو بندی برلیانس h330"
            />
          </div>
        </div>

        {discountProducts.success && <AmazingProducts products={discountProducts.data.items} viewAllLink="/shop?hasDiscount=true" />}
        {discountProducts.success && (
          <CarouselProduct key="discount" title="فروش ویژه" products={discountProducts.data.items} viewAllLink="/shop?hasDiscount=true" />
        )}
        {newestProducts.success && (
          <CarouselProduct key="newest" title="جدیدترین محصولات" products={newestProducts.data.items} viewAllLink="/shop?sortBy=newest" />
        )}
        <CategoryCirclesBanners basePath={`/product-category/${categories.slug}`} categories={categories.children} />
        {blogs.success && <CarouselBlog title="آخرین مقالات" blogs={blogs.data.items} viewAllLink="/shop?sortBy=newest" />}
      </div>
    </>
  );
}
