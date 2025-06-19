import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import OrderStatus from './components/orderStatus';
import { Separator } from '@/components/ui/separator';
import { Banknote, Coins, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import { Order } from '@/lib/types';

const SingleOrder = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const resolvedParams = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY}/orders/${resolvedParams.orderId}?fields=address,paymentStatus,paymentMode`,
    {
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')?.value}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Order Fetch Error:', response.status, errorText);
    throw new Error('Failed to fetch single order');
  }

  const order: Order = await response.json();

  return (
    <div className="container mt-6 flex flex-col gap-6 bg-[#0f0f0f] text-white min-h-screen pb-10">
      <Card className="bg-[#1a1a1a] border border-[#2a2a2a] shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Order</CardTitle>
          <CardDescription className="text-gray-400">
            Track the order status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrderStatus orderId={order._id} />
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-1/3 bg-[#1a1a1a] border border-[#2a2a2a]">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Delivery Address</CardTitle>
          </CardHeader>
          <Separator className="bg-gray-600" />
          <CardContent className="pt-6 text-sm">
            <h2 className="font-semibold">
              {order.customerId.firstName + ' ' + order.customerId.lastName}
            </h2>
            <p className="mt-2 text-gray-300">{order.address}</p>
          </CardContent>
        </Card>

        <Card className="lg:w-2/3 bg-[#1a1a1a] border border-[#2a2a2a]">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Your order information</CardTitle>
          </CardHeader>
          <Separator className="bg-gray-600" />
          <CardContent className="pt-6 space-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              <span className="font-medium text-white">Order reference:</span>
              {order._id}
            </div>

            <div className="flex items-center gap-2">
              <Banknote size={18} />
              <span className="font-medium text-white">Payment status:</span>
              {order.paymentStatus.toUpperCase()}
            </div>

            <div className="flex items-center gap-2">
              <Coins size={18} />
              <span className="font-medium text-white">Payment method:</span>
              {order.paymentMode.toUpperCase()}
            </div>

            <Button variant={'destructive'} className="mt-4">
              Cancel Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleOrder;
