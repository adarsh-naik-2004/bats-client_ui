// components/PaymentHandler.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  prefill: {
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

export function PaymentHandler({ orderId }: { orderId: string }) {
  const router = useRouter();

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}/payment`);
        const { razorpayOrderId, amount, currency } = await response.json();

        const loadScript = () => {
          return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => resolve(true);
            document.body.appendChild(script);
          });
        };

        await loadScript();

        const options: RazorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: amount,
          currency: currency,
          order_id: razorpayOrderId,
          name: "Your Store Name",
          description: "Order Payment",
          handler: async (response) => {
            const verification = await fetch(`/api/orders/${orderId}/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            });
            if (verification.ok) {
              router.push(`/payment/success?orderId=${orderId}`);
            } else {
              router.push(`/payment/failed?orderId=${orderId}`);
            }
          },
          prefill: { email: "customer@example.com", contact: "+919876543210" },
          theme: { color: "#3399CC" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (error) {
        console.error('Payment initialization failed:', error);
        router.push(`/payment/failed?orderId=${orderId}`);
      }
    };

    initializePayment();
  }, [orderId, router]);

  return (
    <div className="text-center p-8">
      <p>Redirecting to payment gateway...</p>
      <div className="animate-spin mt-4">🌀</div>
    </div>
  );
}