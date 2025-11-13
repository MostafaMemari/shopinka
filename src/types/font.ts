export type fontType = {
  title: string;
  isPersian: boolean;
  code: string;
  alias: string;
  isPremium: boolean;
  price: number;
  isThick: boolean;
  isOutline: boolean;
  isUserFont: boolean;
  name: string;
  tags: string;
  priority: number;
  id: string;
  thumbnail: string;
};

export interface FontItemType {
  id: string;
  name: string;
  title: string;
  alias: string;
  code: string;
  isPremium: boolean;
  price: number;
  tags: string;
  isPersian: boolean;
  thumbnail: string;
  isThick: boolean;
  isOutline: boolean;
  isUserFont: boolean;
  priority: number;
  useInSuggestion: boolean;
  fallbackFont: boolean;
  base64Content?: string;
  boldBase64Content?: string;
}
