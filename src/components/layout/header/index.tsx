import DesktopLogo from '../../common/Logo/DesktopLogo';
import ProfileDropdown from './ProfileDropdown';
import SearchBarBase from './Search/SearchBar';
import BasketDropdown from '../../../features/cart/components/views/CartBasket/BasketDropdown';
import DesktopNavbar from './DesktopNavbar';
import { getCategoriesCatch } from '@/features/categories/cartService';
import CustomStickerBanner from '../banner/CustomStickerBanner';

async function Header() {
  const categories = (
    await getCategoriesCatch({
      includeChildren: true,
      type: 'PRODUCT',
      includeOnlyTopLevel: true,
    })
  ).items;

  return (
    <header className="hidden md:block sticky top-0 z-50">
      <CustomStickerBanner />

      <div className="bg-white shadow-sm">
        <div className="container z-30 flex items-center justify-between gap-x-4 py-4">
          <div className="flex items-center gap-x-6">
            <DesktopLogo />
            <SearchBarBase />
          </div>
          <div className="flex items-center gap-x-3">
            <ProfileDropdown />
            <div className="h-6 w-px bg-gray-300" />
            <BasketDropdown />
          </div>
        </div>
      </div>
      <DesktopNavbar categories={categories} />
    </header>
  );
}

export default Header;
