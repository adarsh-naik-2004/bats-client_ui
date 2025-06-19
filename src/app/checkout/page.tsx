import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CustomerForm from "./components/customerForm";

export default async function Checkout({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const session = await getSession();

  const sParams = new URLSearchParams();

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

  return <CustomerForm />;
}
