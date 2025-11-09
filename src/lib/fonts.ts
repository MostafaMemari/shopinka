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

export const vazir = localFont({
  src: '../fonts/lalezar/Lalezar-Regular.woff2',
  variable: '--font-vazir',
  display: 'swap',
});

export const dimaShekasteh = localFont({
  src: '../fonts/dimaShekasteh/DimaShekasteh.woff2',
  variable: '--font-dimaShekasteh',
  display: 'swap',
});

export const bTitrBold = localFont({
  src: '../fonts/bTitr/BTITRBD.woff2',
  variable: '--font-bTitrBold',
  display: 'swap',
});

export const bMorvaridBold = localFont({
  src: '../fonts/bMorvarid/BMORVARD.woff2',
  variable: '--font-BMorvaridBold',
  display: 'swap',
});

export const iranNastaliq = localFont({
  src: '../fonts/IranNastaliq/IranNastaliq.woff2',
  variable: '--font-iranNastaliq',
  display: 'swap',
});

export const farJadid = localFont({
  src: '../fonts/farJadid/FarJadid.woff2',
  variable: '--font-farJadid',
  display: 'swap',
});

export const shekasteh = localFont({
  src: '../fonts/shekasteh/Shekasteh.woff2',
  variable: '--font-shekasteh',
  display: 'swap',
});

export const dastnevis = localFont({
  src: '../fonts/dastnevis/Dastnevis.woff2',
  variable: '--font-dastnevis',
  display: 'swap',
});

export const digiSarvenaz = localFont({
  src: '../fonts/digiSarvenaz/DigiSarvenaz.woff2',
  variable: '--font-digiSarvenaz',
  display: 'swap',
});
