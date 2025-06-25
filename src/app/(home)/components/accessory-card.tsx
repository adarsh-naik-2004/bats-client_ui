'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import { Accessory } from '@/lib/types';

type PropType = {
    accessory: Accessory;
    selectedAccessorys: Accessory[];
    handleCheckBoxCheck: (accessory: Accessory) => void;
};

const AccessoryCard = ({ accessory, selectedAccessorys, handleCheckBoxCheck }: PropType) => {
    const isCurrentSelected = selectedAccessorys.some((element) => element.id === accessory.id);

    return (
        <Button
            onClick={() => handleCheckBoxCheck(accessory)}
            variant={'outline'}
            className={cn(
                'group flex flex-col h-auto relative p-5 rounded-2xl border transition-all duration-300 hover:shadow-md hover:border-orange-500/50 backdrop-blur-sm bg-gray-800/30',
                isCurrentSelected 
                    ? 'border-orange-500 shadow-md bg-gradient-to-br from-orange-900/20 to-orange-800/20' 
                    : 'border-gray-700'
            )}>
            <div className="relative overflow-hidden rounded-lg mb-4">
                <Image 
                    src={accessory.image} 
                    width={80} 
                    height={80} 
                    alt={accessory.name} 
                    className="transition-transform duration-300 ease-out"
                />
            </div>
            <h4 className="font-medium text-base text-white">{accessory.name}</h4>
            <p className="text-orange-400 mt-2 text-base">₹{accessory.price}</p>
            {isCurrentSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
                    <CircleCheck className="text-white w-4 h-4" />
                </div>
            )}
        </Button>
    );
};

export default AccessoryCard;