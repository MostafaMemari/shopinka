import { ShieldCheck } from 'lucide-react';
import React from 'react';

function ProductGuaranteeBadge() {
  return (
    <div className="mb-6 flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 text-sm text-primary">
      <ShieldCheck className="h-6 w-6" />
      تضمین سلامت فیزیکی و اصالت کالا
    </div>
  );
}

export default ProductGuaranteeBadge;
