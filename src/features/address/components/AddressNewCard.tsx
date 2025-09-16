import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface AddressNewCardProps {
  onClick?: () => void;
}

const AddressNewCard: React.FC<AddressNewCardProps> = ({ onClick }) => {
  return (
    <Card
      className={cn('border p-4 transition-all cursor-pointer', 'dark:bg-gray-800 dark:border-gray-700')}
      tabIndex={0}
      role="button"
      onClick={onClick}
    >
      <CardContent className={cn('flex flex-col items-center justify-center gap-2 h-full', 'text-muted-foreground')}>
        <Plus size={24} />
        <span className="text-sm">افزودن آدرس جدید</span>
      </CardContent>
    </Card>
  );
};

export default AddressNewCard;
