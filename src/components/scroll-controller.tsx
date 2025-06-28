'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const ScrollController = ({ hasSelectedShop }: { hasSelectedShop: boolean }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentShopId = searchParams.get('shopId');
    
    if (!currentShopId) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    const productsSection = document.getElementById('products');
    if (productsSection && hasSelectedShop) {
      setTimeout(() => {
        productsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }, 300);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [searchParams, hasSelectedShop]);

  if (!hasSelectedShop) {
    return (
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div className="bg-orange-900/80 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-3 text-orange-300 text-sm font-medium animate-pulse">
          ↑ Please select a store to continue
        </div>
      </div>
    );
  }

  return null;
};

export default ScrollController;