export const revalidate = 60;

import { getProducts } from '@/features/products/productService';
import { getBlogs } from '@/features/blogs/blogsService';

import { getCategoryBySlug } from '@/features/categories/cartService';
import CategoryCirclesBanners from '@/features/categoryBanners';
import BannerSlider from '@/features/carousel/BannerSlider';
import CarouselBlog from '@/features/blogs/components/CarouselBlog';
import { getBanners } from '@/features/banners/bannersService';
import CarouselProduct from '@/features/products/components/ProductCarousel';
import AmazingProducts from '@/features/products/components/ProductCardAmazing/AmazingOffersCarousel';
import DomingoHeroWithSwiper from '@/features/heroSwiperBanner/DesignShowcase';

export default async function Home() {
  const [bannerts, discountProducts, newestProducts, blogs, categories] = await Promise.all([
    getBanners({ includeImage: true, isActive: true }),
    getProducts({ take: 14, hasDiscount: true }),
    getProducts({ take: 14, sortBy: 'newest' }),
    getBlogs({ take: 14 }),
    getCategoryBySlug('car-sticker'),
  ]);

  return (
    <>
      {/* {bannerts.success && (
        <div className="w-full max-w-screen-xl mx-auto">
          <BannerSlider
            mainSliderBanners={bannerts.data.items.filter((item) => item.type === 'MAIN_SLIDER')}
            sideBanners={bannerts.data.items.filter((item) => item.type === 'SIDE').slice(0, 2)}
          />
        </div>
      )} */}

      <DomingoHeroWithSwiper />

      {discountProducts.success && <AmazingProducts products={discountProducts.data.items} />}

      {discountProducts.success && (
        <CarouselProduct key="discount" title="فروش ویژه" products={discountProducts.data.items} viewAllLink="/shop?hasDiscount=true" />
      )}

      {newestProducts.success && (
        <CarouselProduct key="newest" title="جدیدترین محصولات" products={newestProducts.data.items} viewAllLink="/shop?sortBy=newest" />
      )}

      <CategoryCirclesBanners basePath={`/product-category/${categories.slug}`} categories={categories.children} />

      {blogs.success && <CarouselBlog title="آخرین مقالات" blogs={blogs.data.items} viewAllLink="/shop?sortBy=newest" />}
    </>
  );
}
