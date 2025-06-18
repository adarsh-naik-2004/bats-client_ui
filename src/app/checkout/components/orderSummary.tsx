// orderSummary.tsx
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

    const { mutate, isPending: isCouponVerifying } = useMutation({
        mutationKey: ['couponCode'],
        mutationFn: async (): Promise<{ valid: boolean; discount: number }> => {
            if (!couponCodeRef.current?.value) {
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
                handleCouponCodeChange(couponCodeRef.current?.value || '');
                setDiscountPercentage(data.discount);
                return;
            }

            setDiscountError('Coupon is invalid');
            handleCouponCodeChange('');
            setDiscountPercentage(0);
        },
        onError: () => {
            setDiscountError('Error verifying coupon');
        }
    });

    const handleCouponValidation = (e: React.MouseEvent) => {
        e.preventDefault();
        mutate();
    };

    return (
        <Card className="w-full lg:w-2/5 bg-gray-900/80 backdrop-blur-sm border-orange-900/50 h-auto self-start">
            <CardHeader>
                <CardTitle className="text-orange-300">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
                <div className="flex items-center justify-between text-orange-200">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{subTotal}</span>
                </div>
                <div className="flex items-center justify-between text-orange-200">
                    <span>Taxes</span>
                    <span className="font-bold">₹{taxesAmount}</span>
                </div>
                <div className="flex items-center justify-between text-orange-200">
                    <span>Delivery</span>
                    <span className="font-bold">₹{DELIVERY_CHARGES}</span>
                </div>
                <div className="flex items-center justify-between text-orange-200">
                    <span>Discount</span>
                    <span className="font-bold text-orange-400">-₹{discountAmount}</span>
                </div>
                <hr className="border-orange-900/50" />
                <div className="flex items-center justify-between text-white">
                    <span className="font-bold text-lg">Order Total</span>
                    <span className="font-bold flex flex-col items-end">
                        {discountPercentage ? (
                            <>
                                <span className="line-through text-orange-200/50 text-sm">
                                    ₹{grandWithoutDiscountTotal}
                                </span>
                                <span className="text-xl text-orange-400">₹{grandWithDiscountTotal}</span>
                            </>
                        ) : (
                            <span className="text-xl">₹{grandWithoutDiscountTotal}</span>
                        )}
                    </span>
                </div>
                
                {discountError && (
                    <div className="text-orange-500 text-sm text-center py-2 bg-orange-900/20 rounded-lg">
                        {discountError}
                    </div>
                )}
                
                <div className="flex items-center gap-2 mt-4">
                    <Input
                        id="coupon"
                        name="code"
                        type="text"
                        className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-orange-200/50 focus:border-orange-500"
                        placeholder="Enter coupon code"
                        ref={couponCodeRef}
                    />
                    <Button 
                        onClick={handleCouponValidation} 
                        variant={'outline'}
                        className="text-orange-400 border-orange-500/30 hover:bg-orange-900/20"
                        disabled={isCouponVerifying}
                    >
                        {isCouponVerifying ? (
                            <LoaderCircle className="animate-spin w-4 h-4" />
                        ) : (
                            'Apply'
                        )}
                    </Button>
                </div>

                <div className="mt-6">
                    <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white py-4 text-lg"
                        disabled={isPlaceOrderPending}
                    >
                        {isPlaceOrderPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <LoaderCircle className="animate-spin w-5 h-5" />
                                <span>Processing Order...</span>
                            </span>
                        ) : (
                            'Place Order'
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;