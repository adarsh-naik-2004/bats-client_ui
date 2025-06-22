'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const CartCounter = () => {
    const searchParams = useSearchParams();
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const itemCount = cartItems.length;

    return (
        <div className="relative">
            <Link 
                href={`/cart?shopId=${searchParams.get('shopId')}`}
                className="relative flex items-center justify-center p-3 rounded-full bg-orange-700/30 backdrop-blur-sm border border-orange-500 hover:bg-orange-700/40 transition-all duration-300 shadow-md hover:shadow-lg"
            >
                <ShoppingBasket className="w-6 h-6 text-orange-300 group-hover:text-white transition-colors duration-300" />
                
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[24px] h-6 flex items-center justify-center px-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 text-white text-xs font-bold shadow-lg animate-pulse">
                        {itemCount > 99 ? '99+' : itemCount}
                    </span>
                )}
            </Link>
        </div>
    );
};

export default CartCounter;