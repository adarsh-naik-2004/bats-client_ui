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
                return 'bg-amber-500/10 text-amber-500 dark:text-amber-300 border-amber-500/30 dark:border-amber-500/50';
            case 'confirmed':
            case 'processing':
                return 'bg-blue-500/10 text-blue-500 dark:text-blue-300 border-blue-500/30 dark:border-blue-500/50';
            case 'delivered':
            case 'completed':
                return 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-300 border-emerald-500/30 dark:border-emerald-500/50';
            case 'cancelled':
                return 'bg-rose-500/10 text-rose-500 dark:text-rose-300 border-rose-500/30 dark:border-rose-500/50';
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
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg dark:bg-primary/20">
                    <Package className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        My Orders
                    </h1>
                    <p className="text-muted-foreground mt-1 dark:text-gray-400">
                        Track and manage your order history
                    </p>
                </div>
            </div>

            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden">
                <CardHeader className="px-6 pt-6 pb-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl text-gray-900 dark:text-white">
                                Order History
                            </CardTitle>
                            <CardDescription className="mt-1 dark:text-gray-400">
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
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-6">
                                <Package className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                                No orders yet
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md">
                                When you place your first order, it will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table className="min-w-full">
                                <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                                    <TableRow className="border-b border-gray-200 dark:border-gray-800">
                                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 pl-6">
                                            Order ID
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                                            Date & Time
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                                            Payment
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                                            Status
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-right">
                                            Amount
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-center">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order: Order, index: number) => (
                                        <TableRow 
                                            key={order._id}
                                            className={`
                                                border-b border-gray-200 dark:border-gray-800 transition-colors
                                                hover:bg-gray-50 dark:hover:bg-gray-800/40
                                                ${index === 0 ? 'bg-blue-50/20 dark:bg-blue-900/10' : ''}
                                            `}
                                        >
                                            <TableCell className="font-medium text-gray-900 dark:text-white py-4 pl-6">
                                                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md">
                                                    {truncateId(order._id)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(order.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        order.paymentMode === 'cash' 
                                                            ? 'bg-amber-500' 
                                                            : 'bg-indigo-500'
                                                    }`}></div>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                                                    <IndianRupee className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                                    <span className="font-semibold text-gray-900 dark:text-white">
                                                        {order.total.toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Link
                                                    href={`/order/${order._id}`}
                                                    className="inline-flex items-center justify-center gap-1 text-sm font-medium transition-colors
                                                    text-primary hover:text-primary/80 focus-visible:outline-none
                                                    px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
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
    );
};

export default Orders;