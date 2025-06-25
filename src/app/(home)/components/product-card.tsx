import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react';
import { Product } from '@/lib/types';
import ProductModal from './product-modal';
import { getFromPrice } from '@/lib/utils';

type PropTypes = { product: Product };

const ProductCard = ({ product }: PropTypes) => {
    return (
        <Card className="group border-0 rounded-2xl transition-all duration-300 flex flex-col overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm border border-gray-700 hover:border-orange-500/40 hover:shadow-lg mx-auto w-full mb-10">
            <CardHeader className="relative flex items-center justify-center p-7 bg-gradient-to-br from-gray-800/50 to-gray-900/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image 
                    alt={product.name} 
                    width={200} 
                    height={200} 
                    src={product.image} 
                    className="transition-transform duration-300 ease-out object-contain"
                />
            </CardHeader>
            
            <CardContent className="p-5 flex-grow relative">
                <h2 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors mb-3">
                    {product.name}
                </h2>
                <p className="text-orange-200/80 text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                </p>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between mt-auto p-5 bg-gradient-to-r from-gray-800/50 to-gray-900/30 backdrop-blur-sm">
                <div className="flex flex-col">
                    <span className="text-xs text-orange-300/80">From</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                        ₹{getFromPrice(product)}
                    </span>
                </div>
                <ProductModal product={product} />
            </CardFooter>
        </Card>
    );
};

export default ProductCard;