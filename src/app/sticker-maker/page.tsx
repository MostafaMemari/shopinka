import { getFonts } from '@/features/font/services/fontService';
import { getMaterialSticker } from '@/features/material-sticker/services/materialStickerService';
import ErrorState from '@/features/profile/ErrorState';
import StickerMakerView from '@/features/stickerMaker/StickerMakerView';

export default async function Page() {
  const [materialRes, fontRes] = await Promise.all([
    getMaterialSticker({ sortBy: 'displayOrder', sortDirection: 'asc' }),
    getFonts({ includeThumbnail: true, includeFile: true, sortBy: 'displayOrder', sortDirection: 'asc' }),
  ]);

  if (!fontRes.success || !materialRes.success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ErrorState message="خطا در دریافت اطلاعات..." />
      </div>
    );
  }

  return <StickerMakerView fontData={fontRes.data} materialData={materialRes.data} />;
}
