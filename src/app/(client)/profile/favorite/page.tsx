import DashboardHeader from '@/features/profile/DashboardHeader';
import FavoriteActions from '@/features/profile/Favorite/FavoriteActions';

export default function Page() {
  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="علاقه‌مندی های شما" />
      </div>
      <FavoriteActions />
    </>
  );
}
