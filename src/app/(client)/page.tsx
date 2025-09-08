import { getProducts } from '@/features/products/api';
import { getBlogs } from '@/features/blogs/api';

import { getCategoryBySlug } from '@/features/categories/api';
import CategoryCirclesBanners from '@/features/categoryBanners';
import BannerSlider from '@/features/carousel/BannerSlider';
import CarouselBlog from '@/features/blogs/components/CarouselBlog';
import { getBanners } from '@/features/banners/api';
import CarouselProduct from '@/features/products/components/ProductCarousel';

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
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[400px]" />

      <div className="w-full max-w-screen-xl mx-auto">
        <BannerSlider
          mainSliderBanners={bannerts.items.filter((item) => item.type === 'MAIN_SLIDER')}
          sideBanners={bannerts.items.filter((item) => item.type === 'SIDE').slice(0, 2)}
        />
      </div>

      {/* <DesignShowcase /> */}

      <CarouselProduct key="discount" title="فروش ویژه" products={discountProducts.items} viewAllLink="/shop?hasDiscount=true" />
      <CarouselProduct key="newest" title="جدیدترین محصولات" products={newestProducts.items} viewAllLink="/shop?sortBy=newest" />
      <CategoryCirclesBanners basePath={`/product-category/${categories.slug}`} categories={categories.children} />
      <CarouselBlog title="آخرین مقالات" blogs={blogs.items} viewAllLink="/shop?sortBy=newest" />
    </>
  );
}
