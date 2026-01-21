export interface FlashOfferResult {
  flashOfferItems: FlashProductOffer[];
  mainProduct: FlashProductOffer | null;
}

export type FlashProductOffer = {
  id: string | number;
  title: string;
  price?: number;
  image: string;
  href: string;
};
