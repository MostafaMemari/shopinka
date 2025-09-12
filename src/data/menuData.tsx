import { BookA, MessageCircle, PhoneCall, ShoppingBag, Home, Heart, User } from 'lucide-react';

export interface MenuItem {
  id: number;
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: { id: number; name: string; href: string }[];
  color?: { light: string; dark: string };
}

export interface ProfileMenuItem {
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: React.ReactNode;
}

export const navigationMenuItems = [
  { title: 'فروشگاه', href: '/shop', icon: ShoppingBag, isActive: true },
  { title: 'بلاگ', href: '/blog', icon: BookA },
  { title: 'سوال دارید', href: '/faq', icon: MessageCircle },
  { title: 'تماس با ما', href: '/contact', icon: PhoneCall },
];

export const profileMenuItems = [
  { href: '/profile', icon: Home, label: 'پیشخوان' },
  { href: '/profile/orders', icon: ShoppingBag, label: 'سفارش ها' },
  { href: '/profile/favorite', icon: Heart, label: 'علاقه‌مندی ها' },
  {
    href: '/profile/personal-info',
    icon: User,
    label: 'حساب کاربری',
  },
];

export const specialSaleMenuItem: MenuItem = {
  id: 1,
  name: 'فروش ویژه',
  href: '/shop?hasDiscount=true',
  color: { light: '#ef4444', dark: '#f87171' },
};
