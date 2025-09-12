'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, CreditCard, FileText } from 'lucide-react';
import React from 'react';

interface CheckoutProgressProps {
  currentStep: 'cart' | 'checkout' | 'payment';
}

interface Step {
  name: string;
  key: 'cart' | 'checkout' | 'payment';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep }) => {
  const steps: Step[] = [
    { name: 'سبد خرید', key: 'cart', icon: CheckCircle2 },
    { name: 'صورتحساب', key: 'checkout', icon: FileText },
    { name: 'پرداخت', key: 'payment', icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <Card className="col-span-12 p-0">
      <CardContent className="p-0">
        <ol className="grid grid-cols-3 rounded-xl overflow-hidden">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;

            return (
              <li
                key={step.key}
                className={`flex flex-col items-center justify-center gap-2 p-4 text-xs sm:text-sm md:text-base transition-colors ${
                  isCompleted ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                }`}
              >
                <step.icon className="h-6 w-6 md:h-8 md:w-8" />
                <p className="leading-none">{step.name}</p>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
};

export default CheckoutProgress;
