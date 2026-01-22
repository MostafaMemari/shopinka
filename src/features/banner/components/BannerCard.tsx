import Link from 'next/link';
import Image from '@/components/common/UnoptimizedImage';
import { BannerType } from '../bannerTypes';

interface Props {
  banner: BannerType;
  priority?: boolean;
}

export default function BannerCard({ banner, priority = false }: Props) {
  return (
    <Link href={banner.link} className="block overflow-hidden rounded-2xl shadow-md group">
      <div className="relative w-full aspect-[16/6] md:aspect-[16/5]">
        <Image
          src={banner.image}
          alt="بنر تبلیغاتی"
          fill
          priority={priority}
          className="object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      </div>
    </Link>
  );
}
