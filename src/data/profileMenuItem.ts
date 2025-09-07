import { Home, ShoppingBag, Heart, MapPin, User } from 'lucide-react';

export const profileMenuItem = [
  { href: '/profile', icon: Home, label: 'پیشخوان' },
  { href: '/profile/orders', icon: ShoppingBag, label: 'سفارش ها' },
  { href: '/profile/favorite', icon: Heart, label: 'علاقه‌مندی ها' },
  { href: '/profile/address', icon: MapPin, label: 'آدرس ها' },
  {
    href: '/profile/personal-info',
    icon: User,
    label: 'حساب کاربری',
  },
];
