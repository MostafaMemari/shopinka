import { getFavorites } from '@/features/favorite/favoriteService';
import DashboardHeader from '@/features/profile/DashboardHeader';
import EmptyState from '@/features/profile/EmptyState';
import PreviewCard from '@/features/profile/PreviewCard';
import { HeartCrack } from 'lucide-react';

export default async function Page() {
  const res = await getFavorites({ page: 1, take: 20 });

  if (!res.success) return;

  const favorites = res.data.items;

  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="علاقه‌مندی های شما" />
      </div>

      {favorites.length === 0 ? (
        <EmptyState icon={<HeartCrack className="text-primary w-24 h-24" />} message="هیچ علاقه‌مندی پیدا نشد." />
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-1 gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((favorite) => (
            <PreviewCard
              key={favorite.id}
              name={favorite.product.name}
              imageUrl={favorite.product.mainImage.fileUrl}
              quantity={favorite.product.quantity}
              slug={favorite.product.slug}
            />
          ))}
        </div>
      )}
    </>
  );
}
