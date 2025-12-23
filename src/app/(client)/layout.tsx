import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MobileLayout from '@/components/common/MobileLayout/MobileLayout';
import CustomStickerBanner from '@/components/layout/banner/CustomStickerBanner';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-30" style={{ height: '100px' }}>
        <CustomStickerBanner />
      </div>
      <Header />
      <MobileLayout />
      <main className="container pb-14 pt-26 md:pt-52">
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </main>
      <Footer />
    </>
  );
}
