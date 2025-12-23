import CustomStickerBanner from '@/components/layout/banner/CustomStickerBanner';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-30" style={{ height: '100px' }}>
        <CustomStickerBanner />
      </div>
      <Header />
      <main className="container pb-14 pt-26 md:pt-50">{children} </main>
      <Footer />
    </>
  );
}
