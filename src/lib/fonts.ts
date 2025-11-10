import localFont from 'next/font/local';

export const iranyekan = localFont({
  src: [
    { path: '../fonts/iranyekan/IRANYekan-Light.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/iranyekan/IRANYekan-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/iranyekan/IRANYekan-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/iranyekan/IRANYekan-DemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/iranyekan/IRANYekan-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-iranyekan',
  display: 'swap',
  preload: true,
});
