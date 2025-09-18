import OrderView from '@/features/orders/components/OrderView';
import React from 'react';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function page({ searchParams }: PageProps) {
  return <OrderView searchParams={searchParams} />;
}

export default page;
