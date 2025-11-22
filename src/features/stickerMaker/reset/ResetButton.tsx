import { Button } from '@/components/ui/button';
import { resetStickerState } from '@/store/slices/stickerSlice';
import { RotateCcw } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';

function ResetButton() {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetStickerState());
  };

  return (
    <div className="flex justify-center py-4 w-12 mr-2">
      <Button variant="secondary" onClick={handleReset}>
        <RotateCcw />
      </Button>
    </div>
  );
}

export default ResetButton;
