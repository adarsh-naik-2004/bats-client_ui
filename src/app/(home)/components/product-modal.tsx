'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Check, ShoppingCart } from 'lucide-react';
import React, { startTransition, Suspense, useState } from 'react';
import AccessoryList from './accessory-list';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Product, Accessory } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addToCart, CartItem } from '@/lib/store/features/cart/cartSlice';
import { hashTheItem } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const SuccessToast = () => {
    return (
        <div className="flex items-center gap-2">
            <Check className="text-green-600 w-4 h-4" />
            <span className="text-sm">Item added to cart</span>
        </div>
    );
};

type ChosenConfig = { [key: string]: string; };

const ProductModal = ({ product }: { product: Product }) => {
    const { toast } = useToast();
    const [dialogOpen, setDialogOpen] = useState(false);
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const dispatch = useAppDispatch();
    
    const defaultConfiguration = Object.entries(product.category.priceConfiguration)
        .map(([key, value]) => ({ [key]: value.availableOptions[0] }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    
    const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(defaultConfiguration as unknown as ChosenConfig);
    const [selectedAccessorys, setSelectedAccessorys] = React.useState<Accessory[]>([]);
    
    const totalPrice = React.useMemo(() => {
        const accessorysTotal = selectedAccessorys.reduce((acc, curr) => acc + curr.price, 0);
        const configPricing = Object.entries(chosenConfig).reduce(
            (acc, [key, value]: [string, string]) => {
                const price = product.priceConfiguration[key].availableOptions[value];
                return acc + price;
            },
            0
        );
        return configPricing + accessorysTotal;
    }, [chosenConfig, selectedAccessorys, product]);

    const alreadyHasInCart = React.useMemo(() => {
        const currentConfiguration = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: { ...chosenConfig },
                selectedAccessorys: selectedAccessorys,
            },
            qty: 1,
        };
        const hash = hashTheItem(currentConfiguration);
        return cartItems.some((item) => item.hash === hash);
    }, [product, chosenConfig, selectedAccessorys, cartItems]);

    const handleCheckBoxCheck = (accessory: Accessory) => {
        const isAlreadyExists = selectedAccessorys.some(
            (element: Accessory) => element.id === accessory.id
        );
        startTransition(() => {
            if (isAlreadyExists) {
                setSelectedAccessorys((prev) => prev.filter((elm: Accessory) => elm.id !== accessory.id));
                return;
            }
            setSelectedAccessorys((prev: Accessory[]) => [...prev, accessory]);
        });
    };

    const handleAddToCart = (product: Product) => {
        const itemToAdd: CartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: chosenConfig!,
                selectedAccessorys: selectedAccessorys,
            },
            qty: 1,
        };
        dispatch(addToCart(itemToAdd));
        setSelectedAccessorys([]);
        setDialogOpen(false);
        toast({ title: "Success", description: <SuccessToast /> });
    };

    const handleRadioChange = (key: string, data: string) => {
        startTransition(() => {
            setChosenConfig((prev) => ({ ...prev, [key]: data }));
        });
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white px-5 py-2 rounded-lg transition-colors text-base"
                >
                    Customize
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 rounded-2xl border bg-gray-800 border-orange-900">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-2/5 bg-gradient-to-b from-orange-900/10 to-orange-800/10 p-8 flex items-center justify-center">
                        <Image 
                            src={product.image} 
                            width={240} 
                            height={240} 
                            alt={product.name} 
                            className="object-contain"
                        />
                    </div>
                    
                    <div className="w-full lg:w-3/5 p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                            <p className="text-orange-200/80 text-sm">{product.description}</p>
                        </div>

                        <div className="space-y-6 mb-6">
                            {Object.entries(product.category.priceConfiguration).map(([key, value]) => (
                                <div key={key}>
                                    <h4 className="text-sm font-semibold text-orange-300 mb-3">{key}</h4>
                                    <RadioGroup
                                        defaultValue={value.availableOptions[0]}
                                        onValueChange={(data) => handleRadioChange(key, data)}
                                        className="grid grid-cols-2 gap-3"
                                    >
                                        {value.availableOptions.map((option) => (
                                            <div key={option}>
                                                <RadioGroupItem value={option} id={option} className="peer sr-only" />
                                                <Label
                                                    htmlFor={option}
                                                    className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-3 text-sm hover:border-orange-500 peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-orange-900/20 cursor-pointer transition-colors text-orange-200/80"
                                                >
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            ))}
                        </div>

                        {product.category.name === 'Bat' && (
                            <div className="mb-8">
                                <Suspense fallback={
                                    <div className="text-center py-4">
                                        <div className="inline-block w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="ml-2 text-sm text-orange-300">Loading accessories...</span>
                                    </div>
                                }>
                                    <AccessoryList
                                        selectedAccessorys={selectedAccessorys}
                                        handleCheckBoxCheck={handleCheckBoxCheck}
                                    />
                                </Suspense>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-6 border-t border-orange-900">
                            <div>
                                <span className="text-xs text-orange-300/80">Total</span>
                                <div className="text-xl font-bold text-white">
                                    ₹{totalPrice.toLocaleString()}
                                </div>
                            </div>
                            <Button
                                className={`px-5 py-2 rounded-lg transition-colors text-base ${
                                    alreadyHasInCart 
                                        ? 'bg-gray-600 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900'
                                }`}
                                disabled={alreadyHasInCart}
                                onClick={() => handleAddToCart(product)}
                            >
                                <ShoppingCart size={18} className="mr-2" />
                                {alreadyHasInCart ? 'In Cart' : 'Add to Cart'}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;