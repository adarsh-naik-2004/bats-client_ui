import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductList from './components/product-list';
import { Suspense } from 'react';

export default async function Home({ searchParams }: { searchParams: { shopId: string } }) {
    return (
        <>
            <section className="bg-white">
                <div className="container flex items-center justify-between py-24">
                    <div>
                        <h1 className="text-7xl font-black font-sans leading-2">
                            Premium Cricket Gear Delivered <br />
                            <span className="text-primary">Straight to Your Door!</span>
                        </h1>
                        <p className="text-2xl mt-8 max-w-lg leading-snug">
                            Shop the latest bats, gloves, pads, and more – gear up like a pro!
                        </p>
                        <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
                            Explore Our Collection
                        </Button>
                    </div>
                    <div>
                        <Image alt="cricket-gear-main" src={'/home_client.png'} width={400} height={1400} />
                    </div>
                </div>
            </section>
            <Suspense fallback={'Loading....'}>
                <ProductList searchParams={searchParams} />
            </Suspense>
        </>
    );
}
