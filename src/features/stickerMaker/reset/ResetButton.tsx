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
    <div className="flex justify-center mb-2 w-12 mr-2 secondary:bg-white bg-white rounded-2xl shadow-md">
      <Button variant="ghost" onClick={handleReset}>
        <RotateCcw />
      </Button>
    </div>
  );
}

export default ResetButton;
