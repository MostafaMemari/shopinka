import CustomStickerBanner from '../banner/CustomStickerBanner';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

async function Header() {
  return (
    <header className="sticky top-0 z-50">
      <CustomStickerBanner />

      <div className="hidden md:block sticky top-0 z-50">
        <DesktopHeader />
      </div>

      <div className="md:hidden">
        <MobileHeader />
      </div>
    </header>
  );
}

export default Header;
