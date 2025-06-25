import { Suspense } from "react";
import ProductList from "./components/product-list";
import StoreSelect from "../../components/custom/store-select";
import { Store } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ shopId?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const storesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY}/stores?perPage=100`,
    { next: { revalidate: 3600 } }
  );
  if (!storesResponse.ok) throw new Error("Failed to fetch stores");
  const shops: { data: Store[] } = await storesResponse.json();

  return (
    <>
      <section className="relative min-h-screen bg-white-900 overflow-hidden z-0">
        <div className="absolute inset-0 z-0 bg-[url('/kohli_4.jpg')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/70 z-0"></div>

        <div className="container mx-auto flex flex-col items-center text-center py-24 md:py-32 px-6 relative z-20">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-gray-800 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-2 mb-8">
              <span className="text-orange-300 text-sm font-medium">
                New Collection Available
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter text-white mb-6 animate-fade-in-up animation-delay-200">
            Cricket Gear
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 animate-gradient-x">
              Made for Champions
            </span>
          </h1>

          <p className="text-xl md:text-2xl mt-6 max-w-3xl text-red-100/80 leading-relaxed animate-fade-in-up animation-delay-400">
            Experience professional-grade cricket equipment crafted for peak
            performance. From legendary bats to protective gear - dominate the
            field with confidence.
          </p>

          <div className="mt-7 animate-fade-in-up animation-delay-800">
            <div className="bg-gray-800/80 backdrop-blur-lg border border-orange-500/30 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-orange-300 text-lg font-semibold mb-4">
                Choose Your Store
              </h3>
              <StoreSelect shops={shops} />
            </div>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="relative bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-white overflow-hidden"
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-900/30 to-orange-800/30 px-8 py-4 rounded-2xl backdrop-blur-sm">
                  <div className="w-6 h-6 border-3 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Loading premium products...
                  </span>
                </div>
              </div>
            </div>
          }
        >
          <ProductList
            searchParams={{
              shopId:
                resolvedSearchParams.shopId ??
                shops.data[0]?.id.toString() ??
                "",
            }}
          />
        </Suspense>
      </section>
    </>
  );
}
