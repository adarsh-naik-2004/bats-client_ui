import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react';
import { Product } from '@/lib/types';
import ProductModal from './product-modal';
import { getFromPrice } from '@/lib/utils';
import { Star, TrendingUp } from 'lucide-react';

type PropTypes = { product: Product };

const ProductCard = ({ product }: PropTypes) => {
    return (
        <Card className="group border-0 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 flex flex-col overflow-hidden bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-orange-900/10 hover:from-orange-900/20 hover:via-orange-800/10 hover:to-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-orange-500/30 hover:-translate-y-3 hover:scale-105 transform-gpu">
            <CardHeader className="relative flex items-center justify-center p-8 bg-gradient-to-br from-gray-800/50 to-orange-900/10 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <TrendingUp className="w-3 h-3" />
                    HOT
                </div>
                <Image 
                    alt={product.name} 
                    width={220} 
                    height={220} 
                    src={product.image} 
                    className="group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </CardHeader>
            <CardContent className="p-6 flex-grow relative">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} />
                        ))}
                    </div>
                    <span className="text-xs text-orange-300/80 font-medium">4.8 (234)</span>
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300 mb-3">
                    {product.name}
                </h2>
                <p className="text-orange-200/80 line-clamp-2 text-sm leading-relaxed">{product.description}</p>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-orange-500/10 to-orange-700/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            </CardContent>
            <CardFooter className="flex items-center justify-between mt-auto p-6 bg-gradient-to-r from-gray-800/50 to-orange-900/20 backdrop-blur-sm rounded-2xl border border-orange-900/30">
                <div className="flex flex-col">
                    <span className="text-xs text-orange-300/80 font-medium">Starting from</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                        ₹{getFromPrice(product)}
                    </span>
                </div>
                <ProductModal product={product} />
            </CardFooter>
        </Card>
    );
};

export default ProductCard;