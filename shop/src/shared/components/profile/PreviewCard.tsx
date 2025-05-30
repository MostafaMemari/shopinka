import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';

interface Favorite {
  id: string;
  image: string;
  title: string;
  link: string;
  isAvailable: boolean;
}

interface PreviewCardProps {
  favorite: Favorite;
  onDelete: (id: string) => void;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ favorite, onDelete }) => (
  <div className="border-gradient group relative rounded-base border p-px before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-base">
    <div className="relative rounded-xl bg-muted p-2 shadow-base md:p-5">
      <div className="mb-2 md:mb-5" draggable="false">
        <Link href={favorite.link}>
          <img alt={favorite.title} className="mx-auto w-32 rounded-lg md:w-auto" src={favorite.image} />
        </Link>
      </div>
      <div className="mb-2">
        <Link href={favorite.link} className="line-clamp-2 h-10 text-sm md:h-12 md:text-base">
          {favorite.title}
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className={`text-sm font-medium xs:text-base ${favorite.isAvailable ? 'text-primary' : 'text-red-500 dark:text-red-400'}`}>
          {favorite.isAvailable ? 'موجود' : 'ناموجود'}
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-red-500 transition-all duration-200 hover:bg-warning hover:text-gray-100 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-black"
          onClick={() => onDelete(favorite.id)}
        >
          <FaTrash className="h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
);

export default PreviewCard;
