'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { blogSwiperConfig } from '@/config/swiper';
import { BlogItem } from '@/features/blogs/BlogType';
import BlogCard from './BlogCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';
import { ChevronLeft, FileText } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from '@/components/ui/button';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse relative overflow-hidden">
      <div className="flex space-x-2 rtl:space-x-reverse" style={{ gap: `${10}px` }}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="w-72 h-60 bg-gray-200 rounded-lg p-4 flex-shrink-0">
            <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CarouselBlogProps {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  blogs: BlogItem[];
}

const CarouselBlog: FC<CarouselBlogProps> = ({ title, viewAllLink, viewAllText = 'مشاهده همه', blogs }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="mx-auto relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium md:text-xl lg:text-2xl">{title}</h3>
        <Link
          href={viewAllLink}
          className="flex items-center gap-2 py-2 text-sm text-primary hover:text-blue-800 transition-colors lg:text-base"
        >
          {viewAllText}
          <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
        </Link>
      </div>
      {blogs && blogs.length > 0 ? (
        <div className="relative overflow-hidden">
          {!isMounted && <SkeletonLoader />}
          <Swiper
            slidesPerView={blogSwiperConfig.slidesPerView}
            spaceBetween={blogSwiperConfig.spaceBetween}
            breakpoints={blogSwiperConfig.breakpoints}
            className="blog-carousel"
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation]}
            style={{ direction: 'rtl' }}
            onInit={() => setIsMounted(true)}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev absolute top-1/2 -left-4 z-10 -translate-y-1/2 after:text-sm after:text-gray-600" />
            <div className="swiper-button-next absolute top-1/2 -right-4 z-10 -translate-y-1/2 after:text-sm after:text-gray-600" />
          </Swiper>
        </div>
      ) : (
        <div className="flex justify-center py-10">
          <div className="max-w-sm text-center border-gray-200">
            <div className="flex flex-col items-center gap-4">
              <FileText className="w-16 h-16 text-gray-300" />
              <h3 className="text-lg font-semibold">هیچ مقاله‌ای یافت نشد</h3>
              <p className="text-sm text-gray-500">به نظر می‌رسد هنوز مقاله‌ای برای نمایش وجود ندارد.</p>
              <Link href="/blogs" passHref>
                <Button variant="default">مشاهده همه بلاگ‌ها</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselBlog;
