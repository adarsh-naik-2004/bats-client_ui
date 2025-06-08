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
        <div className="relative group">
            <Link 
                href={`/cart?shopId=${searchParams.get('shopId')}`}
                className="relative flex items-center justify-center p-3 rounded-full bg-white/50 backdrop-blur-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
                <ShoppingBasket className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                
                {/* Cart Badge */}
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center px-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold shadow-lg animate-pulse">
                        {itemCount > 99 ? '99+' : itemCount}
                    </span>
                )}
                
                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {itemCount === 0 ? 'Cart is empty' : `${itemCount} item${itemCount > 1 ? 's' : ''} in cart`}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
            </Link>
            
            {/* Ripple Effect on Click */}
            <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-20 bg-blue-400 transition-opacity duration-150"></div>
        </div>
    );
};

export default CartCounter;