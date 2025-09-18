import { Card, CardContent } from '@/components/ui/card';

interface PaymentDetailsProps {
  trackingCode: string;
  paymentDate: string;
  amount: string;
}

const PaymentDetails = ({ trackingCode, paymentDate, amount }: PaymentDetailsProps) => (
  <Card className="w-full border">
    <CardContent className="p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex flex-col items-center gap-1 text-sm md:text-base">
          <span className="text-muted-foreground">شماره پیگیری</span>
          <span className="font-mono tracking-wider">{trackingCode}</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-sm md:text-base">
          <span className="text-muted-foreground">تاریخ پرداخت</span>
          <span>{paymentDate}</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-sm md:text-base">
          <span className="text-muted-foreground">مبلغ</span>
          <span>{amount}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PaymentDetails;
