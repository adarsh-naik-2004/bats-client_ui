'use client';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Store } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapPin } from 'lucide-react';

const StoreSelect = ({ shops }: { shops: { data: Store[] } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    router.push(`/?shopId=${value}`);
  };

  return (
    <div className="relative">
      <Select
        onValueChange={handleValueChange}
        defaultValue={searchParams.get('shopId') || ''}
      >
        <SelectTrigger className="w-[200px] border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <SelectValue placeholder="Select location" />
          </div>
        </SelectTrigger>
        <SelectContent className="border-gray-200 shadow-xl rounded-xl bg-white/95 backdrop-blur-md">
          {shops.data.map((shop) => (
            <SelectItem 
              key={shop.id} 
              value={String(shop.id)}
              className="hover:bg-blue-50 rounded-lg mx-1 my-0.5 transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {shop.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StoreSelect;
