import CardBox from '@/features/profile/CardBox';
import { Heart, MapPin, ShoppingBag, UserCircle } from 'lucide-react';
interface UserAccountSectionProps {
  favoriteCount?: number;
  notificationCount?: number;
}

const items = [
  {
    href: '/profile/personal-info',
    icon: <UserCircle />,
    color: 'from-sky-400 via-sky-500 to-sky-600',
    title: 'تکمیل مشخصات',
    value: undefined,
  },
  {
    href: '/profile/favorite',
    icon: <Heart />,
    color: 'from-pink-400 via-rose-500 to-rose-600',
    title: 'علاقه‌مندی ها',
    value: undefined,
  },
  {
    href: '/profile/address',
    icon: <MapPin />,
    color: 'from-blue-400 via-blue-500 to-blue-600',
    title: 'آدرس ها',
    value: undefined,
  },
  {
    href: '/profile/orders',
    icon: <ShoppingBag />,
    color: 'from-green-400 via-green-500 to-green-600',
    title: 'سفارش ها',
    value: undefined,
  },
];

const UserAccountSection: React.FC<UserAccountSectionProps> = () => (
  <section className="mb-10">
    <h2 className="mb-8 flex items-center gap-x-4 text-xl font-semibold text-gray-700 dark:text-white">
      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
      حساب کاربری
    </h2>
    {/* <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4"> */}
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <CardBox key={item.href} icon={item.icon} color={item.color} title={item.title} value={item.value} href={item.href} />
      ))}
    </div>
  </section>
);

export default UserAccountSection;
