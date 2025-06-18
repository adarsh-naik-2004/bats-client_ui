// cartPage.tsx
'use client';
import React, { Suspense } from 'react';
import CartItems from './cartItems/cartItems';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CartPage = () => {
    const searchParams = useSearchParams();
    
    return (
        <div className="relative min-h-screen w-full py-12 px-4">
            {/* Virat Kohli Background with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                        backgroundImage: "url('https://images.unsplash.com/photo-1612872087720-bb876e2e67d1')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-950/90"></div>
            </div>
            
            <div className="container mx-auto relative z-10 max-w-4xl">
                <div className="flex items-center mb-8">
                    <Link 
                        href={`/?shopId=${searchParams.get('shopId')}`} 
                        className="flex items-center text-orange-400 hover:text-orange-300 transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Store
                    </Link>
                </div>
                
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                        Your Shopping Cart
                    </h1>
                    <p className="text-orange-200/80 mt-3">
                        Review your premium cricket gear selections
                    </p>
                </div>
                
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-900/50 shadow-xl">
                    <Suspense fallback={
                        <div className="flex justify-center py-12">
                            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    }>
                        <CartItems />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default CartPage;