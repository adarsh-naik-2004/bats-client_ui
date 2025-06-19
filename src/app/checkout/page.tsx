import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CustomerForm from "./components/customerForm";

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{ shopId?: string; [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();

  const resolvedSearchParams = await searchParams;

  const sParams = new URLSearchParams();

  // Append each key-value pair from searchParams to URLSearchParams
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      sParams.append(key, value);
    }
  });

  const existingQueryString = sParams.toString();

  sParams.append("return-to", `/checkout?${existingQueryString}`);

  // /login?return-to=/checkout?existingQueryString

  if (!session) {
    redirect(`/login?${sParams}`);
  }

  return (
    <div className="dark bg-gray-900 text-white min-h-screen p-4">
      <CustomerForm />
    </div>
  );
}
