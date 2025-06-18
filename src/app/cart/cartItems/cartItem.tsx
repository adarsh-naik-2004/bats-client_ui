// cartItem.tsx
import React from 'react';
import Image from 'next/image';
import QtyChanger from './qtyChanger';
import { changeQty, CartItem as Item } from '@/lib/store/features/cart/cartSlice';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/lib/store/hooks';
import { getItemTotal } from '@/lib/utils';

const CartItem = ({ item }: { item: Item }) => {
    const dispatch = useAppDispatch();
    const total = getItemTotal(item);

    return (
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 mb-4 border border-orange-900/50">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div className="col-span-1 flex justify-center">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-orange-900/20 to-gray-900/20 rounded-lg overflow-hidden border border-orange-900/30">
                        <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                </div>
                
                <div className="col-span-3">
                    <h2 className="font-bold text-white">{item.name}</h2>
                    
                    {Object.values(item.chosenConfiguration.priceConfiguration).length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-2">
                            {Object.entries(item.chosenConfiguration.priceConfiguration).map(([key, value]) => (
                                <span key={key} className="px-2 py-1 bg-orange-900/30 text-orange-300 text-xs rounded-full">
                                    {key}: {value}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    {item.chosenConfiguration.selectedAccessorys.length > 0 && (
                        <div className="mt-2">
                            <p className="text-xs text-orange-300/80">Accessories:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {item.chosenConfiguration.selectedAccessorys.map((accessory, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-700/50 text-orange-200 text-xs rounded-full">
                                        {accessory.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="col-span-1 flex flex-col items-end">
                    <div className="font-bold text-lg text-orange-400 mb-2">₹{total * item.qty}</div>
                    <div className="flex items-center gap-4">
                        <QtyChanger
                            handleQtyChange={(data) => {
                                dispatch(changeQty({ hash: item.hash as string, qty: data }));
                            }}>
                            {item.qty}
                        </QtyChanger>
                        
                        <button
                            onClick={() => {
                                dispatch(changeQty({ hash: item.hash as string, qty: 0 }));
                            }}
                            className="ml-2 p-1 text-orange-300 hover:text-white hover:bg-orange-900/30 rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;