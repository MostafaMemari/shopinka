import { ApiResponse, shopApiFetch } from '@/service/api';

export interface CustomStickerPricingData {
  fontId: number;
  materialId: number;
  lines: {
    lineNumber: number;
    width: number;
    height: number;
  }[];
}

export const createCustomStickerProduct = async (data: {
  name: string;
  fontId: number;
  materialId: number;
  previewImageId: number;
  lines: {
    text: string;
    ratio: number;
    lineNumber: number;
    width: number;
    height: number;
  }[];
  style: 'normal' | 'italic';
  weight: 'regular' | 'bold';
  letterSpacing: number;
  description: string;
}): Promise<ApiResponse<{ message: string; customSticker: { id: number } }>> => {
  return await shopApiFetch('/custom-sticker', {
    method: 'POST',
    auth: true,
    body: { ...data, name: `برچسب ${data.lines.map((line) => line.text).join(' ')}` },
  });
};

const dataURLtoFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const uploadPreviewImage = async (imageDataUrl: string): Promise<ApiResponse<{ message: string; galleryItem: { id: number } }>> => {
  const file = dataURLtoFile(imageDataUrl, 'preview.webp');

  const formData = new FormData();
  formData.append('image', file);

  return await shopApiFetch('/gallery-item/custom-sticker-image', {
    method: 'POST',
    auth: true,
    body: formData,
  });
};

export const customStickerPricing = async (data: CustomStickerPricingData): Promise<ApiResponse<{ message: string; pricing: number }>> => {
  return await shopApiFetch('/custom-sticker/pricing', { method: 'POST', auth: true, body: { ...data } });
};
