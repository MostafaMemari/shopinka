import { getFavorites } from '@/features/favorite/favoriteService';
import DashboardHeader from '@/features/profile/DashboardHeader';
import FavoriteActions from '@/features/profile/Favorite/FavoriteActions';
import PreviewCard from '@/features/profile/PreviewCard';

export default async function Page() {
  const res = await getFavorites({ page: 1, take: 20 });

  if (!res.success) return;

  const favorites = res.data.items;

  // const handleFavoriteToggle = (productId: number) => {
  //   // This function can be expanded to handle favorite toggling if needed
  // };

  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="علاقه‌مندی های شما" />
      </div>
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
    </>
  );
}
