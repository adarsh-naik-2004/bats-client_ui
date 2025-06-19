// OrderSummary.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { verifyCoupon } from '@/lib/http/api';
import { useAppSelector } from '@/lib/store/hooks';
import { CouponCodeData } from '@/lib/types';
import { getItemTotal } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const TAXES_PERCENTAGE = 18;
const DELIVERY_CHARGES = 100;

const OrderSummary = ({
    isPlaceOrderPending,
    handleCouponCodeChange,
}: {
    isPlaceOrderPending: boolean;
    handleCouponCodeChange: (code: string) => void;
}) => {
    const searchParam = useSearchParams();

    const cart = useAppSelector((state) => state.cart.cartItems);

    const [discountPercentage, setDiscountPercentage] = React.useState(0);
    const [discountError, setDiscountError] = React.useState('');

    const couponCodeRef = React.useRef<HTMLInputElement>(null);

    const subTotal = React.useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr);
        }, 0);
    }, [cart]);

    const discountAmount = React.useMemo(() => {
        return Math.round((subTotal * discountPercentage) / 100);
    }, [subTotal, discountPercentage]);

    const taxesAmount = React.useMemo(() => {
        const amountAfterDiscount = subTotal - discountAmount;

        return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
    }, [subTotal, discountAmount]);

    const grandWithDiscountTotal = React.useMemo(() => {
        return subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES;
    }, [subTotal, discountAmount, taxesAmount]);

    const grandWithoutDiscountTotal = React.useMemo(() => {
        return subTotal + taxesAmount + DELIVERY_CHARGES;
    }, [subTotal, taxesAmount]);

    const { mutate, isPending: isCouponValidating } = useMutation({
        mutationKey: ['couponCode'],
        mutationFn: async (): Promise<{ valid: boolean; discount: number }> => {
            if (!couponCodeRef.current) {
                throw new Error('Coupon code is missing');
            }

            const shopId = searchParam.get('shopId');

            if (!shopId) {
                throw new Error('Shop ID is missing');
            }

            const data: CouponCodeData = {
                code: couponCodeRef.current.value,
                storeId: shopId,
            };
            const response = await verifyCoupon(data);
            return response.data as { valid: boolean; discount: number };
        },
        onSuccess: (data: { valid: boolean; discount: number }) => {
            if (data.valid) {
                setDiscountError('');
                handleCouponCodeChange(couponCodeRef.current ? couponCodeRef.current.value : '');
                setDiscountPercentage(data.discount);
                return;
            }

            setDiscountError('Coupon is invalid');
            handleCouponCodeChange('');
            setDiscountPercentage(0);
        },
    });

    const handleCouponValidation = (e: React.MouseEvent) => {
        e.preventDefault();
        mutate();
    };

    return (
        <Card className="w-full lg:w-2/5 bg-gray-800/50 backdrop-blur-lg border-gray-700 shadow-xl h-auto self-start">
            <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-2">
                <div className="space-y-3 py-4 border-b border-gray-700">
                    <div className="flex items-center justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>₹{subTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-300">
                        <span>Taxes ({TAXES_PERCENTAGE}%)</span>
                        <span>₹{taxesAmount}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-300">
                        <span>Delivery charges</span>
                        <span>₹{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-300">
                        <span>Discount</span>
                        <span className="text-green-400">-₹{discountAmount}</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between py-4">
                    <span className="font-bold text-lg text-white">Order total</span>
                    <span className="font-bold flex flex-col items-end">
                        <span className={discountPercentage ? 'line-through text-gray-400 text-sm' : 'text-white text-xl'}>
                            ₹{grandWithoutDiscountTotal}
                        </span>
                        {discountPercentage ? (
                            <span className="text-green-400 text-xl">₹{grandWithDiscountTotal}</span>
                        ) : null}
                    </span>
                </div>
                
                {discountError && <div className="text-red-400 text-sm">{discountError}</div>}
                
                <div className="flex items-center gap-2 mt-2">
                    <Input
                        id="coupon"
                        name="code"
                        type="text"
                        className="w-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                        placeholder="Enter coupon code"
                        ref={couponCodeRef}
                    />
                    <Button 
                        onClick={handleCouponValidation} 
                        variant={'outline'}
                        className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        disabled={isCouponValidating}
                    >
                        {isCouponValidating ? (
                            <LoaderCircle className="animate-spin h-4 w-4" />
                        ) : (
                            'Apply'
                        )}
                    </Button>
                </div>

                <div className="text-right mt-6 pt-4 border-t border-gray-700">
                    <Button 
                        disabled={isPlaceOrderPending}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg px-6 py-3 rounded-lg text-base"
                    >
                        {isPlaceOrderPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <LoaderCircle className="animate-spin" />
                                <span>Processing Order...</span>
                            </span>
                        ) : (
                            <span>Place Order</span>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;