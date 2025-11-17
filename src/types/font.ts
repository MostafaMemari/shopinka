export type fontType = {
  id: number;
  name: string;
  displayName: string;
  file: string;
  ratio?: number;
  isPersian: boolean;
  thumbnail: string | null;
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
