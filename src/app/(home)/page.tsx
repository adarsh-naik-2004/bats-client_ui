import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductList from './components/product-list';
import { Suspense } from 'react';

export default async function Home({ searchParams }: { searchParams: { shopId: string } }) {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-white">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-24 px-6 gap-12">
                    {/* Text Content */}
                    <div className="max-w-xl">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                            Premium Cricket Gear <br />
                            <span className="text-primary">Delivered to Your Door</span>
                        </h1>
                        <p className="text-lg md:text-xl mt-6 text-muted-foreground">
                            Shop the latest bats, gloves, pads, and more – gear up like a pro!
                        </p>
                        <Button
                            className="mt-8 px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition"
                            size="lg"
                        >
                            Explore Our Collection
                        </Button>
                    </div>

                    {/* Hero Image */}
                    <div className="flex justify-center">
                        <Image
                            alt="Cricket Gear Display"
                            src="/home_client.png"
                            width={450}
                            height={600}
                            className="rounded-2xl shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Product Section */}
            <Suspense fallback={<p className="text-center py-10">Loading products...</p>}>
                <ProductList searchParams={searchParams} />
            </Suspense>
        </>
    );
}
