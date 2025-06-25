import React from "react";
import { Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./product-card";
import { Category, Product } from "@/lib/types";

const ProductList = async ({ searchParams }: { searchParams: { shopId: string } }) => {
  // Fetch categories
  let categories: Category[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY}/categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    categories = await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return <ErrorSection title="Unable to Load Products" message="We're having trouble loading our product catalog. Please try again later." />;
  }

  // Fetch products
  let products: Product[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY}/products?perPage=100&storeId=${searchParams.shopId}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    if (res.headers.get("content-length") === "0") throw new Error("Empty response");

    const data = await res.json();
    products = data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return <ErrorSection 
      title="Product Loading Failed" 
      message="We couldn't retrieve the product data. Please refresh the page or try again later."
      showRetry={true}
    />;
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-orange-900/5 pointer-events-none" />
      
      <HeaderSection />
      
      <Tabs defaultValue={categories[0]?._id || ""}>
        <CategoryTabs categories={categories} />
        
        <div className="mt-12">
          {categories.map((category) => (
            <TabsContent key={category._id} value={category._id}>
              <ProductGrid 
                products={products.filter(p => p?.category?._id === category._id)} 
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
};

// Sub-components for better organization
const HeaderSection = () => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center gap-2 mb-4">
      <Zap className="text-orange-500 w-6 h-6 mt-10" />
      <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent mt-10">
        Premium Collection
      </h2>
      <Zap className="text-orange-500 w-6 h-6 mt-10" />
    </div>
    <p className="text-orange-200/80 max-w-2xl mx-auto px-4">
      Discover our handpicked selection of professional-grade cricket equipment
    </p>
  </div>
);

const CategoryTabs = ({ categories }: { categories: Category[] }) => (
  <div className="flex justify-center mb-8">
    <TabsList className="flex flex-wrap justify-center gap-3 bg-transparent p-1">
      {categories.map((category) => (
        <TabsTrigger
          key={category._id}
          value={category._id}
          className="px-7 py-3 text-base font-medium text-orange-300 bg-orange-900/20 border border-orange-700/30 rounded-full hover:bg-orange-800/30 hover:text-white data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:border-orange-500 transition-all duration-200"
        >
          {category.name}
        </TabsTrigger>
      ))}
    </TabsList>
  </div>
);

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
    {products.map((product, index) => (
      product?._id && (
        <div
          key={product._id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ProductCard product={product} />
        </div>
      )
    ))}
  </div>
);

const ErrorSection = ({ 
  title, 
  message, 
  showRetry = false 
}: { 
  title: string; 
  message: string; 
  showRetry?: boolean;
}) => (
  <section className="relative overflow-hidden py-16">
      <div className="text-center py-10">
        <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-orange-300 mb-4">{title}</h3>
          <p className="text-orange-200/80 mb-6">{message}</p>
          
          {showRetry && (
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-orange-800/50 hover:bg-orange-700/50 border border-orange-700/50 text-orange-300 px-6 py-3 rounded-lg transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
  </section>
);

export default ProductList;