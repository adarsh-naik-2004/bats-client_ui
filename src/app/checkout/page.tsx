// page.tsx
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CustomerForm from "./components/customerForm";
import CartCleaner from "./components/cartCleaner";

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{ shopId?: string; [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();
  const resolvedSearchParams = await searchParams;
  const sParams = new URLSearchParams();

  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
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
    <>
      <CartCleaner />
      <CustomerForm />
    </>
  );
}