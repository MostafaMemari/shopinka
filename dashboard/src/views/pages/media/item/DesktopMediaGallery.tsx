import { Box } from '@mui/material'
import Image from 'next/image'
import Checkbox from '@mui/material/Checkbox'
import UpdateGalleryItemModal from './UpdateGalleryItemModal'
import DetailMediaModal from './DetailMediaModal'
import NoMediaMessage from '../NoMediaMessage'
import CreateMediaModal from './CreateMediaModal'
import { PermMedia } from '@mui/icons-material'
import { GalleryItem } from '@/types/gallery'

interface MediaGridProps {
  paginatedData: GalleryItem[]
  selected: string[]
  handleCheckboxChange: (id: string) => void
}

const MediaGrid = ({ paginatedData, selected, handleCheckboxChange }: MediaGridProps) => {
  return (
    <div className='p-6'>
      {paginatedData.length === 0 ? (
        <NoMediaMessage
          title='هیچ رسانه‌ای یافت نشد'
          subtitle='به نظر می‌رسه هیچ فایل رسانه‌ای در این بخش وجود نداره. می‌تونید رسانه‌های جدید آپلود کنید!'
          icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />}
        >
          <CreateMediaModal />
        </NoMediaMessage>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {paginatedData.map(item => {
            const isChecked = selected.includes(String(item.id))

            return (
              <div key={String(item.id)} className='relative'>
                <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2, display: 'flex', gap: 1 }}>
                  <Checkbox checked={isChecked} onChange={() => handleCheckboxChange(String(item.id))} size='small' />
                  <UpdateGalleryItemModal
                    initialData={{
                      ...item,
                      galleryId: String(item.galleryId)
                    }}
                    galleryItemId={String(item.id)}
                  />
                  <DetailMediaModal file={item} />
                </Box>

                <div className='relative w-full h-48'>
                  <Image
                    src={item.fileUrl}
                    alt={item.title}
                    fill
                    className={`object-cover rounded-lg ${isChecked ? 'border-4 border-blue-500' : 'border-none'}`}
                    sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw'
                    onClick={() => handleCheckboxChange(String(item.id))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MediaGrid
