import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MobileLayout from '@/components/common/MobileLayout/MobileLayout';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MobileLayout />
      <main className="container pb-14">
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </main>
      <Footer />
    </>
  );
}
