// page.tsx
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CustomerForm from "./components/customerForm";

interface CheckoutPageProps {
  searchParams: { shopId?: string; [key: string]: string | string[] | undefined };
}

export default async function Checkout({ searchParams }: CheckoutPageProps) {
  const session = await getSession();

  const sParams = new URLSearchParams();

  // Append each key-value pair from searchParams to URLSearchParams
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      sParams.append(key, value);
    }
  });

  const existingQueryString = sParams.toString();

  sParams.append("return-to", `/checkout?${existingQueryString}`);

  if (!session) {
    redirect(`/login?${sParams}`);
  }

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
        <p className="text-gray-400 mb-8">Complete your order details</p>
        <CustomerForm />
      </div>
    </section>
  );
}