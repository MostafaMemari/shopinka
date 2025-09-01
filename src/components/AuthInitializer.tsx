'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { checkAuth } from '@/store/slices/authSlice';

const AuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return null;
};

export default AuthInitializer;

// const { isLoading } = useSelector((state: RootState) => state.auth);

// if (isLoading) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
//       <div className="flex flex-col items-center space-y-4">
//         <Loader2 className={cn('h-16 w-16 animate-spin text-primary')} />
//         <p className="text-lg font-medium text-muted-foreground">در حال بارگذاری...</p>
//       </div>
//     </div>
//   );
// }
