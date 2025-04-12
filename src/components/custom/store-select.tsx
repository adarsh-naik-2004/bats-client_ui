'use client';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Store } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

const StoreSelect = ({ shops }: { shops: { data: Store[] } }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleValueChange = (value: string) => {
        router.push(`/?shopId=${value}`);
    };
    return (
        <Select
            onValueChange={handleValueChange}
            defaultValue={searchParams.get('shopId') || ''}>
            <SelectTrigger className="w-[180px] focus:ring-0">
                <SelectValue placeholder="Select shop" />
            </SelectTrigger>
            <SelectContent>
                {shops.data.map((shop) => {
                    return (
                        <SelectItem key={shop.id} value={String(shop.id)}>
                            {shop.name}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

export default StoreSelect;
