import { FC } from 'react';
import Image from '@/components/common/UnoptimizedImage';
import { TrustBadge } from '@/data/footerData';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface Props {
  trustBadges: TrustBadge[];
}

const TrustBadges: FC<Props> = ({ trustBadges }) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:gap-6">
      {trustBadges?.map((trust) => (
        <Card key={trust.id} className="w-32 text-xs mx-auto">
          <div className="h-32 flex justify-center items-center">
            <Link
              href={trust.href}
              target="_blank"
              rel="nofollow noreferrer"
              className="flex flex-col justify-center items-center absolute transition-opacity duration-500 opacity-100"
            >
              <Image width={14} height={14} loading="lazy" className="w-auto h-14" src={trust.imageSrc} alt="" />
              <span className="text-stone-500 dark:text-stone-200 mt-4">{trust.name}</span>
              <span className="text-stone-500 dark:text-stone-200 mt-1">{trust.description}</span>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TrustBadges;
