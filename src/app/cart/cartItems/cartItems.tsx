// cartItems.tsx
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
            <div className="flex flex-col items-center justify-center py-16 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-orange-900/50">
                <ShoppingCart className="w-16 h-16 text-orange-400 mb-4" />
                <p className="text-orange-200/80 text-lg mb-4">
                    Your cart is empty!
                </p>
                <Link
                    className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2"
                    href={`/?shopId=${searchParams.get('shopId')}`}
                >
                    Continue shopping
                    <ArrowRight size={16} />
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-4">
                {cart.map((cartItem) => (
                    <CartItem key={cartItem.hash} item={cartItem} />
                ))}
            </div>
            
            <div className="mt-6 p-6 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-orange-900/50">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-orange-300/80">Total</p>
                        <span className="font-bold text-2xl text-white">₹{finalTotal}</span>
                    </div>
                    <Button
                        className="bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                        onClick={() => router.push(`/checkout/?shopId=${searchParams.get('shopId')}`)}
                    >
                        Proceed to Checkout
                        <ArrowRight size={18} className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItems;