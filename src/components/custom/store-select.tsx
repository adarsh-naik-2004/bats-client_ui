"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Store } from "@/lib/types";
import { MapPin } from "lucide-react";

export default function StoreSelect({
  shops,
  onSelect,
  initialValue,
}: {
  shops: { data: Store[] };
  onSelect: (shopId: string) => void;
  initialValue?: string;
}) {
  const handleValueChange = (value: string) => {
    onSelect(value);
  };

  return (
    <div className="relative">
      <Select
        onValueChange={handleValueChange}
        value={initialValue}
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
}