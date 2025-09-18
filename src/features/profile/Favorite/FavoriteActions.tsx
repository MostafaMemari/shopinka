'use client';

import PreviewCard from '../PreviewCard';
import { useFavorite } from '@/features/favorite/hooks/useFavorite';
import { useToggleFavorite } from '@/features/favorite/hooks/useToggleFavorite';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '../EmptyState';
import ErrorState from '../ErrorState';
import { HeartCrack } from 'lucide-react';

const FavoriteActions = () => {
  const { favoriteToggle, isToggleFavoriteLoading } = useToggleFavorite();

  const { data, isLoading, error } = useFavorite({
    params: { page: 1, take: 25 },
  });

  const favorites = data?.success ? data?.data.items : [];

  const handleFavoriteToggle = (productId: number) => {
    favoriteToggle(productId);
  };

  return (
    <>
      {' '}
      {isLoading || isToggleFavoriteLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorState message={error.message} />
      ) : favorites.length === 0 ? (
        <EmptyState icon={<HeartCrack className="w-full h-full" />} />
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-1 gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((favorite) => (
            <PreviewCard
              key={favorite.id}
              name={favorite.product.name}
              imageUrl={favorite.product.mainImage.fileUrl}
              quantity={favorite.product.quantity}
              slug={favorite.product.slug}
              onClick={() => handleFavoriteToggle(favorite.productId)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FavoriteActions;
