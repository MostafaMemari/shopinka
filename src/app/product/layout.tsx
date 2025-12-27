import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MobileHeader from '@/features/productDetails/MobileProductHeader';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />

      <main className="container pb-14 mt-2">{children}</main>
      <Footer />
    </>
  );
}
