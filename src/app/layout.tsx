import ClientProvider from './ClientProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import Loading from './loading';
import ScrollToTop from '@/components/common/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import { bMorvaridBold, bTitrBold, dastnevis, digiSarvenaz, dimaShekasteh, iranNastaliq, iranyekan, shekasteh, vazir } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import './globals.css';
import './tailwind.css';

export const metadata = {
  title: {
    default: 'فروشگاه اینترنتی شاپینکا',
    template: 'شاپینکا - %s',
  },
  description:
    'خرید آنلاین انواع برچسب ماشین با طراحی خاص و کیفیت بالا از فروشگاه شاپینکا! انواع استیکر بدنه، شیشه، داخل خودرو، برچسب نوشته‌دار، اسپرت، خفن و فانتزی با امکان ارسال سریع، قیمت مناسب و قابلیت سفارشی‌سازی.',
};

export const viewport = {
  maximumScale: 1, // جلوگیری از زوم
  interactiveWidget: 'resizes-content' as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dir = 'rtl';
  const lang = 'fa';

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body
        className={cn(
          iranyekan.variable,
          vazir.variable,
          dimaShekasteh.variable,
          bTitrBold.variable,
          iranNastaliq.variable,
          shekasteh.variable,
          dastnevis.variable,
          digiSarvenaz.variable,
          bMorvaridBold.variable,
          'antialiased',
        )}
      >
        <NextTopLoader showSpinner={false} color="#b22222" />

        <Toaster />

        <Suspense>
          <ScrollToTop />
        </Suspense>
        <ClientProvider>
          <div className="flex min-h-screen flex-col">
            <NuqsAdapter>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </NuqsAdapter>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
