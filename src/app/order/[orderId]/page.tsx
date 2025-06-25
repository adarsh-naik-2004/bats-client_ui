import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import OrderStatus from './components/orderStatus';
import { Separator } from '@/components/ui/separator';
import { Banknote, Coins, LayoutDashboard, Calendar, MessageCircle, ShoppingBasket, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { format } from 'date-fns';

interface Accessory {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface PriceConfiguration {
  [key: string]: string;
}

interface ChosenConfiguration {
  priceConfiguration: PriceConfiguration;
  selectedAccessorys: Accessory[];
}

interface CartItem {
  _id: string;
  name: string;
  image: string;
  qty: number;
  chosenConfiguration: ChosenConfiguration;
}

interface Customer {
  firstName: string;
  lastName: string;
  _id: string;
}

interface Order {
  _id: string;
  cart: CartItem[];
  address: string;
  paymentStatus: string;
  paymentMode: string;
  total: number;
  taxes: number;
  deliveryCharges: number;
  discount: number;
  createdAt: string;
  comment?: string;
  orderStatus: string;
  customerId: Customer;
}

const SingleOrder = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const resolvedParams = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY}/orders/${resolvedParams.orderId}?fields=cart,address,paymentStatus,paymentMode,total,createdAt,comment,orderStatus,customerId`,
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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy • hh:mm a');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div className="container mt-6 flex flex-col gap-6 bg-gray-900 text-white min-h-screen pb-10">
      <Card className="bg-gray-800 border border-orange-500/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-orange-300">Order</CardTitle>
          <CardDescription className="text-orange-100/60">
            Track the order status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrderStatus orderId={order._id} />
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          {/* Order Items Card */}
          <Card className="bg-gray-800 border border-orange-500/20">
            <CardHeader className="p-4">
              <CardTitle className="text-lg text-orange-300 flex items-center gap-2">
                <ShoppingBasket className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <Separator className="bg-orange-500/30" />
            <CardContent className="pt-6">
              <div className="space-y-4">
                {order.cart.map((item: CartItem, index: number) => (
                  <div 
                    key={index} 
                    className="flex border-b border-gray-700 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-gray-700 border border-gray-600 rounded-lg p-1">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-orange-100">{item.name}</h3>
                      
                      {item.chosenConfiguration.selectedAccessorys.length > 0 && (
                        <div className="mt-1 text-sm text-orange-200/80">
                          <span className="font-medium">Accessories:</span> {' '}
                          {item.chosenConfiguration.selectedAccessorys
                            .map(acc => acc.name)
                            .join(', ')}
                        </div>
                      )}
                      
                      <div className="mt-1 flex flex-wrap gap-2">
                        {Object.entries(item.chosenConfiguration.priceConfiguration).map(
                          ([key, value]) => (
                            <span 
                              key={key} 
                              className="px-2 py-1 bg-gray-700/50 text-xs rounded"
                            >
                              {key}: {value}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-orange-100 font-medium">
                        {item.qty} ×
                      </div>
                      <div className="mt-1 text-sm text-orange-200/80">
                        Item{item.qty > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-orange-500/20">
            <CardHeader className="p-4">
              <CardTitle className="text-lg text-orange-300">Delivery Address</CardTitle>
            </CardHeader>
            <Separator className="bg-orange-500/30" />
            <CardContent className="pt-6 text-sm">
              <h2 className="font-semibold text-orange-100">
                {order.customerId.firstName + ' ' + order.customerId.lastName}
              </h2>
              <p className="mt-2 text-orange-200/80">{order.address}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <Card className="bg-gray-800 border border-orange-500/20">
            <CardHeader className="p-4">
              <CardTitle className="text-lg text-orange-300">Order Information</CardTitle>
            </CardHeader>
            <Separator className="bg-orange-500/30" />
            <CardContent className="pt-6 space-y-4 text-sm text-orange-200/80">
              <div className="flex items-center gap-2">
                <LayoutDashboard size={18} className="text-orange-400" />
                <span className="font-medium text-orange-100">Order ID:</span>
                <span className="truncate">{order._id}</span>
              </div>

              <div className="flex items-center gap-2">
                <Package size={18} className="text-orange-400" />
                <span className="font-medium text-orange-100">Status:</span>
                <span className="capitalize">{order.orderStatus}</span>
              </div>

              <div className="flex items-center gap-2">
                <Banknote size={18} className="text-orange-400" />
                <span className="font-medium text-orange-100">Payment status:</span>
                <span className="capitalize">{order.paymentStatus}</span>
              </div>

              <div className="flex items-center gap-2">
                <Coins size={18} className="text-orange-400" />
                <span className="font-medium text-orange-100">Payment method:</span>
                <span className="uppercase">{order.paymentMode}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-orange-400" />
                <span className="font-medium text-orange-100">Order date:</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-orange-100">Subtotal:</span>
                  <span>₹{order.total - order.taxes - order.deliveryCharges + order.discount}</span>
                </div>
                
                {order.discount > 0 && (
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-medium text-orange-100">Discount:</span>
                    <span className="text-green-400">-₹{order.discount}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium text-orange-100">Taxes:</span>
                  <span>₹{order.taxes}</span>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium text-orange-100">Delivery:</span>
                  <span>₹{order.deliveryCharges}</span>
                </div>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
                  <span className="font-medium text-lg text-orange-100">Total:</span>
                  <span className="font-bold text-lg">₹{order.total}</span>
                </div>
              </div>

              {order.comment && (
                <div className="pt-4 mt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={18} className="text-orange-400" />
                    <span className="font-medium text-orange-100">Your note:</span>
                  </div>
                  <p className="mt-2 p-3 bg-gray-700/30 rounded-lg">
                    {order.comment}
                  </p>
                </div>
              )}

              <Button 
                variant="destructive" 
                className="mt-6 w-full bg-orange-600 hover:bg-orange-700"
                disabled={order.orderStatus === 'cancelled' || order.orderStatus === 'delivered'}
              >
                {order.orderStatus === 'cancelled' ? 'Order Cancelled' : 'Cancel Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;