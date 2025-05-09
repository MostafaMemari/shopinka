import { getGalleries } from '@/libs/api/gallery'
import GalleryView from '@/views/pages/media/GalleryView'

const Media = async () => {
  const res = await getGalleries()

  return <GalleryView data={res.data.items.flat()} />
}

export default Media
