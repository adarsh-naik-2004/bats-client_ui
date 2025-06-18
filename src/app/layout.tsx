import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/custom/header';
import StoreProvider from './StoreProvider';
import { Toaster } from '@/components/ui/toaster';
import Refresher from '@/components/custom/refresher';
import RemoveHydrationError from '@/components/remove-hydration-error';
import QueryProvider from './QueryProvider';
import Footer from './(home)/components/footer';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
    title: 'CricStore',
    description: 'Professional cricket equipment and accessories store',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <StoreProvider>
                <body
                    className={cn(
                        'min-h-screen bg-background font-manrope antialiased',
                        manrope.variable
                    )}>
                    <QueryProvider>
                        <RemoveHydrationError />
                        <Refresher>
                            <Header />
                            <main>{children}</main>
                            <Footer/>
                            <Toaster />
                        </Refresher>
                    </QueryProvider>
                </body>
            </StoreProvider>
        </html>
    );
}