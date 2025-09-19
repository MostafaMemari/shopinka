import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="container pb-14 pt-18 lg:pt-36">{children} </main>
      <Footer />
    </>
  );
}
