import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ProductCard from "./product-card";
import { Category, Product } from "@/lib/types";
import { Zap } from "lucide-react";

const ProductList = async ({
  searchParams,
}: {
  searchParams: { shopId: string };
}) => {
  // Fetch categories
  let categories: Category[] = [];
  try {
    const categoryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY}/categories`,
      { next: { revalidate: 60 } }
    );

    if (!categoryResponse.ok) {
      throw new Error("Failed to fetch categories");
    }

    categories = await categoryResponse.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <section className="relative overflow-hidden">
        <div className="container py-16 relative">
          <div className="text-center py-20">
            <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-orange-300 mb-4">
                Unable to Load Products
              </h3>
              <p className="text-orange-200/80">
                We&apos;re having trouble loading our product catalog. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fetch products
  let products: { data: Product[] } = { data: [] };
  try {
    const productsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY}/products?perPage=100&storeId=${searchParams.shopId}`,
      { next: { revalidate: 60 } }
    );

    if (!productsResponse.ok) {
      throw new Error(`Products request failed with status: ${productsResponse.status}`);
    }

    // Check if response has content before parsing
    const contentLength = productsResponse.headers.get('content-length');
    if (contentLength === '0') {
      throw new Error("Products response is empty");
    }

    products = await productsResponse.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <section className="relative overflow-hidden">
        <div className="container py-16 relative">
          <div className="text-center py-20">
            <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-orange-300 mb-4">
                Product Loading Failed
              </h3>
              <p className="text-orange-200/80">
                We couldn&apos;t retrieve the product data. Please refresh the page or try again later.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-orange-800/50 hover:bg-orange-700/50 border border-orange-700/50 text-orange-300 px-6 py-2 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-orange-900/5 pointer-events-none"></div>
      <div className="container py-16 relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="text-orange-500 w-6 h-6" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Premium Collection
            </h2>
            <Zap className="text-orange-500 w-6 h-6" />
          </div>
          <p className="text-orange-200/80 max-w-2xl mx-auto">Discover our handpicked selection of professional-grade cricket equipment</p>
        </div>
        
        <Tabs defaultValue={categories[0]?._id || ''} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gradient-to-r from-orange-900/20 to-orange-800/20 backdrop-blur-sm p-2 rounded-2xl border border-orange-900/30">
            {categories.map((category, index) => (
              <TabsTrigger
                key={category._id}
                value={category._id}
                className="relative text-base font-bold text-orange-200/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-700 data-[state=active]:text-white data-[state=active]:shadow-xl rounded-xl py-4 px-8 transition-all duration-500 hover:scale-105 hover:shadow-lg group overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{category.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category._id} value={category._id} className="mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.data
                  ?.filter((product) => product?.category?._id === category._id)
                  .map((product, index) => (
                    product?._id && (
                      <div 
                        key={product._id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    )
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductList;