import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
// import MobileLayout from '@/components/common/MobileLayout/MobileLayout';
import { AuthGuard } from '@/auth/guard/auth-guard';
import CustomStickerBanner from '@/components/layout/banner/CustomStickerBanner';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <div className="fixed left-0 right-0 top-0 z-30" style={{ height: '100px' }}>
        <CustomStickerBanner />
      </div>
      <Header />
      {/* <MobileLayout showHeader={true} showNav={false} /> */}

      <main className="pb-14 pt-24 lg:pt-52">
        <div className="container">
          <div className="relative">
            <div className="grid grid-cols-12 gap-2">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </AuthGuard>
  );
}
