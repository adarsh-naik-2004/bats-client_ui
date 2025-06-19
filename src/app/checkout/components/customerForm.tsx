// CustomerForm.tsx
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
      }

      alert("Order placed successfully!");
      dispatch(clearCart());

      router.push("/orders");
    },
    onError: (error) => {
      alert(`Order failed: ${error.message}`);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
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
    <Form {...customerForm}>
      <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
        <div className="flex container gap-6 mt-8 flex-col lg:flex-row">
          <Card className="w-full lg:w-3/5 bg-gray-800/50 backdrop-blur-lg border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">Customer details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="fname" className="text-gray-300">First Name</Label>
                    <Input
                      id="fname"
                      type="text"
                      className="w-full bg-gray-700 border-gray-600 text-white"
                      defaultValue={customer?.firstName}
                      disabled
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="lname" className="text-gray-300">Last Name</Label>
                    <Input
                      id="lname"
                      type="text"
                      className="w-full bg-gray-700 border-gray-600 text-white"
                      defaultValue={customer?.lastName}
                      disabled
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    className="w-full bg-gray-700 border-gray-600 text-white"
                    defaultValue={customer?.email}
                    disabled
                  />
                </div>
                <div className="grid gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="name" className="text-gray-300">Address</Label>
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
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                              >
                                {customer?.addresses.map((address) => {
                                  return (
                                    <Card 
                                      key={address.text} 
                                      className="bg-gray-800/50 border-gray-700 p-4 hover:border-orange-500 transition-colors"
                                    >
                                      <div className="flex items-start space-x-3">
                                        <FormControl>
                                          <RadioGroupItem
                                            value={address.text}
                                            id={address.text}
                                            className="mt-1 text-orange-500 border-gray-500"
                                          />
                                        </FormControl>
                                        <Label
                                          htmlFor={address.text}
                                          className="leading-normal text-gray-300"
                                        >
                                          {address.text}
                                        </Label>
                                      </div>
                                    </Card>
                                  );
                                })}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label className="text-gray-300">Payment Mode</Label>
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
                              <div className="w-36 relative group">
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
                                  className="flex items-center justify-center rounded-lg border-2 bg-gray-800 p-4 h-16 text-gray-500 cursor-not-allowed opacity-60 border-gray-600"
                                >
                                  <CreditCard size={"20"} />
                                  <span className="ml-2">Card</span>
                                </Label>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                                  Feature currently not available
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                </div>
                              </div>

                              {/* Cash Payment - Enabled */}
                              <div className="w-36">
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
                                  className="flex items-center justify-center rounded-lg border-2 bg-gray-800 p-4 h-16 hover:bg-gray-700 hover:text-white peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500 cursor-pointer text-gray-300 transition-colors"
                                >
                                  <Coins size={"20"} />
                                  <span className="ml-2 text-md">Cash</span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="fname" className="text-gray-300">Comment (Optional)</Label>
                  <FormField
                    name="comment"
                    control={customerForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              className="bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                              placeholder="Any special instructions?"
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
  );
};

export default CustomerForm;