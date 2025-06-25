import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Order } from '@/lib/types';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { Package, ArrowRight, IndianRupee } from 'lucide-react';

const Orders = async () => {
    const token = (await cookies()).get('accessToken')?.value;
    
    if (!token) {
        redirect('/login');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY}/orders/mine`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 30 }
    });

    if (!response.ok) {
        throw new Error('Error Fetching my order.');
    }

    const ordersData = (await response.json()) || [];
    
    const orders = ordersData.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return format(date, 'MMM dd, yyyy • hh:mm a');
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    };

    const getOrderStatusColor = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        switch (normalizedStatus) {
            case 'pending':
                return 'bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/30 dark:border-orange-500/50';
            case 'confirmed':
            case 'processing':
                return 'bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/30 dark:border-orange-500/50';
            case 'delivered':
            case 'completed':
                return 'bg-green-500/10 text-green-500 dark:text-green-400 border-green-500/30 dark:border-green-500/50';
            case 'cancelled':
                return 'bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/30 dark:border-red-500/50';
            default:
                return 'bg-gray-500/10 text-gray-500 dark:text-gray-300 border-gray-500/30 dark:border-gray-500/50';
        }
    };

    const getPaymentModeDisplay = (paymentMode: string) => {
        return paymentMode === 'cash' ? 'Cash on Delivery' : 'Card Payment';
    };

    const truncateId = (id: string) => {
        return `#${id.slice(-8).toUpperCase()}`;
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 overflow-hidden z-0">
            <div className="container mx-auto px-4 py-8 max-w-7xl relative z-20">
                <div className="mb-8 flex items-center gap-4">
                    <div className="bg-orange-500/20 p-3 rounded-lg">
                        <Package className="h-8 w-8 text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-orange-100">
                            My Orders
                        </h1>
                        <p className="mt-1 text-orange-100/60">
                            Track and manage your order history
                        </p>
                    </div>
                </div>

                <Card className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <CardHeader className="px-6 pt-6 pb-4 bg-gray-800/50 border-b border-gray-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-xl text-orange-100">
                                    Order History
                                </CardTitle>
                                <CardDescription className="mt-1 text-orange-300/70">
                                    {orders.length > 0 
                                        ? `${orders.length} order${orders.length > 1 ? 's' : ''} found`
                                        : 'No orders placed yet'
                                    }
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                        {orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                                <div className="bg-gray-800 rounded-full p-6 mb-6">
                                    <Package className="h-16 w-16 text-orange-500" />
                                </div>
                                <h3 className="text-xl font-medium text-orange-100 mb-2">
                                    No orders yet
                                </h3>
                                <p className="text-orange-200/70 max-w-md">
                                    When you place your first order, it will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table className="min-w-full">
                                    <TableHeader className="bg-gray-800/50">
                                        <TableRow className="border-b border-gray-800">
                                            <TableHead className="font-semibold text-orange-200 py-4 pl-6">
                                                Order ID
                                            </TableHead>
                                            <TableHead className="font-semibold text-orange-200">
                                                Date & Time
                                            </TableHead>
                                            <TableHead className="font-semibold text-orange-200">
                                                Payment
                                            </TableHead>
                                            <TableHead className="font-semibold text-orange-200">
                                                Status
                                            </TableHead>
                                            <TableHead className="font-semibold text-orange-200 text-right">
                                                Amount
                                            </TableHead>
                                            <TableHead className="font-semibold text-orange-200 text-center">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order: Order, index: number) => (
                                            <TableRow 
                                                key={order._id}
                                                className={`
                                                    border-b border-gray-800 transition-colors
                                                    hover:bg-gray-800/40
                                                    ${index === 0 ? 'bg-orange-900/10' : ''}
                                                `}
                                            >
                                                <TableCell className="font-medium text-orange-100 py-4 pl-6">
                                                    <span className="font-mono bg-gray-800 px-3 py-1 rounded-md">
                                                        {truncateId(order._id)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-sm text-orange-200/70">
                                                    {formatDate(order.createdAt)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-3 h-3 rounded-full ${
                                                            order.paymentMode === 'cash' 
                                                                ? 'bg-orange-500' 
                                                                : 'bg-orange-300'
                                                        }`}></div>
                                                        <span className="text-sm font-medium text-orange-200/80">
                                                            {getPaymentModeDisplay(order.paymentMode)}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getOrderStatusColor(order.orderStatus)}`}
                                                    >
                                                        {order.orderStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <IndianRupee className="h-4 w-4 text-orange-200/80" />
                                                        <span className="font-semibold text-orange-100">
                                                            {order.total.toLocaleString('en-IN')}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Link
                                                        href={`/order/${order._id}`}
                                                        className="inline-flex items-center justify-center gap-1 text-sm font-medium transition-colors
                                                        text-orange-500 hover:text-orange-400
                                                        px-3 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
                                                    >
                                                        Details
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Orders;