// CartPage.tsx
import React, { Suspense } from 'react';
import CartItems from './cartItems/cartItems';

const CartPage = () => {
    return (
        <section className="bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Shopping Cart</h1>
                    <p className="text-gray-400 mb-8">Review and manage your items</p>
                    
                    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 md:p-8 border border-gray-700 shadow-2xl">
                        <Suspense fallback={
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
                                <p className="mt-4 text-gray-400">Loading your cart...</p>
                            </div>
                        }>
                            <CartItems />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPage;