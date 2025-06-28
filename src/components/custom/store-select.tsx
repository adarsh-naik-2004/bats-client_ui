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
    
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    setTimeout(() => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }
    }, 300);
  };

  return (
    <div className="relative">
      <Select
        onValueChange={handleValueChange}
        defaultValue={searchParams.get('shopId') || ''}
      >
        <SelectTrigger className="w-[280px] border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 py-3 px-4 shadow-sm">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-orange-500" />
            <SelectValue placeholder="Select a store location" />
          </div>
        </SelectTrigger>
        <SelectContent className="border-gray-700 shadow-xl rounded-xl bg-gray-800/95 backdrop-blur-md text-white">
          {shops.data.map((shop) => (
            <SelectItem
              key={shop.id}
              value={String(shop.id)}
              className="hover:bg-orange-900/30 rounded-lg mx-1 my-0.5 transition-colors duration-200 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">{shop.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StoreSelect;