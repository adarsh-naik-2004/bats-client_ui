'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CircleCheck, Sparkles } from 'lucide-react';
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
                'group flex flex-col h-auto relative p-6 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:border-gradient-to-r hover:from-orange-500 hover:to-orange-700 hover:-translate-y-2 hover:scale-105 backdrop-blur-sm bg-gray-800/50',
                isCurrentSelected 
                    ? 'border-gradient-to-r from-orange-500 to-orange-700 shadow-2xl shadow-orange-500/30 bg-gradient-to-br from-orange-900/20 to-orange-800/20 scale-105' 
                    : 'border-gray-700 hover:bg-gradient-to-br hover:from-orange-900/10 hover:to-orange-800/10'
            )}>
            <div className="relative overflow-hidden rounded-xl mb-4">
                <Image 
                    src={accessory.image} 
                    width={90} 
                    height={90} 
                    alt={accessory.name} 
                    className="group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-orange-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-orange-300 transition-colors duration-300">{accessory.name}</h4>
            <p className="text-orange-400 mt-2 font-semibold group-hover:text-orange-300 transition-colors duration-300">₹{accessory.price}</p>
            {isCurrentSelected && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <CircleCheck className="text-white w-5 h-5" />
                </div>
            )}
            <Sparkles className="absolute top-2 left-2 text-orange-400 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        </Button>
    );
};

export default AccessoryCard;