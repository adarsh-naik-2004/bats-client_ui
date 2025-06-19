// CartItems.tsx
'use client';
import React, { useEffect } from 'react';
import CartItem from './cartItem';
import Link from 'next/link';
import { useAppSelector } from '@/lib/store/hooks';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getItemTotal } from '@/lib/utils';

const CartItems = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isClient, setIsClient] = React.useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const cart = useAppSelector((state) => state.cart.cartItems);

    const finalTotal = React.useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr);
        }, 0);
    }, [cart]);

    if (!isClient) {
        return null;
    }

    if (!cart.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-800 p-4 rounded-full mb-4">
                    <ShoppingCart size={40} className="text-gray-400" />
                </div>
                <p className="text-xl font-medium text-gray-300 mb-2">Your cart is empty!</p>
                <p className="text-gray-500 mb-6">
                    Start adding delicious items to your cart
                </p>
                <Link
                    className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2"
                    href={`/?shopId=${searchParams.get('shopId')}`}>
                    Continue shopping
                    <ArrowRight size={16} />
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {cart.map((cartItem) => (
                <CartItem key={cartItem.hash} item={cartItem} />
            ))}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
                <div>
                    <p className="text-gray-400 text-sm">Total</p>
                    <span className="font-bold text-2xl text-white">&#8377;{finalTotal}</span>
                </div>
                <Button
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg px-6 py-3 rounded-xl"
                    onClick={() =>
                        router.push(`/checkout/?shopId=${searchParams.get('shopId')}`)
                    }>
                    Proceed to Checkout
                    <ArrowRight size={18} className="ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default CartItems;