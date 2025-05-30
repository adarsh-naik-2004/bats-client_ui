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
import React from 'react';
import { format } from 'date-fns';

const Orders = async () => {
    const token = (await cookies()).get('accessToken')?.value;
    
    if (!token) {
        redirect('/login');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_ORDER_API}/orders/mine`, {
        headers: {
            Authorization: `Bearer ${(await cookies()).get('accessToken')?.value}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error Fetching my order.');
    }

    const ordersData = (await response.json()) || [];
    
    // Sort orders by creation date (latest first)
    const orders = ordersData.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return format(date, 'MMM dd, yyyy • hh:mm a');
        } catch (error) {
            console.error('Error parsing date:', error);
            return dateString; // Fallback to original string if parsing fails
        }
    };

    const getOrderStatusColor = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        switch (normalizedStatus) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed':
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'delivered':
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPaymentModeDisplay = (paymentMode: string) => {
        return paymentMode === 'cash' ? 'Cash on Delivery' : 'Card Payment';
    };

    const truncateId = (id: string) => {
        return `#${id.slice(-8).toUpperCase()}`;
    };

    return (
        <div className="container mt-8 max-w-7xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight ml-7">My Orders</h1>
                <p className="text-muted-foreground mt-2 ml-7">
                    Track and manage your order history
                </p>
            </div>

            <Card className="shadow-sm">
                <CardHeader className="px-7 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">Order History</CardTitle>
                            <CardDescription className="mt-1">
                                {orders.length > 0 
                                    ? `${orders.length} order${orders.length > 1 ? 's' : ''} found`
                                    : 'No orders placed yet'
                                }
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-7">
                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-muted-foreground text-lg mb-2">
                                No orders yet
                            </div>
                            <p className="text-sm text-muted-foreground">
                                When you place your first order, it will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="font-semibold">Order ID</TableHead>
                                        <TableHead className="font-semibold">Date & Time</TableHead>
                                        <TableHead className="font-semibold">Payment Method</TableHead>
                                        <TableHead className="font-semibold">Status</TableHead>
                                        <TableHead className="font-semibold text-right">Amount</TableHead>
                                        <TableHead className="font-semibold text-center">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order: Order, index: number) => {
                                        return (
                                            <TableRow 
                                                key={order._id}
                                                className={`hover:bg-muted/30 transition-colors ${
                                                    index === 0 ? 'bg-blue-50/30' : ''
                                                }`}
                                            >
                                                <TableCell className="font-mono font-medium">
                                                    {truncateId(order._id)}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">
                                                            {formatDate(order.createdAt)}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            order.paymentMode === 'cash' 
                                                                ? 'bg-orange-500' 
                                                                : 'bg-blue-500'
                                                        }`}></div>
                                                        <span className="text-sm font-medium">
                                                            {getPaymentModeDisplay(order.paymentMode)}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        className={`font-medium ${getOrderStatusColor(order.orderStatus)}`}
                                                        variant="outline"
                                                    >
                                                        {order.orderStatus.toUpperCase()}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <span className="font-semibold text-lg">
                                                        ₹{order.total.toLocaleString('en-IN')}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Link
                                                        href={`/order/${order._id}`}
                                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                                    >
                                                        View Details
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
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