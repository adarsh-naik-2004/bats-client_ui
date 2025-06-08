import React from "react";
import { Store } from "@/lib/types";
import StoreSelect from "./store-select";
import { getSession } from "@/lib/session";
import HeaderClient from "./header-client";
import Image from "next/image";

const Header = async () => {
  const session = await getSession();

  const storesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY}/stores?perPage=100`,
    { next: { revalidate: 3600 } }
  );

  if (!storesResponse.ok) {
    throw new Error("Failed to fetch stores");
  }

  const shops: { data: Store[] } = await storesResponse.json();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Store Select Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <Image
                  src="/bats_logo.png"
                  alt="Cricket Store Logo"
                  width={140}
                  height={45}
                  priority
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
            </div>
            <StoreSelect shops={shops} />
          </div>

          {/* Header Client Section */}
          <HeaderClient session={session} />
        </div>
      </nav>
    </header>
  );
};

export default Header;