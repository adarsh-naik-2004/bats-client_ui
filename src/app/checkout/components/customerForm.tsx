// customerForm.tsx
"use client";
import React from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Coins, CreditCard } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { createOrder, getCustomer } from "@/lib/http/api";
import { Customer, OrderData } from "@/lib/types";
import AddAdress from "./addAddress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import OrderSummary from "./orderSummary";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useSearchParams } from "next/navigation";
import { clearCart } from "@/lib/store/features/cart/cartSlice";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  address: z.string({ required_error: "Please select an address." }),
  paymentMode: z.enum(["card", "cash"], {
    required_error: "You need to select a payment mode type.",
  }),
  comment: z.any(),
});

const CustomerForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const customerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const searchParam = useSearchParams();
  const chosenCouponCode = React.useRef("");
  const idempotencyKeyRef = React.useRef("");

  const cart = useAppSelector((state) => state.cart);

  const { data: customer, isLoading } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
      return await getCustomer().then((res) => res.data);
    },
  });

  const { mutate, isPending: isPlaceOrderPending } = useMutation({
    mutationKey: ["order"],
    mutationFn: async (data: OrderData) => {
      const idempotencyKey =
        idempotencyKeyRef.current ||
        (idempotencyKeyRef.current = uuidv4() + customer?._id);
      const response = await createOrder(data, idempotencyKey);
      return response.data as { razorpayOrderId: string | null };
    },
    retry: 3,
    onSuccess: (data: { razorpayOrderId: string | null }) => {
      if (data.razorpayOrderId) {
        window.location.href = data.razorpayOrderId;
      } else {
        alert("Order placed successfully!");
        dispatch(clearCart());
        router.push("/orders");
      }
    },
    onError: (error) => {
      alert(`Order failed: ${error.message}`);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
    const storeId = searchParam.get("shopId");
    if (!storeId) {
      alert("Shop Id is required!");
      return;
    }
    const orderData: OrderData = {
      cart: cart.cartItems,
      couponCode: chosenCouponCode.current ? chosenCouponCode.current : "",
      storeId: storeId,
      customerId: customer ? customer._id : "",
      comment: data.comment,
      address: data.address,
      paymentMode: data.paymentMode,
    };
    mutate(orderData);
  };

  return (
    <div className="relative min-h-screen w-full py-12 px-4">
      {/* Virat Kohli Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1612872087720-bb876e2e67d1')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-950/90"></div>
      </div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Secure Checkout
          </h1>
          <p className="text-orange-200/80 mt-3">
            Complete your purchase with confidence
          </p>
        </div>
        
        <Form {...customerForm}>
          <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
            <div className="flex flex-col lg:flex-row gap-6">
              <Card className="w-full lg:w-3/5 bg-gray-900/80 backdrop-blur-sm border-orange-900/50">
                <CardHeader>
                  <CardTitle className="text-orange-300">Customer Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <Label className="text-orange-300">First Name</Label>
                        <Input
                          type="text"
                          className="bg-gray-800 border-gray-700 text-white"
                          defaultValue={customer?.firstName}
                          disabled
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label className="text-orange-300">Last Name</Label>
                        <Input
                          type="text"
                          className="bg-gray-800 border-gray-700 text-white"
                          defaultValue={customer?.lastName}
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      <Label className="text-orange-300">Email</Label>
                      <Input
                        type="text"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue={customer?.email}
                        disabled
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-orange-300">Address</Label>
                          <AddAdress customerId={customer?._id} />
                        </div>

                        <FormField
                          name="address"
                          control={customerForm.control}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
                                  >
                                    {customer?.addresses.map((address) => {
                                      return (
                                        <div 
                                          key={address.text} 
                                          className="bg-gray-800/50 border border-orange-900/30 rounded-xl p-4 hover:border-orange-500/50 transition-colors"
                                        >
                                          <div className="flex items-start space-x-3">
                                            <FormControl>
                                              <RadioGroupItem
                                                value={address.text}
                                                id={address.text}
                                                className="mt-1 text-orange-500"
                                              />
                                            </FormControl>
                                            <Label
                                              htmlFor={address.text}
                                              className="leading-normal text-orange-200"
                                            >
                                              {address.text}
                                            </Label>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage className="text-orange-500" />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      <Label className="text-orange-300">Payment Mode</Label>
                      <FormField
                        name="paymentMode"
                        control={customerForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  className="flex flex-wrap gap-4"
                                >
                                  {/* Card Payment - Disabled */}
                                  <div className="w-full sm:w-36 relative group">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={"card"}
                                        id={"card"}
                                        className="peer sr-only"
                                        aria-label={"card"}
                                        disabled
                                      />
                                    </FormControl>
                                    <Label
                                      htmlFor={"card"}
                                      className="flex items-center justify-center rounded-xl border-2 bg-gray-800/50 p-3 h-16 text-orange-200/50 cursor-not-allowed"
                                    >
                                      <CreditCard size={"20"} />
                                      <span className="ml-2">Card</span>
                                    </Label>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                      Feature currently not available
                                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                    </div>
                                  </div>

                                  {/* Cash Payment - Enabled */}
                                  <div className="w-full sm:w-36">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={"cash"}
                                        id={"cash"}
                                        className="peer sr-only"
                                        aria-label={"cash"}
                                      />
                                    </FormControl>
                                    <Label
                                      htmlFor={"cash"}
                                      className="flex items-center justify-center rounded-xl border-2 border-orange-600 bg-orange-900/20 p-3 h-16 hover:bg-orange-900/30 peer-data-[state=checked]:bg-orange-900/40 text-orange-300 cursor-pointer transition-colors"
                                    >
                                      <Coins size={"20"} />
                                      <span className="ml-2 text-md">Cash</span>
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-orange-500" />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label className="text-orange-300">Order Notes</Label>
                      <FormField
                        name="comment"
                        control={customerForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Textarea 
                                  className="bg-gray-800 border-gray-700 text-white placeholder:text-orange-200/50 focus:border-orange-500"
                                  {...field} 
                                  placeholder="Special instructions or notes for your order"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <OrderSummary
                isPlaceOrderPending={isPlaceOrderPending}
                handleCouponCodeChange={(code) => {
                  chosenCouponCode.current = code;
                }}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CustomerForm;