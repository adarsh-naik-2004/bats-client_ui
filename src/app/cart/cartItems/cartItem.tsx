// CartItem.tsx
import React from 'react';
import Image from 'next/image';
import QtyChanger from './qtyChanger';
import { changeQty, CartItem as Item } from '@/lib/store/features/cart/cartSlice';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/lib/store/hooks';
import { useTotal } from '@/lib/hooks/useTotal';

const CartItem = ({ item }: { item: Item }) => {
    const dispatch = useAppDispatch();
    const total = useTotal(item);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                <div className="flex items-start">
                    <div className="bg-gray-700 rounded-lg p-2 border border-gray-600">
                        <Image 
                            src={item.image} 
                            width={100} 
                            height={100} 
                            alt={item.name}
                            className="rounded-md object-contain"
                        />
                    </div>
                    <div className="flex-1 ml-4">
                        <div className="flex justify-between items-start">
                            <h2 className="font-bold text-white text-lg">{item.name}</h2>
                        </div>
                        <div className="mt-2 space-y-1">
                            <h3 className="text-sm text-gray-300">
                                {Object.values(item.chosenConfiguration.priceConfiguration)
                                    .map((value) => value)
                                    .join(', ')}
                            </h3>
                            <h3 className="text-sm text-gray-400">
                                {item.chosenConfiguration.selectedAccessorys
                                    .map((accessory) => accessory.name)
                                    .join(', ')}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between md:justify-end md:gap-8">
                    <div className="flex-1 md:flex-none">
                        <QtyChanger
                            handleQtyChange={(data) => {
                                dispatch(changeQty({ hash: item.hash as string, qty: data }));
                            }}>
                            {item.qty}
                        </QtyChanger>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="font-bold text-lg text-white min-w-[60px] text-right">
                            &#8377;{total * item.qty}
                        </div>
                        <button
                            className="p-2 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                            onClick={() => {
                                dispatch(changeQty({ hash: item.hash as string, qty: 0 }));
                            }}>
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <hr className="border-gray-700" />
        </>
    );
};

export default CartItem;