'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import React from 'react';
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
                'flex flex-col h-42 relative',
                isCurrentSelected ? 'border-primary' : ''
            )}>
            <Image src={accessory.image} width={80} height={80} alt={accessory.name} />
            <h4>{accessory.name}</h4>
            <p>&#8377;{accessory.price}</p>
            {isCurrentSelected && <CircleCheck className="absolute top-1 right-1 text-primary" />}
        </Button>
    );
};

export default AccessoryCard;
