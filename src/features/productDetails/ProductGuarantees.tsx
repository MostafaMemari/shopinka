'use client';

import { ShieldCheck, Clock, Phone, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const guarantees = [
  {
    icon: Clock,
    text: 'هفت روز ضمانت بازگشت کالا',
  },
  {
    icon: ShieldCheck,
    text: 'تضمین اصالت کالا',
  },
  {
    icon: Phone,
    text: 'هفت روز هفته',
  },
  {
    icon: Zap,
    text: 'تحویل اکسپرس در تهران، کرج',
  },
];

export default function ProductGuarantees() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
      {guarantees.map((item, index) => (
        <Card key={index} className="border rounded-xl py-2">
          <CardContent className="flex items-center gap-x-3 p-2 text-sm text-muted-foreground">
            <item.icon className="h-6 w-6 text-primary" />
            <span>{item.text}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
