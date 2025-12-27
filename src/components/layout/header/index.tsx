import DesktopHeader from './DesktopHeader';

async function Header() {
  return (
    <header>
      <div className="hidden md:block sticky top-0 z-50">
        <DesktopHeader />
      </div>
    </header>
  );
}

export default Header;
