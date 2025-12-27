import MobileBottomNav from '@/components/common/MobileLayout/MobileBottomNav';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="block md:hidden">
        <MobileBottomNav />
      </div>

      <main className="container pb-14 mt-2">
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </main>
      <Footer />
    </>
  );
}
