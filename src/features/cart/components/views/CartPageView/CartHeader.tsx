import { Trash2 } from 'lucide-react';

export default function CartHeader({ itemsCount, onClearClick }: { itemsCount: number; onClearClick: () => void }) {
  return (
    <div className="flex items-center justify-between pb-4">
      <h1 className="flex items-center gap-2">
        سبد خرید
        <span className="text-text/60">( {itemsCount} کالا )</span>
      </h1>

      <button className="btn-red-nobg flex items-center gap-2" onClick={onClearClick}>
        <Trash2 className="w-5 h-5" />
        حذف همه
      </button>
    </div>
  );
}
